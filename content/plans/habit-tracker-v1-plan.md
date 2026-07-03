---
id: habit-tracker-v1-plan
title: "Habit tracker v1 — implementation plan (React Native + Expo, 7 milestones, ~11 weeks)"
status: review
created: 2026-07-02
reviews:
  - date: 2026-07-02
    note: "Detailed task-by-task plan. 7 milestones (M1 Habit CRUD, M2 Today + 1-tap, M3 Insights, M4 Notifications, M5 Health auto-complete, M6 LLM weekly summary, M7 Polish). React Native + Expo SDK 52 + SQLite + Zustand + victory-native. Local-first, no backend, no account. ~98 tasks at 2-5 min each. Pre-flight path mismatch flagged: plan references /home/krish/habit-tracker/ which is the empty greenfield dir; plans from research + this impl doc should land together for review."
---

# Habit Tracker v1 — Implementation Plan

> **For Hermes:** Use `subagent-driven-development` to execute task-by-task.

**Goal:** Build a cross-platform (iOS + Android), local-first habit tracker that is the *intuitive, easy, insightful* alternative to Streaks/Habitify/Productive. v1 ships in ~11 weeks with one-tap check-ins, pattern detection, and LLM-generated weekly summaries. No backend, no account, no sync.

**Architecture:** React Native + Expo app (single TypeScript codebase). SQLite for relational habit/event storage. Zustand for client state. victory-native for charts. expo-notifications for reminders. expo-sqlite for storage. expo-task-manager for background jobs. All data stays on device in v1. LLM (Claude Haiku) called directly from device via Expo SecureStore API key.

**Tech Stack:**
- **Framework:** React Native 0.76+ via Expo SDK 52 (managed workflow)
- **Language:** TypeScript 5.x
- **Storage:** `expo-sqlite` (SQLite, relational)
- **State:** Zustand 4.x
- **Navigation:** `expo-router` v4 (file-based)
- **UI primitives:** React Native + custom; design-system in pure RN (no NativeWind in v1)
- **Charts:** `victory-native` (Skia-based) + `react-native-svg`
- **Animations:** `react-native-reanimated` 3.x
- **Notifications:** `expo-notifications` (scheduled local)
- **Haptics:** `expo-haptics`
- **Health (iOS):** `react-native-health`
- **Health (Android):** `expo-health-connect`
- **LLM:** `@anthropic-ai/sdk` called from a background fetch task
- **Testing:** Jest + `@testing-library/react-native`, `maestro` for E2E

**Target platforms:** iOS 16+, Android 12+ (API 31+)

---

## Architecture Decisions

### 1. Why React Native + Expo (not Flutter)
- JS/TS stack; Flutter adds Dart learning cost.
- expo-notifications is the most mature cross-platform reminders API.
- Reanimated 3 + Skia enable Streaks-style ring animations (~60fps on both platforms).
- EAS Build = no Xcode/Gradle setup for TestFlight/Play Internal.

### 2. Why SQLite over MMKV / AsyncStorage
- Insights need aggregations: `SELECT weekday, AVG(done) FROM events GROUP BY weekday`.
- MMKV is key-value, can't do joins or GROUP BY.

### 3. Why Local-first v1 (no backend)
- Habit data is personal. No social features in v1 = no need for sync.
- CloudKit locks to iOS — kills cross-platform promise.
- Local SQLite means zero infra, instant read/write, zero privacy concerns.

### 4. Why Consistency Index over raw streak (philosophical bet)
- Streaks are demoralizing on day 31 after day 30 perfection.
- Consistency Index (rolling, weighted, never-resets-to-zero) aligns with Clear's "never miss twice" + Wood's research.
- **Differentiator:** a tracker that *doesn't punish you* for being human.

### 5. Why Health auto-completion in v1 (not v2)
- HealthKit is the #1 "intuition" lever: app becomes automatic, not manual.
- expo-health-connect + react-native-health both have stable Expo plugins.

### 6. Why LLM weekly summary in v1 (not v2)
- High wow-factor, low LOC (~150 lines including prompt engineering).
- Calls Anthropic Haiku (~$0.0003/summary) — negligible cost.
- Differentiates from every "data dashboard" competitor.

