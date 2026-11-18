# Professional engineering dashboard

The user's dashboard brief replaces the earlier editorial direction. Implement a frontend refactor in the current Next.js app; preserve all eleven projects, actual career records, SEO, analytics, résumé, social URLs and the existing Web3Forms integration.

## Workflow → UX → implementation
Visitors arrive at an overview with identity, role, contact/résumé actions and five real metrics. They scan a project table next to engineering outcomes, open project details, then review process, technologies, experience, about and contact. Desktop uses a fixed 240px sidebar, a compact sticky header, fluid main area capped at 1760px, 24px gaps, white cards and slate surfaces. Tablet/mobile use a modal navigation drawer; project rows become cards below 768px. Lower panels share a responsive grid.

## Visual direction
Product: professional evidence of Kit's engineering, leadership and product delivery.
Character: precise, considered, approachable.
World: real production software, following the supplied Redis Dashboard reference.
Moments: real project content and portfolio-specific outcomes; actual screenshots inside project details.
Signature: project icons and understated section navigation, with quiet blue selection.
Use #F8FAFC background, #FFFFFF cards, #0F172A text, #64748B secondary, #E2E8F0 borders, #2563EB accent. Use 8–12px radii, Inter plus mono for small values, Lucide icons, 150–200ms color transitions. User explicitly requests subtle color-coded icons, a few supporting color tokens are allowed. No generated filler, availability claim, fake chart or invented project status.

## Architecture
Retain existing content source in portfolio-data.ts and all existing section modules. Introduce portfolio shell/sidebar/header, overview metric cards, reusable panel heading, project explorer/detail dialog, and quick contact. Native modal dialogs provide focus containment and Escape for navigation and project details without extra packages. A small pure utility handles filters and derived experience with node tests. Existing contact submit logic stays intact.

## Quality
Check the 7 sidebar destinations and active tracking, all project details, filter/search combinations including empty states, mobile/tablet layouts, Escape/focus return, empty form validation, production build, lint/typecheck, SSR metadata/content, and reduced motion. No new theme switch: none exists in the app, and dark mode is conditional in the brief.

Design workflow adapted from unslop by Damir Sokolovsky (@heydamir), CC BY 4.0: https://heydamir.design/unslop
