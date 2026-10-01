import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
test("Coal ships without dependencies on another component library", () => {
  const pkg = JSON.parse(readFileSync("packages/react/package.json", "utf8"));
  assert.equal(Object.keys(pkg.dependencies ?? {}).length, 0);
  for (const file of readdirSync("packages/react/src").filter((x) =>
    /\.tsx?$/.test(x),
  )) {
    const text = readFileSync("packages/react/src/" + file, "utf8");
    for (const match of text.matchAll(/from\s+["']([^"']+)/g))
      assert.ok(
        match[1].startsWith(".") ||
          ["react", "react-dom", "react/jsx-runtime"].includes(match[1]),
        `${file}: ${match[1]}`,
      );
  }
});
test("package ships Javascript, declarations and ready-to-use styles", () => {
  const pkg = JSON.parse(readFileSync("packages/react/package.json", "utf8"));
  for (const file of ["dist/index.js", "dist/index.d.ts", "dist/styles.css"])
    assert.ok(readFileSync("packages/react/" + file, "utf8").length > 0);
  assert.equal(pkg.exports["./styles.css"], "./dist/styles.css");
});

test("semantic text and solid pairs pass 4.5:1 in both themes", () => {
  const css = readFileSync("packages/react/src/styles.css", "utf8");
  const luminance = (hex) => {
    const rgb = hex
      .match(/[a-f0-9]{2}/gi)
      .map((x) => parseInt(x, 16) / 255)
      .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };
  const colors = (intent, part) =>
    [
      ...css.matchAll(
        new RegExp(
          "--coal-" + intent + "-" + part + ":\\s*(#[a-fA-F0-9]{6})",
          "g",
        ),
      ),
    ].map((m) => m[1]);
  for (const intent of ["neutral", "info", "success", "warning", "danger"])
    for (const [a, b] of [
      ["text", "bg"],
      ["on-solid", "solid"],
    ]) {
      const x = colors(intent, a),
        y = colors(intent, b);
      assert.equal(x.length, 2);
      assert.equal(y.length, 2);
      x.forEach((c, i) => {
        const l = luminance(c),
          r = luminance(y[i]);
        assert.ok(
          (Math.max(l, r) + 0.05) / (Math.min(l, r) + 0.05) >= 4.5,
          intent + " " + a + " theme " + i,
        );
      });
    }
});
test("optional fonts ship with licenses and local URLs", () => {
  const css = readFileSync("packages/react/fonts.css", "utf8");
  assert.doesNotMatch(css, /https?:/);
  for (const match of css.matchAll(/url\("\.\/([^\"]+)"\)/g))
    assert.ok(readFileSync("packages/react/" + match[1]).length > 1000);
  for (const name of ["manrope", "dm-mono"])
    assert.match(
      readFileSync(`packages/react/fonts/${name}-LICENSE.txt`, "utf8"),
      /OPEN FONT LICENSE/i,
    );
});

test("essential control boundaries and secondary text meet contrast in both themes", () => {
  const css = readFileSync("packages/react/src/styles.css", "utf8");
  const colors = (token) =>
    [
      ...css.matchAll(new RegExp(`--coal-${token}:\\s*(#[a-fA-F0-9]{6})`, "g")),
    ].map((m) => m[1]);
  const lum = (hex) => {
    const rgb = hex
      .slice(1)
      .match(/../g)
      .map((c) => parseInt(c, 16) / 255)
      .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  for (const [token, minimum] of [
    ["muted", 4.5],
    ["control-border", 3],
    ["focus", 3],
  ]) {
    for (const surface of ["bg", "surface"]) {
      const foregrounds = colors(token),
        backgrounds = colors(surface);
      assert.equal(foregrounds.length, 2);
      assert.equal(backgrounds.length, 2);
      foregrounds.forEach((color, i) => {
        const a = lum(color),
          b = lum(backgrounds[i]);
        const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        assert.ok(
          ratio >= minimum,
          `${token}/${surface}, theme ${i}: ${ratio.toFixed(2)} < ${minimum}`,
        );
      });
    }
  }
});

test("custom required selects expose the requirement on their visible control", async () => {
  const { createElement: h } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { Select, SelectTrigger, SelectValue } = await import(
    "../packages/react/dist/index.js"
  );
  const html = renderToStaticMarkup(
    h(
      Select,
      { required: true },
      h(SelectTrigger, { "aria-label": "Plan" }, h(SelectValue)),
    ),
  );
  assert.match(html, /<button[^>]*aria-required="true"/);
});
