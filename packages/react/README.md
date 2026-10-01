# @chlohal/coal-ui

**Built on a grid. Made to feel alive.**

Independent React 19 components with crisp structure, square controls and organic forms assembled from small squares. Neutral off-white and grayscale surfaces keep mauve to a single accent. No UI-library runtime dependencies and no Tailwind setup.

## Install

This is an installable archive, not yet published on npm:

```sh
npm install ./chlohal-coal-ui-0.5.0.tgz
```

```tsx
import { Button, Input, Label, Spinner, PixelMark, PixelClickFeedback } from "@chlohal/coal-ui";
import "@chlohal/coal-ui/styles.css";
import "@chlohal/coal-ui/fonts.css"; // optional, local Manrope and DM Mono

export function Contact() {
  return <>
    <PixelClickFeedback /> {/* optional; mount once per application */}
    <form>
      <Label htmlFor="email">Email</Label>
      <Input id="email" name="email" type="email" required />
      <Button type="submit">Continue</Button>
    </form>
  </>;
}
```

React and react-dom 19 are peer dependencies. Import CSS once in your application entry point (for Next.js, `app/layout.tsx`). No global reset is included.

## Form and movement

Every component uses zero border radius. Softness comes from motion; surfaces remain neutral and mauve is reserved for the accent.

`PixelMark` draws an organic `bloom` or `seed` from a deterministic square grid. It is decorative and accepts `size`, `className` and SVG props. `Empty` includes a seed by default; set `motif={false}` to supply your own artwork.

`Spinner` accepts `size` (24 by default). Fixed square blocks form a ring whose opacity circulates; the geometry does not rotate. Button's `loading` state uses the same indicator without changing the accessible label or button width.

`PixelClickFeedback` is optional page-wide pointer feedback. It creates a brief 520 ms bloom of square cells on click, skips typing fields and disabled targets, never intercepts interaction, and limits concurrent bursts. It renders no visible element at rest. Mount it once in your app shell.

Controls respond immediately and settle softly. Tabs, switches, disclosures, overlays, toasts and table sorting share motion tokens. Reduced motion removes transitions, stops the loader and suppresses click feedback, including in-flight effects.

The visual references are [loading.dev](https://loading.dev/spinners/loading) and the click gesture of [Obsidian UI](https://www.obsidianui.dev/docs/add-utilities). Coal provides its own artwork and implementation.

## Theme and foundations

Customize `--coal-bg`, `--coal-fg`, `--coal-primary`, `--coal-border`, `--coal-brand` and other prefixed variables. Add `.dark` to the document for dark mode, including portals. A `.coal-theme` element with `data-theme="dark"` scopes dark styling to a section.

Set `data-coal-density="compact"` on the document root for compact controls and overlays. Optional local Manrope (400/500/600) and DM Mono (400/500) include OFL licenses; use `var(--coal-font-sans)` for application text.

Badge, Alert and Toast share five intents: neutral, info, success, warning and danger. Text/background and solid/on-solid pairs are contrast-tested in both themes. Keep meaningful labels. Warning and danger toasts persist unless you supply a timeout.

Color and time pickers, option lists and attachment buttons have custom visible controls. Their underlying inputs preserve form submission and reset behavior; use explicit labels with matching `htmlFor` and `id` for compound fields. Time values use `HH:mm`; color values use six-digit hex. Dialogs use the native HTML top layer. Calendar supports single, multiple and range selection. Combobox supports string options and single selection. Business validation remains under your application's control.

Supported baseline: current evergreen browsers with native dialog, ResizeObserver, Web Animations and CSS color-mix. Test labels, focus order and nested overlays in context. See the local documentation at `/docs/foundations` and `/docs/coverage`.

MIT. OFL licenses accompany the optional fonts.