---

## Data Model (SQLite Schema)

```sql
-- habits: one row per habit definition
CREATE TABLE habits (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  category TEXT,
  frequency_kind TEXT NOT NULL,
  frequency_count INTEGER,
  frequency_days TEXT,
  target_count INTEGER DEFAULT 1,
  target_unit TEXT,
  reminder_time TEXT,
  source_kind TEXT NOT NULL,
  source_target INTEGER,
  created_at INTEGER NOT NULL,
  archived_at INTEGER
);

-- habit_events: one row per check-in occurrence
CREATE TABLE habit_events (
  id TEXT PRIMARY KEY,
  habit_id TEXT NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
  occurred_on TEXT NOT NULL,
  value REAL NOT NULL DEFAULT 1,
  logged_at INTEGER NOT NULL,
  source TEXT NOT NULL
);

CREATE INDEX idx_events_habit_date ON habit_events(habit_id, occurred_on);
CREATE INDEX idx_events_date ON habit_events(occurred_on);
```

**Frequency calculation rules** (UI):
- `daily`: required every day
- `weekly_count N`: need N completions per ISO week (Mon-Sun)
- `specific_days [0,3,5]`: only Sun, Wed, Fri are required

**Completion** = `% of required days met within window` — not just `count/expected`.

---

## Insight Algorithms (pre-calculated, refresh on every check-in)

### Consistency Index (0–100)
```
For each habit:
  loop last 30 days, daily buckets
  if bucketed: bucket_completed = 1 if events on date ≥ target else 0
  weighted_score = bucket_completed * decay(i) where decay = 0.95^i
  consistency_index = sum(weights) / sum(all_weights) * 100
```
**Never resets to 0 on a miss.** Decayed but recoverable.

### Best/Worst Day-of-Week
```
GROUP BY strftime('%w', occurred_on) for last 90 days
HAVING count ≥ 4 occurrences of that weekday
best = weekday with max completion_rate
worst = weekday with min completion_rate
```

### Habit Pair Correlation
```
for each pair (a, b) where a != b:
  join events on date
  count(days both a and b done) / count(days a done) = correlation_strength
top 3 pairs surfaced in Insights tab
```

These run in M3 via SQL views + a `useInsights` hook.

---

## Pre-Flight: What Already Exists

- `/home/krish/habit-tracker-research/competitors.md` — competitor analysis
- `/home/krish/habit-tracker-research/ux-patterns.md` — 10 UX principles
- `/home/krish/habit-tracker-research/insights-and-ai.md` — metrics + AI + behavior science
- `/home/krish/.hermes/secrets.md` may have Anthropic key (per memory; verify before coding)

**Nothing else exists yet.** Empty repo at `/home/krish/habit-tracker`. No packages, no DB, no screens. This is greenfield.

---

## Roadmap (7 milestones, ~11 weeks)

| Milestone | Goal | Output |
|---|---|---|
| **M1** | Habit CRUD + local storage | Create / edit / delete / list habits, persisted to SQLite |
| **M2** | Today screen + 1-tap check-in | Home screen with check-off, streaks inline, haptics, undo |
| **M3** | Insights screen | Heatmap, consistency index, weekday patterns, habit correlations |
| **M4** | Notifications | Per-habit reminders, daily summary, "Mark Done" action |
| **M5** | Health auto-completion | Steps → walking, mindful minutes → meditation, workout → exercise |
| **M6** | LLM weekly summary | Sun 8pm background fetch → Claude Haiku → push notification |
| **M7** | Polish | Onboarding, empty states, dark mode, iOS widget, a11y, TestFlight |

After M7: TestFlight + Play Internal beta, 5-day dogfood, iterate, public launch.

---

## Task Breakdown

> Each task is **2–5 minutes of focused work.** TDD where it makes sense (pure logic), pragmatic for UI. Frequent commits.

### Phase M1: Foundation (Week 1–2)

#### Task 1.1: Bootstrap Expo project with TypeScript strict
- Create `package.json`, `tsconfig.json`, `app.json`, `.gitignore`, `babel.config.js`
- `npx create-expo-app@latest . --template blank-typescript`
- Enable strict mode + `noUncheckedIndexedAccess`
- Verify `npx tsc --noEmit` returns 0 errors

