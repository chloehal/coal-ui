import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const registry = JSON.parse(readFileSync("registry.json", "utf8"));
test("registry dependencies resolve to coal items, not unrelated shadcn defaults", () => {
  for (const item of registry.items)
    for (const dep of item.registryDependencies ?? []) {
      assert.match(dep, /\/r\/[\w-]+\.json$/, `${item.name}: ${dep}`);
      assert.ok(registry.items.some((x) => dep.endsWith(`/r/${x.name}.json`)));
    }
});
test("all downloadable items contain source and no internal registry imports", () => {
  for (const item of registry.items)
    for (const f of item.files ?? []) {
      assert.ok(existsSync(f.path));
      const source = readFileSync(f.path, "utf8");
      assert.doesNotMatch(source, /@\/registry\//, f.path);
    }
});
test("distributed theme includes the brand tokens used by components", () => {
  const theme = registry.items.find((x) => x.name === "theme");
  for (const mode of ["light", "dark"]) assert.ok(theme.cssVars[mode].brand);
});
