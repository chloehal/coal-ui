import Link from "next/link";
import { catalog } from "@/lib/catalog";
const references = [
  [
    "shadcn/ui",
    "https://ui.shadcn.com/docs/components",
    "Copyable source, registry distribution and the standard application component set.",
  ],
  [
    "Base UI",
    "https://base-ui.com/react/overview/quick-start",
    "Accessible behavior, composable primitives and keyboard interactions.",
  ],
  [
    "Radix Primitives",
    "https://www.radix-ui.com/primitives/docs/overview/introduction",
    "Overlay, focus and selection patterns.",
  ],
  [
    "Mantine",
    "https://mantine.dev/core/package/",
    "Broad forms, navigation, feedback and data-display coverage.",
  ],
  [
    "Chakra UI",
    "https://chakra-ui.com/docs/components/concepts/overview",
    "Semantic building blocks and consistent interaction states.",
  ],
  [
    "Ant Design",
    "https://ant.design/components/overview/",
    "Complex application needs: data tables, trees, uploads and workflows.",
  ],
  [
    "React Aria",
    "https://react-spectrum.adobe.com/react-aria/getting-started.html",
    "Accessibility, labeling, state and compositional patterns.",
  ],
];
export default function Coverage() {
  return (
    <article className="docs-page">
      <div className="eyebrow">RESEARCH / SEPTEMBER 2026</div>
      <h1>
        A considered
        <br />
        collection<span className="text-brand">.</span>
      </h1>
      <p className="docs-lead">
        {catalog.length} implemented components, each with a working preview and
        a typed package export. These libraries were studied for coverage only;
        none supplies Coal components. The reference audit distinguishes the
        essential set from larger application modules.
      </p>
      <h2>Reference libraries</h2>
      <div className="divide-y">
        {references.map(([name, url, reason]) => (
          <div key={name} className="py-4">
            <a
              className="text-link text-sm font-medium"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              {name} ↗
            </a>
            <p className="mt-1 text-muted-foreground">{reason}</p>
          </div>
        ))}
      </div>
      <h2>Available now</h2>
      <div className="flex flex-wrap gap-2">
        {catalog.map((i) => (
          <Link
            key={i.name}
            className="rounded-none border px-2 py-1 text-xs hover:bg-muted"
            href={"/docs/components/" + i.name}
          >
            {i.title}
          </Link>
        ))}
      </div>
      <h2>Selected from the extended inventory</h2>
      <p>
        Twelve reusable additions: Data Table, Command, Input Group, Chip,
        Toggle Group, Steps, Timeline, Copyable Value, Time Picker, Attachment,
        Color Picker and Action Bar. Each has its own implementation, example
        and package export.
      </p>
      <h2>One name for each purpose</h2>
      <ul>
        <li>Divider → Separator; Drawer → Sheet; Sonner → Toast.</li>
        <li>
          Loading → Spinner or Skeleton; Shimmer → Skeleton; Segment → Toggle
          Group or Tabs.
        </li>
        <li>
          Mini Calendar → Calendar; Count and Counting Number → application
          formatting.
        </li>
        <li>
          Dot → Badge; Tile Button → Button; File → Attachment for local
          selection.
        </li>
        <li>
          Filter and View Toolbar → Data Table filtering, Input Group and Action
          Bar for common cases.
        </li>
        <li>
          Page, Panel, Item, List and document/record shells → semantic HTML and
          Card compositions.
        </li>
      </ul>
      <h2>Useful, but reserved for a dedicated implementation</h2>
      <p>
        Tree, Context Menu, Menubar, Navigation Menu, Sidebar/App Shell, Input
        OTP, input masks, mentions, resizable panels, sortable lists, Carousel,
        Tour and DateTimePicker remain candidates. They require distinct
        keyboard, touch or validation work.
      </p>
      <h2>Specialized modules outside the core</h2>
      <p>
        Charts, maps, rich-text and document editors, PDF tooling, event
        calendars, boards, AI conversations, workflow editors, signatures and QR
        generation are separate modules. Their domain and dependency
        requirements should not expand the basic package.
      </p>
      <p className="doc-note">
        Data Table operates on local datasets without virtualization. Command is
        inline and can be composed with Dialog. Attachment validates local
        files; upload transport and server validation belong to your
        application. Steps displays progress and does not implement a wizard
        engine.
      </p>
      <h2>Technical improvements</h2>
      <ul>
        <li>Renderable documentation routes replace unconfigured MDX pages.</li>
        <li>Package source is shared with the preview components.</li>
        <li>
          One package contains original components, type declarations and
          namespaced CSS.
        </li>
        <li>Generated examples share the same source as working previews.</li>
        <li>
          Original Coal implementations and native controls provide semantics,
          keyboard behavior and focus.
        </li>
        <li>No network font requests are required to build or run.</li>
      </ul>
    </article>
  );
}
