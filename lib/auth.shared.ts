/**
 * Constants + types shared by both the Node runtime (route handlers) and
 * the Edge runtime (middleware). This file MUST stay runtime-agnostic.
 */

export const SESSION_COOKIE = "kh_session";
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days per product spec

export interface SessionPayload {
  /** Issued-at in milliseconds since epoch. */
  ts: number;
  /** Per-session nonce (128 bits, base64url). Defeats replay-with-stale-timestamp. */
  nonce: string;
}

/** Domain label for HKDF-style key separation. */
export const SESSION_DERIVATION_LABEL = "krishna-home.session.derivation";
