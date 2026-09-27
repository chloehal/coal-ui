# Component coverage review — 2026-09-12

Reviewed official component catalogs:

- https://ui.shadcn.com/docs/components — distribution and standard React application inventory.
- https://base-ui.com/react/overview/quick-start — primitives, keyboard and focus behavior.
- https://www.radix-ui.com/primitives/docs/overview/introduction — accessible composition.
- https://mantine.dev/core/package/ — broad inputs, navigation and feedback.
- https://chakra-ui.com/docs/components/concepts/overview — semantic building blocks.
- https://ant.design/components/overview/ — complex application patterns.
- https://react-spectrum.adobe.com/react-aria/getting-started.html — accessibility and composition.

Implemented 55 original components, with 55 examples. Twelve additions were selected from the user's inventory: Data Table, Command, Input Group, Chip, Toggle Group, Steps, Timeline, Copyable Value, Time Picker, Attachment, Color Picker and Action Bar. See `component-selection.md` for the full selection criteria and grouped exclusions. Advanced omissions remain explicit in `/docs/coverage`.

Version 0.3 replaces all external UI primitives with original Coal React implementations. The package has only React and ReactDOM peer dependencies, includes compiled CSS, and uses native dialog and form controls. Reference libraries inform coverage only; they supply no package code. Native dialog handles modal focus and inertness. Keyboard/calendar and nested overlay behavior are verified in browser tests.

Technical findings fixed: unconfigured MDX routes, duplicated UI source, unscoped registry dependencies, internal imports in distributed files, missing brand tokens, build tied to downloaded CLI, Google-font network build dependency, mobile dialog bounds, select highlighting/scrolling, tooltip stacking, missing refs and outdated packages. Next.js patched within v15; PostCSS overridden to a patched compatible v8 release. npm audit reports zero vulnerabilities at verification time.