#### Task 1.2: Install core dependencies
```bash
npx expo install expo-sqlite expo-notifications expo-haptics expo-router expo-task-manager expo-secure-store expo-health-connect expo-constants
npm install zustand date-fns uuid react-native-svg victory-native react-native-reanimated react-native-gesture-handler react-native-safe-area-context @anthropic-ai/sdk
npm install -D @types/uuid drizzle-orm drizzle-kit jest @testing-library/react-native jest-expo
```

#### Task 1.3: Set up Expo Router file structure
- `src/app/_layout.tsx`, `src/app/(tabs)/{index,insights,settings}.tsx`, `src/app/habit/{new,[id]}.tsx`
- Configure `expo-router` plugin in `app.json`

#### Task 1.4: SQLite schema + migration runner
- TDD: write failing test for `runMigrations` → implement
- `src/db/{schema.sql, migrate.ts, index.ts}`
- Tables: `habits`, `habit_events` + indexes

#### Task 1.5: Habit type definitions
- `src/types/habit.ts` — `Habit`, `HabitEvent`, `FrequencyKind`, `SourceKind`, `Category`

#### Task 1.6: Habits repository (CRUD)
- TDD: `createHabit`, `getHabit`, `listHabits`, `updateHabit`, `archiveHabit`
- `src/db/habits-repo.ts`

#### Task 1.7: Habit events repository (check-offs)
- TDD: `logEvent`, `listEvents`, `deleteEvent`, `sumValueForDay`
- `src/db/events-repo.ts`

#### Task 1.8: Zustand store for habits
- `src/store/habits-store.ts` with `load()`, `add()`, `archive()`

#### Task 1.9: "Add Habit" sheet — name field pre-focused
- `src/components/HabitForm.tsx` + `src/app/habit/new.tsx`
- Modal with autoFocus name input, color + icon picker, defaults

### Phase M2: Today Screen (Week 3–4)

#### Task 2.1: Today screen with empty state
- Wire to `useHabitsStore`, show 🌱 empty state with CTA

#### Task 2.2: HabitRow component with inline streak
- Icon + name + streak + check button
- Haptic on tap

#### Task 2.3: Today events state + optimistic check-in
- `useTodayEventsStore` with `load()`, `toggle()`
- Optimistic UI: update visual first, then SQLite

#### Task 2.4: Undo toast on check-in
- `UndoProvider` + `useUndo()` context
- 5-second animated toast with "Tap to undo"

#### Task 2.5: Reanimated fill animation on check-off
- Reanimated 3 `useSharedValue` + `withTiming` for 250ms color fill

#### Task 2.6: Streak calculation (current + best)
- Pure functions in `src/lib/streaks.ts`
- TDD: empty, consecutive, grace hours, best streak

### Phase M3: Insights (Week 4–5)

#### Task 3.1: Consistency index algorithm (pure logic)
- `src/lib/consistency.ts` with decay-weighted 30-day score
- TDD: never resets to 0 on miss

#### Task 3.2: Best/worst weekday algorithm
- `src/lib/weekday-pattern.ts`
- Min 4 occurrences per weekday to count

#### Task 3.3: Habit pair correlation
- `src/lib/habit-pairs.ts`
- Top 3 pairs by co-occurrence strength

#### Task 3.4: Insights screen with heatmap
- `src/components/Heatmap.tsx` (GitHub-style 53w × 7d)
- `src/app/(tabs)/insights.tsx` — ranked habit list with consistency scores

#### Task 3.5: Pattern banner ("you skip on Mondays")
- Banner on Insights tab: "You skip [HABIT] most often on [DAY]s"
- Only show if pattern > 15% spread

### Phase M4: Notifications (Week 6)

#### Task 4.1: Notification permission flow
- `src/lib/notifications.ts` — `ensurePermissions()`
- Asked only when user opts in, not on launch

#### Task 4.2: Per-habit scheduled reminder
- `Notifications.scheduleNotificationAsync` with `repeats: true`
- Cancel previous schedule on update

