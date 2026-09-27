# Coal: autonomous library

User direction: square corners, original implementation, easy developer consumption.

Canonical package: packages/react, published name @chlohal/coal-ui (publication is a separate step; local npm tarball is installable immediately). React and ReactDOM are peers. No third-party UI primitives, calendar library, registry CLI or consumer Tailwind dependency.

Components use native HTML where appropriate; modal dialogs use the browser dialog element. Shared internal state/composition/floating-layer utilities are authored within Coal. Styles are prebuilt CSS with coal-prefixed selectors and variables, square corners and a charcoal/copper identity. Circular status marks and spinner strokes are symbols, not rounded control containers.

Preserve the 43-component inventory with explicit APIs and keyboard tests. Replace the registry workflow with package exports, type declarations, npm pack and a clean consumer integration check. Update the docs and show actual package installation instructions without claiming npm publication.
