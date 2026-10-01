import { FoundationsPreview } from "@/components/catalog/foundations-preview";
export const metadata = { title: "Foundations — coal.ui" };
export default function Foundations() {
  return (
    <article className="docs-page" lang="en">
      <div className="eyebrow">FOUNDATIONS / COAL RULES</div>
      <h1>
        Precise parts.
        <br />
        Organic possibilities<span className="text-brand">.</span>
      </h1>
      <p className="docs-lead">
        An off-white canvas, neutral grays, and a single mauve accent. Every
        corner is square. Small cells bring movement and character to the
        controls themselves.
      </p>
      <h2>Zero radius, soft movement</h2>
      <p>
        Buttons, fields, cards and overlays share sharp corners. Softness comes
        from how they respond: an immediate press, followed by a gentle settle.
        No tinted panels or decorative side stripes.
      </p>
      <h2>Typography</h2>
      <p>
        Manrope for text and controls. DM Mono for code, identifiers and
        shortcuts. Both are bundled locally; no external font requests.
      </p>
      <div className="border p-6">
        <p style={{ fontSize: 32, lineHeight: 1.2, fontWeight: 600 }}>
          The detail makes the difference.
        </p>
        <p className="mt-3">A project, a team, a next step.</p>
        <p className="mt-3 font-mono text-sm">COAL-0042 · ⌘ K · 0123456789</p>
      </div>
      <pre tabIndex={0}>
        <code>
          {
            'import "@chlohal/coal-ui/styles.css";\nimport "@chlohal/coal-ui/fonts.css"; // optional\n\n// body { font-family: var(--coal-font-sans); }'
          }
        </code>
      </pre>
      <p>
        Body text: 16px. Controls: 14px. Supporting text: at least 12px.
        Weights: 400, 500 and 600. Tabular figures keep numeric values aligned.
      </p>
      <h2>Neutral surfaces. One accent.</h2>
      <p>
        Surfaces and text use neutral grays. Mauve marks an action, selection or
        keyboard focus. Statuses use explicit labels and distinct symbols on
        neutral backgrounds; meaning never depends on color alone.
      </p>
      <FoundationsPreview />
      <h2>Motion rules</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Interaction</th>
            <th className="text-left">Behavior</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Hover", "Color and detail · 180ms"],
            ["Press", "Immediate compression · 90ms, gentle return · 320ms"],
            ["Focus", "Immediate, visible outline"],
            ["Switch, tabs, disclosure", "Continuous movement · 320ms"],
            ["Filtering and sorting", "Move from the current position · 380ms"],
            ["Floating content", "6px and opacity · 300ms"],
            ["Dialog", "12px and opacity · 380ms"],
            ["Sheet", "From the edge · 440ms"],
            ["Dismissal", "220ms"],
            ["Reduced motion", "No transitions; static loading indicator"],
          ].map(([a, b]) => (
            <tr key={a}>
              <td className="py-2">{a}</td>
              <td>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Accessibility is part of the design</h2>
      <ul>
        <li>Visible labels, keyboard navigation and clear focus indicators.</li>
        <li>
          Text contrast of at least 4.5:1; essential control boundaries at least
          3:1.
        </li>
        <li>
          Validation next to the field. Preserve input when an action fails.
        </li>
        <li>
          Warning and error notifications persist by default. Set timeout to 0
          to keep any notification visible.
        </li>
        <li>
          Respect reduced motion and forced colors. Decorative cells stay out of
          the accessibility tree.
        </li>
        <li>
          Controls use 40px height, or 32px in compact mode. Small targets
          remain at least 24px.
        </li>
      </ul>
      <p className="doc-note">
        The components provide shared behavior. Your application supplies
        meaningful labels, descriptions, validation and content.
      </p>
    </article>
  );
}