#### Task 4.3: "Mark Done" notification action
- `setNotificationCategoryAsync('habit-reminder', [...])`
- Listen for response, write event to DB

### Phase M5: Health Auto-Completion (Week 7–8)

#### Task 5.1: HealthKit permission setup (iOS)
- `src/lib/health.ts` with `react-native-health`
- Permissions asked only when user creates a health-source habit

#### Task 5.2: Health Connect setup (Android)
- `expo-health-connect` for steps/mindful minutes
- Parallel interface to iOS

#### Task 5.3: Background fetch + auto-completion
- `expo-task-manager` daily task
- For each health-sourced habit: read data, log event if target met
- Every 4 hours

### Phase M6: LLM Weekly Summary (Week 9)

#### Task 6.1: Secure store for API key
- `src/lib/llm.ts` — `getAnthropicKey()` via `expo-secure-store`

#### Task 6.2: Generate summary prompt + call
- Build structured prompt from last 7 days
- Call Haiku, return summary + suggestion

#### Task 6.3: Sunday 8pm background task
- `expo-task-manager` daily trigger at 20:00
- Generate summary, schedule notification 1 minute later

#### Task 6.4: Settings UI for API key + opt-out
- API key input (SecureStore)
- "Get weekly AI summary" toggle
- Per-habit reminder summary

### Phase M7: Polish (Week 10–11)

#### Task 7.1: 3-screen onboarding
- Slides: "Build habits you'll actually keep" / "One tap. Zero friction." / "Insights, not guilt."

#### Task 7.2: Dark mode support
- `useColorScheme()` everywhere, `useTheme()` hook

#### Task 7.3: iOS home-screen widget
- `expo-widgets` plugin — today's habits check-off status

#### Task 7.4: Accessibility pass
- ≥44pt targets, `accessibilityLabel`, color-independent state, Dynamic Type
- Manual VoiceOver pass

#### Task 7.5: E2E test critical flows with Maestro
- `.maestro/flows/create-habit.yaml`, `check-off.yaml`

---

## Open Questions Deferred

- **App Store / Play Store metadata** (name: "Habitseed"? "Drift"? "Streaklight"?)
- **Privacy policy URL** (required if logging HealthKit)
- **Pricing for v2 sync tier** (if Supabase added)
- **Onboarding analytics** — PostHog or self-hosted?

---

## Verification (after each Milestone)

After M1: tsc clean, jest pass, app launches, can create + list + archive a habit
After M2: one-tap check-in works, optimistic update persists, streak updates, haptics fire, undo toast
After M3: insights renders heatmap + consistency + pattern banner + pair correlations
After M4: notification permission asked-not-told, per-habit reminders fire, "Mark Done" action works
After M5: HealthKit permission asked only when relevant, health-based habit auto-completes
After M6: settings accepts Anthropic key, Sunday 8pm notification fires with summary
After M7: onboarding, dark mode, iOS widget, VoiceOver, Maestro E2E pass

---

## Risks & Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Background tasks don't run reliably on Android | High | Foreground fallback: also run auto-completion on app launch + Today screen mount |
| HealthKit permission denial kills M5 | Medium | Make `source_kind = 'manual'` work perfectly — auto-completion is enhancement |
| LLM API key entry is friction | High | Ship with a "demo key" path for first 100 users |
| Cross-platform ring animation perf | Medium | Reanimated 3 worklet fallback to static fill |
| SQLite + Reanimated 3 conflict on JSI | Low | Pin to known-good Expo SDK 52 versions |

---

## Estimated Velocity

- 7 milestones × ~14 tasks each = ~98 tasks
- 2-5 min/task at average 3 min = ~5 hours pure implementation per milestone
- 1 milestone per 1.5–2 weeks = **11 weeks total** end-to-end

---

**Plan complete and saved to `/home/krish/habit-tracker/docs/plans/2026-07-02_habit-tracker-v1.md`.**

Ready to execute using `subagent-driven-development` — dispatch a fresh subagent per task with two-stage review (spec compliance then code quality). Proceed milestone-by-milestone (you review at each milestone boundary) or task-by-task (you review every commit)?