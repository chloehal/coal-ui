# Accessibility audit — 27 September 2026

Scope: Coal documentation, the 55 component demos, and the standalone React package. Reference: [WCAG 2.2 A/AA](https://www.w3.org/WAI/WCAG22/quickref/). Tests use Chromium, axe-core, keyboard interaction, computed contrast and forced-colors emulation.

## Corrections

- Secondary text on the secondary surface: the previous 4.31:1 contrast was below the 4.5:1 text threshold. Darkened the light-theme muted token using a neutral grayscale palette.
- Calendar days outside the displayed month use the muted text token instead of opacity, maintaining readable contrast in the dark theme.
- Essential control boundaries now have a dedicated token, tested at 3:1 against both background surfaces in both themes. Decorative dividers remain subtle.
- Restored visible keyboard focus on both search fields, menu options and grouped number inputs; added scroll margins below the sticky header.
- Made scrollable code samples keyboard focusable.
- Checkbox/radio targets and close controls have a minimum 24px box; switch targets are at least 24px tall. Custom selection indicators remain visible in forced colors.
- Modal dialogs explicitly cycle Tab/Shift+Tab across their current visible controls, avoiding a focus escape at the last command.
- At 320 CSS pixels the header uses the mobile navigation and file upload controls can shrink without clipping their labels. Table scroll areas are keyboard focusable; upload errors expose an invalid state.
- Mobile navigation identifies its controlled panel, restores focus on Escape and closes when keyboard focus leaves the panel.
- Hover overlays can be dismissed with Escape even when opened by pointer without focus.
- Floating controls remain in the main landmark (or the enclosing native dialog), making their content easier to locate with assistive technology.
- Table pagination has a distinct accessible landmark name.
- Required custom Select controls expose required/invalid state on their visible combobox.
- The interface and foundations are English-only; documentation pages have distinct titles.

## Reproduce

Start the built site at `http://localhost:3100`, then run:

```sh
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
# In another terminal:
npm run test:a11y
npm test
npm run test:browser
```

`test:a11y` checks the 60 pages in light and dark, 12 expanded widget states per theme, keyboard focus, modal tab trapping, Escape, 320px reflow and forced colors. Shared navigation is scanned on the gallery; individual documentation scans target the main content. JSON attachments preserve violations and axe checks requiring manual review. `A11Y_SCOPE=pages` or `A11Y_SCOPE=expanded` limits the axe portion for targeted reruns; keyboard tests still run.

## Verification

- Production build, TypeScript checks and ESLint passed.
- Package and standalone consumer tests: 7 passed.
- Browser interaction regressions: 25 passed, including custom picker values, keyboard dismissal, file selection and form reset.
- Page scans: 60 pages in each theme, 120 scans with no automatic violations.
- Expanded controls: 12 states in each theme, 24 scans with no automatic violations after animations finish. The targeted expanded-state suite and keyboard/reflow/forced-colors checks passed (4 tests).
- An initial dialog contrast result captured intermediate opacity during opening. The audit now waits for finite animations before scanning; the stable dialog passes. Results above combine the full page run and the corrected expanded-state rerun. Manual-review checks remain explicitly outside the automatic pass result.

## Limits

Automated results do not establish full WCAG conformance. No complete VoiceOver/NVDA/JAWS reading session, Safari/Firefox matrix, speech-input session or usability session with disabled participants was performed. The accessible tree and semantics were inspected, which does not replace those tests. Axe “incomplete” checks require interpretation, especially clipped/scrollable code and custom controls. Applications using the library remain responsible for labels, field descriptions, validation messages, content and their own theme overrides.

## Design follow-up

Subsequent feedback changed the palette to neutral grayscale with one mauve accent, zero radius, and functional pixel indicators. Color, time, option and file controls now have custom visible interfaces while retaining form values, names and keyboard behavior. Their open states are included in the final axe checks.
