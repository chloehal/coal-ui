import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { catalog } from "../lib/catalog";

for (const theme of ["light", "dark"]) {
  test(`WCAG A/AA: all pages and expanded widgets in ${theme}`, async ({
    page,
  }, info) => {
    await page.addInitScript(
      (theme) => localStorage.setItem("coal-theme", theme),
      theme,
    );
    const findings: unknown[] = [];
    const manualChecks: unknown[] = [];
    const inspect = async (state: string, contentOnly = false) => {
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          document
            .getAnimations()
            .filter(
              (animation) =>
                animation.effect?.getTiming().iterations !== Infinity,
            )
            .map((animation) => animation.finished.catch(() => {})),
        );
      });
      const builder = new AxeBuilder({ page }).withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
        "wcag22aa",
        "best-practice",
      ]);
      if (contentOnly) builder.include("main");
      const result = await builder.analyze();
      console.log(
        `${theme}: ${state} (${result.violations.length} violations, ${result.incomplete.length} manual checks)`,
      );
      if (result.incomplete.length)
        manualChecks.push({
          state,
          checks: result.incomplete.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              summary: n.failureSummary,
            })),
          })),
        });
      if (result.violations.length) {
        const issues = result.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          help: v.help,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        }));
        findings.push({ state, issues });
        console.log(JSON.stringify({ theme, state, issues }));
      }
    };
    const routes = [
      "/",
      "/docs/foundations",
      "/docs/installation",
      "/docs/theming",
      "/docs/coverage",
      ...catalog.map((c) => "/docs/components/" + c.name),
    ];
    for (const route of process.env.A11Y_SCOPE === "expanded" ? [] : routes) {
      await page.goto(route);
      await inspect(route, route !== "/");
    }
    for (const [slug, role, name] of process.env.A11Y_SCOPE === "pages"
      ? []
      : ([
          ["dialog", "button", "Create a project"],
          ["alert-dialog", "button", "Archive project"],
          ["sheet", "button", "Workspace settings"],
          ["popover", "button", "What's new"],
          ["dropdown-menu", "button", "Actions"],
          ["select", "combobox", "Your workspace"],
          ["combobox", "combobox", "Find a tool"],
          ["tooltip", "button", "Notifications"],
          ["color-picker", "button", "Open color palette"],
          ["time-picker", "button", "Open time picker"],
          ["native-select", "combobox", "Choose a format"],
          ["accordion", "button", "What makes coal different?"],
        ] as const)) {
      await page.goto("/docs/components/" + slug);
      const trigger = page.getByRole(role, { name, exact: true });
      if (slug === "tooltip") await trigger.focus();
      else await trigger.click();
      await inspect(slug + " expanded");
    }
    await info.attach(`axe-${theme}`, {
      body: JSON.stringify({ violations: findings, manualChecks }, null, 2),
      contentType: "application/json",
    });
    expect(findings).toEqual([]);
  });
}

test("keyboard focus, mobile dismissal, modal trap and hover dismissal", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const search = page.getByRole("textbox", {
    name: "Search navigation",
    exact: true,
  });
  await search.focus();
  await expect(page.locator(".search-box")).toHaveCSS("outline-style", "solid");
  await expect(page.locator(".search-box")).toHaveCSS("outline-width", "2px");
  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  await expect(search).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/docs/components/dialog");
  const trigger = page.getByRole("button", { name: "Create a project" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Close", exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("textbox", { name: "Project name" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.goto("/docs/components/tooltip");
  await page.getByRole("button", { name: "Notifications" }).hover();
  await expect(page.getByRole("tooltip")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("tooltip")).not.toBeVisible();
  await page.goto("/docs/components/hover-card");
  await page.getByRole("link", { name: "Made by Chlohal" }).focus();
  await expect(page.locator(".coal-floating")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".coal-floating")).not.toBeVisible();
});

test("text reflows at 320 CSS pixels and control states survive forced colors", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  for (const route of ["/", "/docs/foundations", "/docs/components/dialog"]) {
    await page.goto(route);
    const layout = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      overflowing: [...document.querySelectorAll("body *")]
        .filter((el) => el.getBoundingClientRect().right > innerWidth + 1)
        .slice(0, 15)
        .map((el) => ({
          tag: el.tagName,
          class: el.className,
          width: el.getBoundingClientRect().width,
          right: el.getBoundingClientRect().right,
        })),
    }));
    expect(
      layout.scrollWidth,
      JSON.stringify({ route, ...layout }),
    ).toBeLessThanOrEqual(layout.width);
  }
  await page.emulateMedia({ forcedColors: "active" });
  await page.goto("/docs/components/checkbox");
  const checkbox = page.getByRole("checkbox", { name: "A little less noise" });
  await checkbox.focus();
  await page.keyboard.press("Space");
  await expect(checkbox).toBeChecked();
  await expect(checkbox.locator("..")).toHaveCSS("outline-style", "solid");
  await expect(checkbox.locator("..")).toHaveCSS("forced-color-adjust", "none");
  await page.goto("/docs/foundations");
  await expect(page.locator("article")).toHaveAttribute("lang", "en");
});
