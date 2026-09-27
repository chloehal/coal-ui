# Coal design rules

Direction: precise, calm, slightly industrial. Angular coal mark, paper/ash/charcoal surfaces and a small copper selection marker. All component corners remain square. Borders and surface tones establish depth; no decorative shadows or backdrop blur.

Typography: optional local IBM Plex Sans 400/500/600 and Mono 400/500. Body 16 px, controls/data 14 px, metadata 12 px minimum. Interface headings 20/24/32 px. Mono for code, IDs and shortcuts. Tabular figures. Font bundle is optional and carries OFL licenses.

Spacing: 4 px base. Controls default to 40 px, compact 32 px, main touch controls 44 px. Root data-coal-density controls portals too. One primary action per functional area.

Semantic colors: neutral=waiting/draft/archive; info=information/in-progress; success=completed/confirmed; warning=intervention soon; danger=error/irreversible action. Brand copper is never a semantic status. Use intent consistently on Badge, Alert and Toast. Always supply a meaningful label. Tokens explicitly pair text/background and solid/on-solid in both themes. Test these text contrasts at 4.5:1.

Motion: hover color 120 ms; floating entry 160 ms/4 px; dialog 200 ms/8 px; sheet 240 ms; overlay exit 140 ms. Decelerating cubic-bezier(.215,.61,.355,1). Paired backdrop shares duration. Selection and focus are immediate. No bounce, scaling cards or decorative loops. Respect reduced motion across components and portal layers. Retain closing overlay DOM only for its exit and cancel pending closure on reopen.

Feedback: errors under fields, local alerts for section problems, brief toasts for confirmation. Warning/danger toasts persist by default; never let necessary recovery information disappear automatically. Keep user input on failure. Form validation business rules belong to the consumer. Precise action verbs. Loading buttons preserve their name and reject duplicate clicks.

Canonical implementation: packages/react/src; live rules and examples: /docs/foundations. Avoid introducing another set of durations, status names or radius values.
