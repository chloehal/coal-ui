# Coal design rules

Direction: English-only UI. Neutral off-white (#fafafa), pure grayscale surfaces and text, and one mauve accent (#756887). No warm backgrounds or mauve-tinted surfaces. Zero border radius everywhere. No decorative left stripes. Pixel cells participate in actual controls: checkboxes, switches, sliders, progress and tabs. Custom color, time, option and file controls, retaining accessible form semantics.

Typography: optional local Manrope 400/500/600 and Mono 400/500. Body 16 px, controls/data 14 px, metadata 12 px minimum. Interface headings 20/24/32 px. Mono for code, IDs and shortcuts. Tabular figures. Font bundle is optional and carries OFL licenses.

Spacing: 4 px base. Controls default to 40 px, compact 32 px, main touch controls 44 px. Root data-coal-density controls portals too. One primary action per functional area.

Semantic colors: neutral=waiting/draft/archive; info=information/in-progress; success=completed/confirmed; warning=intervention soon; danger=error/irreversible action. Brand mauve is never a semantic status. Use intent consistently on Badge, Alert and Toast. Always supply a meaningful label. Tokens explicitly pair text/background and solid/on-solid in both themes. Test these text contrasts at 4.5:1.

Motion: immediate feedback with a soft, settled finish. Hover 180 ms, press 90 ms, controls/accordions 320 ms, floating entry 300 ms/6 px, dialog 380 ms/12 px, sheet 440 ms, exit 220 ms, layout changes 380 ms. Shared settling curve cubic-bezier(.22,.8,.24,1), no pronounced bounce. Buttons shift down 1px without scaling; switch cells spread and regroup; tab indicators move; filters and table sorting animate from their current positions. Retain exiting overlays and toasts until closure, while disabling interaction. Accordions stay mounted but inert when closed. The 1200 ms loader changes block opacity, never rotates its geometry. Respect reduced motion, including active JavaScript animations.

Feedback: errors under fields, local alerts for section problems, brief toasts for confirmation. Warning/danger toasts persist by default; never let necessary recovery information disappear automatically. Keep user input on failure. Form validation business rules belong to the consumer. Precise action verbs. Loading buttons preserve their name and reject duplicate clicks.

Canonical implementation: packages/react/src; live rules and examples: /docs/foundations. Avoid introducing another set of durations, status names or radius values.

Pixel grid: every cell is 3×3 CSS px, with a 1px gutter in static motifs. The switch uses 25 touching cells in a 15 × 15 px square, spreading into staggered rows during its 520ms transition without hiding or resizing cells. Larger motifs increase cell count, never scale the grid. Opacity and translation may animate; cell size stays fixed, including inside buttons and overlays.

Signature: small square cells create organic seed/bloom silhouettes. Use the shared PixelMark in the brand, hero and empty states. The loader keeps its fixed blocks. Pointer clicks use a brief 520 ms square-cell bloom inspired by Obsidian’s radial gesture, bounded to four concurrent bursts, never an idle loop. Tagline: “Built on a grid. Made to feel alive.”

Accessibility: essential input boundaries use --coal-control-border (3:1 against both surfaces); --coal-border is decorative only. Secondary text must keep 4.5:1. Preserve visible keyboard focus, at least 24px target boxes, scrollable code/table keyboard access, 320px reflow and forced-colors indicators. Run npm run test:a11y when changing interactive patterns.
