import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
execFileSync(
  process.execPath,
  ["node_modules/typescript/bin/tsc", "-p", "packages/react/tsconfig.json"],
  { stdio: "inherit" },
);
copyFileSync("packages/react/src/styles.css", "packages/react/dist/styles.css");
copyFileSync("LICENSE", "packages/react/LICENSE");
mkdirSync("public/downloads", { recursive: true });
const result = JSON.parse(
  execFileSync(
    "npm",
    [
      "pack",
      "./packages/react",
      "--pack-destination",
      "public/downloads",
      "--json",
    ],
    { encoding: "utf8" },
  ),
);
writeFileSync(
  "lib/package-info.json",
  JSON.stringify(
    {
      name: "@chlohal/coal-ui",
      version: "0.5.0",
      download: "/downloads/" + result[0].filename,
    },
    null,
    2,
  ) + "\n",
);
console.log(`Package ready: ${result[0].filename}`);
