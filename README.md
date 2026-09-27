# coal.ui

55 original React components. Square edges, charcoal and paper surfaces, a copper accent. Coal owns its implementations and styles: no Base UI, Radix, shadcn or Tailwind dependency in the distributed library.

## Install in a React project

With the local documentation server running:

```sh
npm install http://localhost:3100/downloads/chlohal-coal-ui-0.5.0.tgz
```

```tsx
import { Button } from "@chlohal/coal-ui";
import "@chlohal/coal-ui/styles.css";

export default function App() {
  return <Button onClick={() => alert("Hello")}>Start a project</Button>;
}
```

React 19 and ReactDOM 19 are peer dependencies. The archive includes JavaScript, TypeScript declarations and namespaced CSS. It is ready for local installation; the package has **not been published to npm**. Download the archive and use `npm install ./chlohal-coal-ui-0.5.0.tgz` on another machine. The site’s illustrative icons use lucide-react; the Coal package does not.

## Local development

Node 22+ and npm. `package-lock.json` is canonical.

```sh
npm ci
npm run package:build
npm run dev -- --port 3100
```

Open http://localhost:3100. Installation, theme and coverage documentation live under `/docs`.

## Checks and production preview

```sh
npm run build
npm run lint
npm run typecheck
npm test
npm run start -- --port 3100
# In another terminal:
npm run test:browser
```

The build creates the package archive, 55 examples and a plain React consumer at `/package-smoke/index.html`. Tests extract the real archive, compile every example without project aliases, verify the dependency boundary, and exercise interactions in a browser.

## Source

- `packages/react/src`: canonical implementations and CSS.
- `packages/react/package.json`: distributable package manifest.
- `components/ui`: package re-exports for the Next.js documentation site.
- `components/catalog/demos.tsx`: working examples.
- `lib/catalog.ts`: component inventory and limitations.
- `docs/research.md`: comparison against seven component ecosystems.
- `docs/component-selection.md`: selection from the extended inventory, aliases and excluded modules.
- `registry/` and `public/r/`: retained historical v0.2 files, excluded from the current package and build.

`--coal-*` tokens customize colors; `.dark` on the document root enables dark mode. Styles do not reset the host page. Controls use native HTML semantics where possible, including native dialog focus management. Advanced modules and current API boundaries are explicitly listed at `/docs/coverage`.

MIT.

## Coal foundations

Import `@chlohal/coal-ui/fonts.css` after styles.css to opt into locally bundled IBM Plex Sans (400/500/600) and Mono (400/500), Latin subset. OFL licenses ship with the fonts. Set your body font to `var(--coal-font-sans)` for application text. No external font request or runtime dependency.

Badge, Alert and Toast share `intent`: neutral, info, success, warning, danger. Each intent has text/bg/border/solid/on-solid tokens in both themes. Keep a meaningful text label. Warning and danger toasts persist unless an explicit timeout is supplied.

Motion defaults: hover 120 ms, floating entry 160 ms, dialog 200 ms, sheet 240 ms, overlay exit 140 ms. Reduced motion suppresses animations. Set `data-coal-density="compact"` on html for compact controls, including portals. Button supports `loading` without losing its label.

See `/docs/foundations` for live examples and rules covering typography, color, status, motion, forms and feedback.
