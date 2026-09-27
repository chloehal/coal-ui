import ts from "typescript";
import { readFileSync, writeFileSync } from "node:fs";
const text = readFileSync("components/catalog/demos.tsx", "utf8");
const source = ts.createSourceFile(
  "demos.tsx",
  text,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);
const imports = new Map();
for (const node of source.statements)
  if (
    ts.isImportDeclaration(node) &&
    node.importClause?.namedBindings &&
    ts.isNamedImports(node.importClause.namedBindings)
  )
    for (const el of node.importClause.namedBindings.elements)
      imports.set(
        el.name.text,
        node.moduleSpecifier.text.startsWith("@/components/ui/")
          ? "@chlohal/coal-ui"
          : node.moduleSpecifier.text,
      );
const demos = {};
function walk(node) {
  if (ts.isCaseClause(node)) {
    const name = node.expression.text;
    let body = node.statements.map((s) => s.getText(source)).join("\n");
    body = body.replace(
      /<Demo name="switch"\s*\/>/,
      '<label className="flex items-center justify-between">Notifications<Switch defaultChecked><SwitchThumb/></Switch></label>',
    );
    body = body.replace(/<Link\b/g, "<a").replace(/<\/Link>/g, "</a>");
    let prelude = "";
    if (/\bid\b/.test(body)) prelude += " const id = React.useId()\n";
    if (/\bsetMessage\b|\bnotice\b/.test(body))
      prelude +=
        ' const [message, setMessage] = React.useState("")\n const notice = <p role="status">{message}</p>\n';
    if (/\bsaved\b/.test(body))
      prelude += " const [saved, setSaved] = React.useState(false)\n";
    if (/\bfiles\b/.test(body))
      prelude += " const [files, setFiles] = React.useState<string[]>([])\n";
    if (/\bsetPage\b/.test(body))
      prelude += " const [page, setPage] = React.useState(1)\n";
    if (/\bsetDate\b/.test(body))
      prelude +=
        " const [date, setDate] = React.useState<Date | undefined>(new Date(2026,8,12))\n";
    if (name === "toast")
      body =
        'const toast = useToast()\n return <Button variant="outline" onClick={() => toast.add({title:"Changes saved.",description:"Everything is right where you left it."})}>Show notification</Button>';
    const groups = new Map();
    for (const [identifier, mod] of imports)
      if (new RegExp("\\b" + identifier + "\\b").test(body)) {
        if (!groups.has(mod)) groups.set(mod, []);
        groups.get(mod).push(identifier);
      }
    let code =
      '"use client"\nimport * as React from "react"\nimport "@chlohal/coal-ui/styles.css"\n' +
      [...groups]
        .map(([mod, names]) => `import { ${names.join(", ")} } from "${mod}"`)
        .join("\n");
    code +=
      "\n\nexport default function Example() {\n" +
      prelude +
      " " +
      body +
      "\n}\n";
    if (name === "toast")
      code =
        '// Wrap your application with <ToastProvider> from "@chlohal/coal-ui".\n' +
        code;
    // Preview-specific layout classes become portable Tailwind.
    code = code
      .replaceAll("demo-stack", "flex w-full max-w-64 flex-col gap-3")
      .replaceAll("ember-mark", "inline-block size-4 rounded-sm bg-brand");
    const formatted = ts
      .createPrinter({ newLine: ts.NewLineKind.LineFeed })
      .printFile(
        ts.createSourceFile(
          "example.tsx",
          code,
          ts.ScriptTarget.Latest,
          true,
          ts.ScriptKind.TSX,
        ),
      );
    const tree = ts.createSourceFile(
      "example.tsx",
      formatted,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    const result = ts.transform(tree, [
      (context) => (root) => {
        const visit = (node) => {
          if (ts.isJsxAttributes(node))
            return ts.factory.updateJsxAttributes(
              node,
              node.properties.filter(
                (p) =>
                  !ts.isJsxAttribute(p) || p.name.getText(tree) !== "className",
              ),
            );
          return ts.visitEachChild(node, visit, context);
        };
        return ts.visitNode(root, visit);
      },
    ]);
    demos[name] = ts.createPrinter().printFile(result.transformed[0]);
    result.dispose();
  }
  ts.forEachChild(node, walk);
}
walk(source);
writeFileSync("lib/examples.json", JSON.stringify(demos, null, 2) + "\n");
console.log(`Built ${Object.keys(demos).length} runnable examples`);
