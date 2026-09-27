import { test } from "node:test";
import assert from "node:assert/strict";
import {
  readFileSync,
  mkdirSync,
  writeFileSync,
  rmSync,
  mkdtempSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
test("the actual npm archive and every package example compile in an isolated consumer", () => {
  const dir = mkdtempSync(path.resolve(".consumer-"));
  try {
    const target = dir + "/node_modules/@chlohal/coal-ui";
    mkdirSync(target, { recursive: true });
    execFileSync("tar", [
      "-xzf",
      "public/downloads/chlohal-coal-ui-0.5.0.tgz",
      "--strip-components=1",
      "-C",
      target,
    ]);
    const pkg = JSON.parse(readFileSync(target + "/package.json", "utf8"));
    assert.deepEqual(Object.keys(pkg.peerDependencies).sort(), [
      "react",
      "react-dom",
    ]);
    assert.equal(Object.keys(pkg.dependencies ?? {}).length, 0);
    const examples = JSON.parse(readFileSync("lib/examples.json", "utf8"));
    mkdirSync(dir + "/examples");
    for (const [name, source] of Object.entries(examples)) {
      assert.doesNotMatch(source, /@\/components\/ui|next\/|className=/, name);
      writeFileSync(`${dir}/examples/${name}.tsx`, source);
    }
    writeFileSync(
      dir + "/tsconfig.json",
      JSON.stringify({
        compilerOptions: {
          target: "ES2020",
          lib: ["dom", "dom.iterable", "esnext"],
          strict: true,
          skipLibCheck: true,
          noEmit: true,
          esModuleInterop: true,
          module: "esnext",
          moduleResolution: "bundler",
          jsx: "react-jsx",
        },
        include: ["examples/**/*.tsx"],
      }),
    );
    try {
      execFileSync(
        process.execPath,
        ["node_modules/typescript/bin/tsc", "-p", dir + "/tsconfig.json"],
        { encoding: "utf8", stdio: "pipe" },
      );
    } catch (e) {
      assert.fail(e.stdout || e.message);
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
