# @chlohal/coal-ui

Independent React 19 components. Original implementations and square-edged, charcoal/copper styling. No UI-library runtime dependencies. No Tailwind configuration required.

This version is an installable local package; it has not been published to npm.

```sh
npm install ./chlohal-coal-ui-0.5.0.tgz
```

```tsx
import { Button, Input, Label } from '@chlohal/coal-ui';
import '@chlohal/coal-ui/styles.css';

export function Contact() {
  return <form>
    <Label htmlFor="email">Email</Label>
    <Input id="email" name="email" type="email" required />
    <Button type="submit">Continue</Button>
  </form>;
}
```

React and react-dom 19 are peer dependencies. Import CSS once in your application entry point. For Next.js, put the stylesheet import in app/layout.tsx. No global reset is included.

Customize `--coal-bg`, `--coal-fg`, `--coal-primary`, `--coal-border`, `--coal-brand` and other prefixed tokens. Add `.dark` or use a `.coal-theme` element with `data-theme="dark"` for dark styling. Portaled floating content inherits the document theme; put `.dark` on the document element when using portals.

Compound components include Dialog, Tabs, Accordion, Select, Combobox and Popover. Forms use native inputs; dialogs use the native HTML dialog top layer. The Calendar supports single, multiple and range selection. Combobox supports string options and single selection. Field validation is controlled with the `invalid` prop. Native scrollbars are used for ScrollArea.

Supported baseline: current evergreen browsers with HTMLDialogElement.showModal, ResizeObserver and CSS color-mix. Test accessibility in the context of your application, especially labels, focus order and nested overlays.

MIT. See the local catalog for complete runnable examples and API notes.

## Coal foundations

Import `@chlohal/coal-ui/fonts.css` after styles.css to opt into locally bundled IBM Plex Sans (400/500/600) and Mono (400/500), Latin subset. OFL licenses ship with the fonts. Set your body font to `var(--coal-font-sans)` for application text. No external font request or runtime dependency.

Badge, Alert and Toast share `intent`: neutral, info, success, warning, danger. Each intent has text/bg/border/solid/on-solid tokens in both themes. Keep a meaningful text label. Warning and danger toasts persist unless an explicit timeout is supplied.

Motion defaults: hover 120 ms, floating entry 160 ms, dialog 200 ms, sheet 240 ms, overlay exit 140 ms. Reduced motion suppresses animations. Set `data-coal-density="compact"` on html for compact controls, including portals. Button supports `loading` without losing its label.

See `/docs/foundations` for live examples and rules covering typography, color, status, motion, forms and feedback.
