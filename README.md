# coal.ui

**Built on a grid. Made to feel alive.**

55 original React components with a technical backbone and an organic feel. Small squares form soft silhouettes, a quiet loading ring and a brief bloom at the point of a click. Crisp structure gives those gestures a place to live.

## The design language

- **Neutral off-white and one mauve accent.** Grayscale surfaces and text. Mauve is reserved for actions, selection and focus. No cream, beige or orange.
- **Zero radius. Soft movement.** Every corner is square. Immediate press feedback and a gentle settle provide the softness.
- **Organic forms, square cells.** Square cells build the checkbox mark, switch thumb, segmented progress and tab indicator, as well as the loader and decorative motifs.
- **Tactile, settled motion.** A press responds immediately, then eases back. Switches slide, tab indicators follow the selection, disclosures fold, and filters and table sorts preserve visual continuity.
- **A light touch.** Pixel bursts last 520 ms and run only after a pointer click. No ambient particle loop. Reduced motion stops the loader, removes transitions and suppresses click feedback.

The library owns its implementations and styles. It has no Base UI, Radix, shadcn or Tailwind runtime dependency. React 19 and ReactDOM 19 are peers.

## Install

With the local documentation server running:

```sh
npm install http://localhost:3100/downloads/chlohal-coal-ui-0.5.0.tgz
```

Or download the archive and install it on another machine:

```sh
npm install ./chlohal-coal-ui-0.5.0.tgz
```

The package has **not been published to npm**. It includes JavaScript, TypeScript declarations, namespaced CSS and optional local fonts.

```tsx
import { Button, PixelClickFeedback } from "@chlohal/coal-ui";
import "@chlohal/coal-ui/styles.css";
import "@chlohal/coal-ui/fonts.css"; // optional

export default function App() {
  return (
    <>
      <PixelClickFeedback /> {/* optional: mount once for page-wide click feedback */}
      <Button onClick={() => console.log("Start")}>Start a project</Button>
    </>
  );
}
```

`Spinner` and loading buttons share a ring of fixed square blocks with circulating opacity. `PixelMark` provides decorative `bloom` and `seed` silhouettes. `Empty` includes a seed motif by default; pass `motif={false}` when supplying your own illustration. All decorative graphics are hidden from assistive technology.

The loading reference is [loading.dev](https://loading.dev/spinners/loading); the pointer gesture is inspired by [Obsidian UI](https://www.obsidianui.dev/docs/add-utilities). Coal uses its own square-cell artwork and implementation.

## Local development

Node 22+ and npm. `package-lock.json` is canonical.

```sh
npm ci
npm run package:build
npm run dev -- --port 3100
```

Open http://localhost:3100. Try the movement, loader and pixel forms at http://localhost:3100/docs/foundations#motion.

## Verification

```sh
npm run build
npm run lint
npm run typecheck
npm test
npm run start -- --port 3100
# In another terminal:
npm run test:browser
```

The build creates the installable archive, 55 runnable examples and a plain React consumer at `/package-smoke/index.html`. Tests compile the real archive in isolation, check contrast and dependency boundaries, and exercise browser interactions and reduced motion.

## Foundations

`--coal-*` tokens control the palette, radius, density and motion. The documentation consumes the same palette as the installed library. Add `.dark` to the document root for dark mode, including portaled content. Set `data-coal-density="compact"` on the root for compact controls.

Optional local Manrope (400/500/600) and DM Mono (400/500) fonts ship with OFL licenses. Use `var(--coal-font-sans)` for application text. No external font request.

Badge, Alert and Toast share `intent`: neutral, info, success, warning and danger. Each provides paired text/background and solid/on-solid colors in both themes. Labels and symbols carry meaning alongside color. Warning and danger toasts persist unless an explicit timeout is supplied.

Motion defaults: 90 ms press, 180 ms hover, 320 ms controls/disclosures, 300 ms floating entry, 380 ms dialog/layout, 440 ms sheet and 220 ms exit. Loading uses a 1200 ms opacity cycle. Fast repeated actions must not leave stale overlays or stranded content. Loading buttons preserve their label and dimensions and reject duplicate clicks.

## Source

- `packages/react/src`: canonical components, pixel utilities and styles.
- `packages/react/package.json`: distributable package manifest.
- `components/ui`: package re-exports for the documentation site.
- `components/catalog/demos.tsx`: runnable component examples.
- `lib/catalog.ts`: inventory and API boundaries.
- `.interface-design/system.md`: shared design decisions.
- `docs/`: research and component selection notes.
- `registry/` and `public/r/`: historical v0.2 assets, excluded from the current package and build.

The package applies no global reset. Advanced modules and current limitations are listed at `/docs/coverage`. Test labels, focus order and interactions in the context of your application.

MIT.

## Accessibility

See the [accessibility audit](docs/accessibility-audit.md) for scope, corrections, verification commands and remaining manual checks. Run `npm run test:a11y` against the local production preview. Automated checks target WCAG 2.2 A/AA and do not establish complete conformance.

Pixel geometry uses a shared 3 × 3 CSS px cell with a 1px gutter in static motifs. The switch uses 25 touching cells in a 15 × 15 px square, spreading into staggered rows during its 520ms transition without hiding or resizing cells. Larger motifs add cells; motion changes position and opacity without resizing cells.
