export default function Theming() {
  return (
    <article className="docs-page">
      <div className="eyebrow">FOUNDATIONS / 02</div>
      <h1>
        Clear edges.
        <br />
        Quiet character<span className="text-brand">.</span>
      </h1>
      <p className="docs-lead">
        Square controls, fine borders and small copper details. Coal has its own
        visual language without imposing a layout or resetting your application.
      </p>
      <p><a className="text-link" href="/docs/foundations">Explore typography, motion and status rules →</a></p>
      <h2>The palette</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {["bg", "fg", "surface", "border", "brand"].map((token) => (
          <div key={token}>
            <div
              className="h-20 border"
              style={{ background: `var(--coal-${token})` }}
            />
            <p className="mt-2 font-mono text-xs">--coal-{token}</p>
          </div>
        ))}
      </div>
      <h2>Make it yours</h2>
      <p>
        Import the CSS once, then override the prefixed variables in your own
        stylesheet. No Tailwind configuration is needed.
      </p>
      <pre>
        <code>
          {
            ":root {\n  --coal-bg: #faf9f6;\n  --coal-fg: #24221e;\n  --coal-primary: #24221e;\n  --coal-on-primary: #faf9f6;\n  --coal-brand: #b96b23;\n  --coal-border: #d9d5cd;\n}"
          }
        </code>
      </pre>
      <h2>Dark mode</h2>
      <p>
        Add the dark class to the document element. The same components inherit
        the dark tokens. Put the theme on the document when using portaled
        overlays so they inherit it too.
      </p>
      <pre>
        <code>
          {'document.documentElement.classList.toggle("dark", isDark);'}
        </code>
      </pre>
      <h2>Styles that stay in their lane</h2>
      <ul>
        <li>
          All component selectors and custom properties are prefixed with coal.
        </li>
        <li>
          No body, heading or button reset is applied to unrelated elements.
        </li>
        <li>
          Components accept className and native props for application-specific
          styling.
        </li>
        <li>
          Controls and containers use zero border radius. The circular spinner
          is a loading symbol.
        </li>
        <li>
          Focus, disabled states and reduced-motion behavior are included.
        </li>
      </ul>
    </article>
  );
}
