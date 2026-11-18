# Engineering Dashboard Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans; execute continuously in the current requested workspace.

**Goal:** Implement the user's Redis-inspired engineering portfolio dashboard.
**Architecture:** Reuse data and section modules, introducing a fixed shell, metric overview and searchable project explorer. Native dialogs handle details and mobile navigation without dependencies.
**Tech Stack:** Existing Next.js, TypeScript, Tailwind, shadcn button, Lucide.
**Spec:** docs/superpowers/specs/2026-11-18-dashboard-design.md

## Global constraints
Preserve real content, achievements, URLs, assets, SEO, analytics and contact integration. No fake status/charts, no new dependencies, no unrelated changes, default light theme.

## Review focus
- Below 768px project cards replace the table, no overflow.
- Modal navigation/details have accessible names, Escape dismissal, focus containment/return.
- Filter and search counts reflect actual content, no dead detail actions.
- Active navigation follows scroll and section links.
- Contact validation and existing integration are preserved.

### Task 1: Data helpers
- [x] Add failing tests for project filters/search and completed career years.
- [x] Implement pure helpers and explicit career start dates from existing records; rerun tests.
### Task 2: Dashboard layout
- [x] Replace editorial styling with slate/blue tokens and shared panel primitives.
- [x] Implement 240px sidebar, sticky header, active navigation, responsive modal drawer.
- [x] Build compact identity panel and five metrics derived from real data.
### Task 3: Work and outcomes
- [x] Table on desktop/cards on mobile, search/filter controls, real count/empty states.
- [x] Implement accessible project details with full problem, solution, role, all technology and screenshot/link when available.
- [x] Place existing engineering outcomes alongside projects at wide desktop sizes.
### Task 4: Lower panels
- [x] Rework process as a vertical timeline, include original AI tool responsibilities.
- [x] Compact technology, experience, education, about and quick contact panels; preserve the form.
### Task 5: Verify
- [x] Run node helper tests, lint, TypeScript and production build.
- [x] Browser check desktop/tablet/mobile layouts, drawer, project details, filters, form validation and SEO.
- [x] Review diff, update plan and report file responsibilities and test boundaries.
