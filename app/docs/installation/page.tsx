import Link from "next/link";
import { CopyButton } from "@/components/catalog/copy-button";
export default function Installation() {
  const command =
    "npm install http://localhost:3100/downloads/chlohal-coal-ui-0.5.0.tgz";
  return (
    <article className="docs-page">
      <div className="eyebrow">GETTING STARTED / 01</div>
      <h1>
        One package.
        <br />
        Your next interface<span className="text-brand">.</span>
      </h1>
      <p className="docs-lead">
        Coal is an independent React library. Its components, interactions and
        styles live here. No component framework or Tailwind setup required in
        your project.
      </p>
      <h2>1. Install Coal</h2>
      <p>
        This version is available as an npm-compatible archive. Keep the local
        server running while installing it, or download the archive and share it
        with your team. React 19 and React DOM 19 are required.
      </p>
      <div className="code-header">
        <span>Terminal</span>
        <CopyButton text={command} />
      </div>
      <pre>
        <code>{command}</code>
      </pre>
      <p className="mt-4">
        <a
          className="text-link"
          href="/downloads/chlohal-coal-ui-0.5.0.tgz"
          download
        >
          Download @chlohal/coal-ui 0.5.0 ↗
        </a>
      </p>
      <p className="doc-note">
        The package has not been published to npm. Once published, installation
        will be npm install @chlohal/coal-ui. The archive works now without
        publication.
      </p>
      <h2>2. Import the styles once</h2>
      <p>
        In your React application entry point, or app/layout.tsx in Next.js:
      </p>
      <pre>
        <code>{'import "@chlohal/coal-ui/styles.css";'}</code>
      </pre>
      <p className="mt-3">
        The stylesheet is already compiled. It uses coal-prefixed classes and
        variables, with no global reset. Your application controls its own page
        layout and typography.
      </p>
      <h2>3. Build something</h2>
      <pre>
        <code>
          {
            'import { Button, Input, Label } from "@chlohal/coal-ui";\n\nexport function ContactForm() {\n  return (\n    <form style={{ display: "grid", gap: 12, maxWidth: 320 }}>\n      <Label htmlFor="email">Email address</Label>\n      <Input id="email" name="email" type="email" required />\n      <Button type="submit">Continue</Button>\n    </form>\n  );\n}'
          }
        </code>
      </pre>
      <h2>Optional local typography</h2>
      <pre>
        <code>
          {'import "@chlohal/coal-ui/fonts.css"; // after styles.css'}
        </code>
      </pre>
      <p>
        IBM Plex Sans and Mono are bundled locally with their licenses. Use
        var(--coal-font-sans) for your application text. See{" "}
        <a className="text-link" href="/docs/foundations">
          Foundations
        </a>{" "}
        for typography, motion and semantic status rules.
      </p>
      <h2>What comes with the package?</h2>
      <ul>
        <li>
          55 components, named ES module exports and TypeScript declarations.
        </li>
        <li>Original React implementations and native browser controls.</li>
        <li>One stylesheet with square corners and charcoal/copper tokens.</li>
        <li>No runtime dependencies except React and React DOM peers.</li>
      </ul>
      <h2>Overlays and notifications</h2>
      <p>
        Dialogs use the native HTML dialog element. Floating panels handle
        positioning, dismissal and keyboard navigation within Coal. Wrap your
        app in ToastProvider before calling useToast. Essential information must
        always have a visible label.
      </p>
      <h2>Development and distribution</h2>
      <pre>
        <code>
          {
            "npm ci\nnpm run package:build\nnpm run dev -- --port 3100\n\n# Build package, examples and documentation\nnpm run build"
          }
        </code>
      </pre>
      <p className="mt-3">
        The package source is in packages/react/src. The build emits JavaScript,
        declarations, CSS and an archive under public/downloads. It does not
        publish anything externally.
      </p>
      <h2>Next up</h2>
      <p>
        <Link className="text-link" href="/docs/theming">
          Customize the theme
        </Link>{" "}
        or{" "}
        <Link className="text-link" href="/">
          explore the components
        </Link>
        .
      </p>
    </article>
  );
}
