# Dark mode, visual polish, and project updates

## Result
The existing dashboard now supports light and dark themes through a header toggle available on desktop and mobile. Light remains the default. The selected theme is initialized before paint, persists across reloads, synchronizes across tabs, updates native control appearance and the browser theme color, and still switches when storage is blocked. No dependency was added.

## Visual polish
1. Spacing: a single aligned desktop metric strip replaces five competing card outlines; mobile retains readable metric cards.
2. Color: neutral slate/light and graphite/dark ramps share semantic tokens. Blue is reserved for actions, focus and selection.
3. Icons: project icons use one neutral treatment; decorative metric icon containers were removed.
4. Copy: the introduction names real product work; career wording and project descriptions were checked against supplied sources.
5. Type: larger project descriptions and technology labels, with quieter heading/figure weights.
6. Layout: dashboard structure and section order remain, with a real Aliplaces preview giving the introduction a distinct visual.
7. Details: theme-aware buttons, selections, forms, native dialogs, project rows and monogram. Browser reload now derives active navigation from actual position.
8. Visuals: current public website screenshots and the ApplyWithContext dashboard preview replace missing/outdated project imagery. No generated imagery was needed.
9. Motion: existing short interaction transitions and reduced-motion support remain; no theme-wide animation was introduced.

## Content sources and decisions
- LinkedIn: https://www.linkedin.com/in/kit-mikhael-bagares-1143541a7/ — read in the user's existing browser session on 18 November 2026. Current role is Senior Lead Full Stack Developer at DNA Micro, April 2022–present. Earlier employment dates agree with the portfolio. Six developers, ~70% setup reduction, 40% API improvement and over 50% less issue-resolution time are supported by the profile. These remain self-reported achievements rather than independently audited employer results.
- Education: user explicitly confirmed **BS in Computer Engineering**. That wording is retained despite LinkedIn's different degree label.
- Aliplaces: https://www.aliplaces.com/ — production link, brand spelling and current discovery screenshot updated. Screenshot captured from its public `/discover` page.
- AIKapoy: https://www.aikapoy.com/ — production link and current site screenshot added. Description now reflects the public browser sidebar's supported modes and user-controlled output.
- ApplyWithContext: https://www.applywithcontext.cv/ — production link, beta status and application-tracking/drafting description updated. Uses the actual dashboard preview published on the product site.
- Finllet: https://finllet.app/ — added as an independent finance product in active development, with a public preview screenshot. Local `finance-log` README/manifests support the Expo, React Native, TypeScript, Next.js and SQLite stack.
- B-MAD: https://www.trybmad.com/ — added as an independent calorie/habit-tracking product in development, with public preview screenshot. Its local README/manifests support the same web/mobile stack.
- Finllet and B-MAD explicitly say mobile store releases are coming soon. Their status stays **in development**, and they are excluded from the Live filter. The user confirmed building both products end to end. Both entries credit product, design, web and mobile development.

The impact rail now sits alongside the project table from 1440px, fitting common laptop widths.

The portfolio has **13 projects**, **8 independent products**, **5 team/client projects**, and **6 records under the Live filter**. Those counts come from actual project records, not marketing estimates.

## Changed files
- `src/lib/theme.ts`: storage-safe theme helpers and pre-paint initialization script.
- `src/components/portfolio/theme-toggle.tsx`: accessible theme toggle and cross-tab synchronization.
- `src/app/layout.tsx`, `globals.css`, `tailwind.config.ts`: theme initialization, light/dark tokens, coordinated selection/controls and quieter shared styling.
- `portfolio-shell.tsx`, `portfolio-sidebar.tsx`: header toggle, theme-aware navigation/monogram and initial active-section correction.
- `overview-metrics.tsx`, `portfolio-hero.tsx`, `project-icon.tsx`, `featured-work.tsx`, `project-card.tsx`, `impact-metrics.tsx`: restrained metrics/icons, specific intro, real product preview, readable table text, themed hover states, and removal of duplicate KPI bars.
- `experience.tsx`, `src/lib/portfolio-data.ts`: profile-aligned career details, public source link, production URLs/descriptions/screenshots and two new products.
- `src/lib/portfolio-view.ts`: independent-product filtering supports contribution labels beyond solo builds.
- `tests/theme.test.mjs`, `tests/portfolio-view.test.mjs`: theme edge cases and updated data/filter coverage.
- `public/static/images/`: new `aliplaces-production.jpg`, `aikapoy-production.jpg`, `applywithcontext-app.png`, `finllet-production.jpg`, and `bmad-production.jpg`.

## Verification
- `npm test` (9 tests), `npm run lint`, `npx tsc --noEmit`, `npm run build` and `git diff --check` passed.
- Unit tests cover valid/invalid saved preferences, blocked persistence, page/native-control/address-bar appearance, pre-paint restoration, filters, completed career years, and navigation edge cases.
- Browser checks confirmed theme persistence after reload and synchronization across two tabs.
- Dark native dialogs and the mobile navigation drawer inherit the correct surfaces and remain dismissible with Escape.
- At 320px width, both themes have no horizontal overflow and the theme control, drawer and project cards remain usable.
- All five refreshed/added project detail images loaded, with correct public links.
- Checked text contrast pairs exceed 4.5:1: light secondary on a raised surface 4.81:1, light selection 4.69:1, dark secondary on a raised surface 6.28:1, dark selection 7.25:1.
- The original contact submission integration is unchanged. No real message was sent. No deployment or Lighthouse score is claimed.

Design workflow adapted from unslop by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), CC BY 4.0: https://heydamir.design/unslop
