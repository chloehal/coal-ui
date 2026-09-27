import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
const registry = JSON.parse(readFileSync("registry.json", "utf8"));
const origin = (
  process.env.REGISTRY_BASE_URL || "http://localhost:3100"
).replace(/\/$/, "");
mkdirSync("public/r", { recursive: true });
for (const item of registry.items) {
  const output = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
    registryDependencies: item.registryDependencies?.map((url) =>
      url.replace(registry.homepage, origin),
    ),
    files: item.files?.map((file) => ({
      ...file,
      content: readFileSync(file.path, "utf8"),
    })),
  };
  writeFileSync(
    `public/r/${item.name}.json`,
    JSON.stringify(output, null, 2) + "\n",
  );
}
writeFileSync(
  "public/r/registry.json",
  JSON.stringify(registry, null, 2) + "\n",
);
console.log(`Built ${registry.items.length} registry items for ${origin}`);
