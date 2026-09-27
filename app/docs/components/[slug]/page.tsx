import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { catalog } from "@/lib/catalog";
import { Demo } from "@/components/catalog/demos";
import { CopyButton } from "@/components/catalog/copy-button";
import examples from "@/lib/examples.json";
export function generateStaticParams() {
  return catalog.map((i) => ({ slug: i.name }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = catalog.find((i) => i.name === slug);
  return { title: `${item?.title ?? "Component"} — coal.ui` };
}
export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = catalog.find((i) => i.name === slug);
  if (!item) notFound();
  const source = await readFile(
    path.join(process.cwd(), "packages/react/src", `${item.name}.tsx`),
    "utf8",
  );
  const example = examples[item.name as keyof typeof examples];
  const command =
    "npm install http://localhost:3100/downloads/chlohal-coal-ui-0.5.0.tgz";
  return (
    <article className="docs-page">
      <div className="eyebrow">
        <Link href="/">COMPONENTS</Link>
        <span>/</span>
        {item.category.toUpperCase()}
      </div>
      <h1>
        {item.title}
        <span className="text-brand">.</span>
      </h1>
      <p className="docs-lead">{item.description}</p>
      <h2>In practice</h2>
      <div className="doc-preview">
        <Demo name={item.name} />
      </div>
      <p className="doc-note">{item.note}</p>
      <h2>Installation</h2>
      <p>
        Install Coal once. Components and TypeScript declarations are included.
        React 19 and React DOM 19 are peer dependencies.
      </p>
      <div className="code-header">
        <span>Terminal · local package</span>
        <CopyButton text={command} />
      </div>
      <pre>
        <code>{command}</code>
      </pre>
      <p className="mt-3 text-muted-foreground">
        This installs the local package. It is not yet published on npm. See{" "}
        <Link className="text-link" href="/docs/installation">
          installation
        </Link>{" "}
        for stylesheet setup and integration.
      </p>
      <h2>Usage</h2>
      <div className="code-header">
        <span>example.tsx</span>
        <CopyButton text={example} />
      </div>
      <pre>
        <code>{example}</code>
      </pre>
      <h2>Source</h2>
      <p>
        The original Coal implementation. Use the package export to integrate
        it.
      </p>
      <div className="code-header">
        <span>packages/react/src/{item.name}.tsx</span>
        <CopyButton text={source} />
      </div>
      <pre>
        <code>{source}</code>
      </pre>
      <h2>Accessibility checklist</h2>
      <ul>
        <li>
          Provide an accessible name for controls, including icon-only buttons.
        </li>
        <li>
          Check keyboard navigation, visible focus and disabled states in your
          application.
        </li>
        <li>Do not rely on color alone to communicate status.</li>
      </ul>
      <footer className="page-footer">
        <Link href="/">← All components</Link>
        <Link href="/docs/theming">Make it yours →</Link>
      </footer>
    </article>
  );
}
