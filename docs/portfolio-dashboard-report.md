# Portfolio dashboard refactor

Implemented the supplied professional engineering dashboard brief in the existing Next.js app. The Redis Dashboard reference sets the structure: fixed navigation, concise overview, real metric cards, a project table with an impact rail, and compact lower panels. All eleven original project records, career entries, résumé/social links, metadata, analytics, and the Web3Forms submission integration remain available.

## Changed files

- `src/app/page.tsx`: composes the dashboard overview, project/impact grid, process/technology/contact grid, experience/about grid, and contact form.
- `src/app/globals.css`, `src/app/layout.tsx`, `tailwind.config.ts`: slate and blue semantic tokens, light default, accessible focus, restrained motion, shared card/tag/heading styles, and existing font/SEO integration.
- `src/components/portfolio/portfolio-shell.tsx`, `portfolio-sidebar.tsx`: persistent 240px desktop navigation, sticky header, responsive navigation drawer, active-section tracking and scroll offsets.
- `src/components/portfolio/portfolio-hero.tsx`, `overview-metrics.tsx`: compact identity panel and five figures derived from real project/career/impact data.
- `src/components/portfolio/featured-work.tsx`, `project-card.tsx`, `project-icon.tsx`, `project-details.tsx`: searchable/filterable project table, mobile cards, and detailed project dialogs retaining problem, solution, role, complete technology stack, screenshot and external link where provided.
- `src/components/portfolio/impact-metrics.tsx`: existing outcomes with simple, labeled percentage indicators; no invented charts or historical data.
- `src/components/portfolio/process-timeline.tsx`, `ai-workflow.tsx`, `ai-workflow-card.tsx`: four-step vertical timeline and accessible disclosures retaining Gemini, Claude and Codex responsibilities.
- `src/components/portfolio/technology-stack.tsx`, `experience.tsx`, `about.tsx`, `quick-contact.tsx`, `contact-cta.tsx`, `section-heading.tsx`: coordinated compact panels; original contact fields, validation, pending state, payload and toast feedback preserved.
- `src/components/ui/modal.tsx`: reusable native modal dialog with Escape, focus containment/return, backdrop dismissal and body scroll locking.
- `src/lib/portfolio-data.ts`: portfolio content remains the source of truth; navigation expanded to seven destinations and explicit ISO career start dates mirror the existing displayed employment dates.
- `src/lib/portfolio-view.ts`, `tests/portfolio-view.test.mjs`, `package.json`: pure project filtering, career-year and navigation helpers with a dependency-free Node test command using the existing TypeScript compiler.
- Removed the replaced cinematic hero/navigation, animated video handoff, unused AI logo component and reveal helpers. Original media assets remain in `public`.

## Nine design passes

1. Spacing: 16–24px section gaps, compact controls, aligned table rows and reusable panel padding.
2. Color: white/slate surfaces and navy text, blue selection/actions, small color-coded icons requested in the brief.
3. Icons: one Lucide set, consistent stroke and restrained sizes.
4. Copy: factual project identities and career claims; project count derived from records, live filtering requires supported live status and URL, and no availability claim.
5. Type: compact Inter hierarchy and occasional mono values; no oversized marketing headlines or tracked uppercase labels.
6. Layout: 240px sidebar, fluid capped main content, impact rail on wide desktop, modal drawer on smaller screens, cards instead of a mobile table.
7. Details: 8–12px radii, visible focus, real status labels, row hover/focus feedback, accessible dialogs/disclosures, search reset/empty state.
8. Visuals: real portrait and original product screenshots inside details. No generated imagery or fake product mockups were needed.
9. Motion: short color/chevron transitions and smooth anchors; reduced-motion preferences disable animated scrolling/transitions.

## Verification

- `npm test`: 5 tests passed, covering actual filter counts, combined search/filter behavior, empty results, completed career years, bottom-of-page navigation and adjacent grid panels.
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed, static page generated successfully.
- `git diff --check`: passed.
- Server-rendered HTML: HTTP 200, original title/description, visible identity, all eleven project names, all seven navigation sections, and no video element.
- Browser: desktop, tablet and narrow mobile layouts had no horizontal overflow. Below 768px the table is replaced by project cards. Live filter returns four supported records, Mapbox search returns AliPlace, and empty results can reset to all eleven records.
- Browser: project dialog includes full details and a successfully loaded real screenshot. Escape closes it and restores focus to the project trigger.
- Browser: navigation drawer closes with Escape and link selection, restores focus and releases the body scroll lock. Sidebar can scroll on short desktop viewports; keyboard users can reach its footer links. After a fresh reload, manually scrolling to page bottom on a 1920×1200 CSS viewport keeps Contact active even with its panel starting 472px below the top.
- Contact: required-field validation blocks an empty submission. No real message was sent, so external provider delivery and toast responses were not exercised end to end.

## Review fixes

The independent code review identified bottom-of-page active tracking on tall screens and inaccessible sidebar footer links on short screens. Both were fixed: the navigation helper handles page bottom explicitly, and the fixed sidebar scrolls internally. Navigation regression tests were added and passed.

## Boundaries

The update is local and has not been deployed. No Lighthouse score is claimed. Light is the default; the original app had no theme switcher, so no additional theme system or dependency was introduced. Career years are calculated when Next.js renders/builds the overview and refresh with subsequent builds/renders.

## Credit

Design workflow adapted from unslop by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), licensed CC BY 4.0: https://heydamir.design/unslop
