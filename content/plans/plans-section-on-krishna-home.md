---
id: plans-section-on-krishna-home
title: "Plans section on krishna-home"
status: shipped
created: 2026-07-03
reviews:
  - date: 2026-07-03
    note: "Built list page + detail page + admin dashboard. ISR 3600s like other content. Status filter (draft/review/approved/shipped). Show-shipped toggle on list. Detail page collapses reviews to last note when shipped."
  - date: 2026-07-03
    note: "Verified on dev: list filters by status, /plans/[slug] renders body + reviews, admin dashboard reads frontmatter. Markdown body renders correctly. Home page card added. Build green, 90 routes generated."
---

# Plans section on krishna-home

## Goal
Review plans we make together (across sessions) on krishna-home.
Do this many times. Don't clutter finished ones.

## Decisions

- **Where:** `content/plans/*.md` (same pattern as `content/papers/`)
- **Schema:** frontmatter with `id`, `title`, `status`, `created`, `reviews: [{date, note}]`
- **Statuses:** `draft` → `review` → `approved` → `shipped`
- **Reviews:** append-only list. Detail page shows full timeline while active.
- **Shipped:** collapsed to "last review" only on detail page. Hidden from list
  by default; "Show shipped" toggle reveals them.
- **Routes:**
  - `/plans` — public list, grouped active / shipped
  - `/plans/[slug]` — public detail
  - `/admin/dashboard/plans` — admin: read frontmatter + reviews, link to file

## Build pieces

- `lib/plans.ts` — frontmatter parser, list/get/lastReview helpers
- `app/(public)/plans/page.tsx` — list with chips + toggle
- `app/(public)/plans/[slug]/page.tsx` — detail (collapsed when shipped)
- `app/(admin)/admin/dashboard/plans/page.tsx` — admin read-only
- Home page: Plans card added between Learn and Track
- Admin dashboard tab: Plans tab → routes to /admin/dashboard/plans

## Editing workflow

Edit the .md file directly. Change `status:` to move through states.
Append to `reviews:` list — never delete old entries.

## Not done (deferred)

- No write UI in admin (edit the file)
- No CLI helper (hermes plans new) — only useful if I do this weekly
- No notifications when status changes