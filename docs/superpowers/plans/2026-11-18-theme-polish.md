# Dark mode and portfolio polish

## Workflow → UX → implementation
Keep the dashboard shell, content order, table/cards, detail dialogs and contact integration. Add a discoverable header theme toggle on desktop and mobile. Default to light, remember an explicit choice, initialize before paint, synchronize open tabs, and remain usable if storage is unavailable. Use an inline pre-paint initializer and a small React toggle without dependencies.

## Audit and direction
This is a polish pass on the existing blue/slate brand, not a new design. Decorative rainbow metric/project icon backgrounds, repeated statistic cards, percentage bars duplicating KPI values, generic hero copy and tiny table text are the remaining issues. Keep a precise, calm and personal dashboard. Real portrait/product imagery carries the richness; selection and focus carry the accent. Dark mode uses graphite surfaces, off-white text, neutral depth and a restrained blue selection.

## Tasks
- [x] Write theme tests covering first-load preference, saved choice, blocked storage, synchronized appearance and browser theme-color.
- [x] Implement reusable theme helpers, pre-paint initialization and keyboard-accessible persistent toggle.
- [x] Define light/dark semantic tokens, remove light-only classes, improve small type and quiet the panels/icons/metrics.
- [x] Add real AliPlace preview and more specific hero copy, retain compact desktop/mobile layout.
- [x] Update professional role/employment details to match the supplied LinkedIn profile; retain the diploma title confirmed by the user.
- [x] Run full tests, lint, TypeScript and production build. Browser-check both themes, reload persistence, details, drawer, filters and contact validation. Inspect contrast and horizontal overflow.

## Content source
LinkedIn profile read in the user's existing browser session on 18 November 2026: https://www.linkedin.com/in/kit-mikhael-bagares-1143541a7/
Confirms Senior Lead Full Stack Developer at DNA Micro from April 2022; Software Engineer at DNA Micro July 2020–April 2022; Software Engineer at Arielus September 2019–May 2020; six engineers, ~70% setup reduction, 40% API improvement and over 50% less issue-resolution time. Degree wording conflicts with LinkedIn; user explicitly confirmed BS in Computer Engineering, which stays. These are profile-backed claims, not an independent employer audit.

Unslop workflow: Damir Sokolovsky (@heydamir), CC BY 4.0, https://heydamir.design/unslop
