/**
 * Edge-runtime safe auth helpers (Web Crypto).
 * Imported from middleware.ts. NO Node imports here.
 *
 * The cookie stores an opaque, signed token: payload + HMAC-SHA256.
 * Verification is constant-time. Payload is {ts, nonce}; expired tokens
 * are rejected even with a valid signature.
 */
import {
  SESSION_COOKIE,
  SESSION_TTL_MS,
  SESSION_DERIVATION_LABEL,
  type SessionPayload,
} from "./auth.shared";

export { SESSION_COOKIE, SESSION_TTL_MS };
export type { SessionPayload };

function pad(s: string): string {
  return s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
}

function fromBase64url(s: string): Uint8Array {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad(s));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

function constantTimeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function deriveKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const seedKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(SESSION_DERIVATION_LABEL),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const derived = await crypto.subtle.sign(
    "HMAC",
    seedKey,
    enc.encode(secret),
  );
  return crypto.subtle.importKey(
    "raw",
    derived,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

export async function signSessionEdge(
  payload: SessionPayload,
  secret: string,
): Promise<string> {
  const enc = new TextEncoder();
  const payloadB64 = btoa(JSON.stringify(payload))
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const key = await deriveKey(secret);
  const sigBuf = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(payloadB64),
  );
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sigBuf)))
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return `${payloadB64}.${sigB64}`;
}

export async function verifySessionEdge(
  token: string | undefined | null,
  secret: string,
): Promise<boolean> {
  if (!secret) return false;
  if (!token || typeof token !== "string") return false;
  const dot = token.indexOf(".");
  if (dot <= 0 || dot === token.length - 1) return false;

  const payloadB64 = token.slice(0, dot);
  const sigB64 = token.slice(dot + 1);

  let sigBytes: Uint8Array;
  let payload: SessionPayload;
  try {
    sigBytes = fromBase64url(sigB64);
    const json = atob(
      payloadB64.replace(/-/g, "+").replace(/_/g, "/") + pad(payloadB64),
    );
    payload = JSON.parse(json) as SessionPayload;
  } catch {
    return false;
  }

  const key = await deriveKey(secret);
  const expectedSig = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64)),
  );

  if (!constantTimeEqualBytes(expectedSig, sigBytes)) return false;

  if (typeof payload.ts !== "number") return false;
  if (!Number.isFinite(payload.ts)) return false;
  if (Math.abs(Date.now() - payload.ts) > SESSION_TTL_MS) return false;

  return true;
}
