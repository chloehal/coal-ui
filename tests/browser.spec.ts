import { test, expect } from "@playwright/test";
import { catalog } from "../lib/catalog";
test("catalog filters, empty state and reset", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator(".component-tile")).toHaveCount(catalog.length);
  await page.getByRole("button", { name: "Inputs", exact: true }).click();
  await expect(page.locator(".component-tile")).toHaveCount(
    catalog.filter((i) => i.category === "Inputs").length,
  );
  await page
    .getByRole("textbox", { name: "Search components", exact: true })
    .fill("nothing-matches");
  await expect(
    page.getByText("No components found.", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.locator(".component-tile")).toHaveCount(catalog.length);
  expect(errors).toEqual([]);
});
test("all component docs and the package download resolve", async ({
  request,
}) => {
  for (const item of catalog) {
    const response = await request.get("/docs/components/" + item.name);
    expect(response.status(), item.name).toBe(200);
  }
  expect(
    (await request.get("/downloads/chlohal-coal-ui-0.5.0.tgz")).status(),
  ).toBe(200);
  for (const route of ["/docs/installation", "/docs/theming", "/docs/coverage"])
    expect((await request.get(route)).status()).toBe(200);
  expect((await request.get("/docs/components/nonexistent")).status()).toBe(
    404,
  );
});
test("dialog focus, validation and dismissal", async ({ page }) => {
  await page.goto("/docs/components/dialog");
  const trigger = page.getByRole("button", { name: "Create a project" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog
    .getByRole("button", { name: "Create project", exact: true })
    .click();
  await expect(
    dialog.getByRole("textbox", { name: "Project name" }),
  ).toBeFocused();
  await dialog.getByRole("textbox", { name: "Project name" }).fill("Coal test");
  await dialog
    .getByRole("button", { name: "Create project", exact: true })
    .click();
  await expect(dialog.getByRole("status")).toContainText("Project created.");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
test("selection controls and keyboard interactions", async ({ page }) => {
  await page.goto("/docs/components/switch");
  const toggle = page.getByRole("switch", { name: "Quiet mode" });
  await expect(toggle).toBeChecked();
  await toggle.click();
  await expect(toggle).not.toBeChecked();
  await page.goto("/docs/components/checkbox");
  const box = page.getByRole("checkbox", { name: "A little less noise" });
  await box.check();
  await expect(box).toBeChecked();
  await page.goto("/docs/components/tabs");
  await page.getByRole("tab", { name: "Activity" }).click();
  await expect(page.getByRole("tabpanel", { name: "Activity" })).toContainText(
    "created today",
  );
  await page.goto("/docs/components/combobox");
  await page.getByRole("combobox").fill("Type");
  await expect(page.getByRole("option", { name: "TypeScript" })).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("combobox")).toHaveValue("TypeScript");
  await page.goto("/docs/components/select");
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Team", exact: true }).click();
  await expect(page.getByRole("combobox")).toContainText("Team");
});
test("date picker, menu, toast and pagination work", async ({ page }) => {
  await page.goto("/docs/components/date-picker");
  await page.getByRole("button", { name: /Project deadline/ }).click();
  await expect(page.getByRole("grid")).toBeVisible();
  await page.getByRole("button", { name: /Sunday, September 13/ }).click();
  await expect(
    page.getByRole("button", { name: /Project deadline/ }),
  ).toContainText("13 Sept 2026");
  await page.goto("/docs/components/dropdown-menu");
  await page.getByRole("button", { name: "Actions", exact: true }).click();
  await page.getByRole("menuitem", { name: "Duplicate" }).click();
  await expect(page.getByRole("status")).toContainText("Duplicate selected");
  await page.goto("/docs/components/toast");
  await page.getByRole("button", { name: "Show notification" }).click();
  await expect(page.getByText("Changes saved.", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Dismiss notification" }).click();
  await expect(
    page.getByText("Changes saved.", { exact: true }),
  ).not.toBeVisible();
  await page.goto("/docs/components/pagination");
  await page.getByRole("button", { name: "Next page" }).click();
  await expect(
    page.getByRole("button", { name: "Page 2", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});
test("mobile navigation, no overflow and persistent dark theme", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("textbox", { name: "Search navigation" }),
  ).toBeVisible();
  await page.getByRole("textbox", { name: "Search navigation" }).fill("dialog");
  await page.getByRole("link", { name: "Dialog", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Dialog." })).toBeVisible();
  await page.getByRole("button", { name: "Use dark theme" }).click();
  await expect(page.locator("html")).toHaveClass("dark");
  await page.reload();
  await expect(page.locator("html")).toHaveClass("dark");
  await page.getByRole("button", { name: "Create a project" }).click();
  expect(
    await page
      .getByRole("dialog")
      .evaluate((el) => el.getBoundingClientRect().width <= innerWidth),
  ).toBe(true);
});

test("packed library works in plain React with soft controls, date keyboard and nested overlays", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/package-smoke/index.html");
  await expect(page.getByRole("button", { name: "Soft button" })).toHaveCSS(
    "border-radius",
    "0px",
  );
  const leap = page.getByRole("button", { name: "Tuesday, February 29, 2028" });
  await leap.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("button", { name: "Wednesday, March 1, 2028" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("output")).toHaveText("01/03/2028");
  const trigger = page.getByRole("button", { name: "Open settings" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("combobox", { name: "Plan" }).click();
  await page.getByRole("option", { name: "Team" }).click();
  await expect(dialog.getByRole("combobox")).toContainText("Team");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(errors).toEqual([]);
});

test("native checkbox and switch reset with their form", async ({ page }) => {
  await page.goto("/package-smoke/index.html");
  const checkbox = page.getByRole("checkbox", { name: "Accept" }),
    toggle = page.getByRole("switch", { name: "Notifications" });
  await checkbox.uncheck();
  await toggle.uncheck();
  await expect(checkbox).not.toBeChecked();
  await expect(toggle).not.toBeChecked();
  await page.getByRole("button", { name: "Reset form" }).click();
  await expect(checkbox).toBeChecked();
  await expect(toggle).toBeChecked();
});
test("tooltip stays open while hovered and dismisses with Escape", async ({
  page,
}) => {
  await page.goto("/docs/components/tooltip");
  const trigger = page.getByRole("button", {
    name: "Notifications",
    exact: true,
  });
  await trigger.hover();
  const tooltip = page.getByRole("tooltip");
  await expect(tooltip).toBeVisible();
  await tooltip.hover();
  await page.waitForTimeout(250);
  await expect(tooltip).toBeVisible();
  await trigger.focus();
  await page.keyboard.press("Escape");
  await expect(tooltip).not.toBeVisible();
});

test("number field can be cleared and edited, with bounds enforced", async ({
  page,
}) => {
  await page.goto("/docs/components/number-field");
  const input = page.getByRole("spinbutton", { name: "Team members" });
  await input.fill("");
  await expect(input).toHaveValue("");
  await input.fill("8");
  await expect(input).toHaveValue("8");
  await page.getByRole("button", { name: "Add member" }).click();
  await expect(input).toHaveValue("9");
  await input.fill("99");
  await input.blur();
  await expect(input).toHaveValue("12");
  await expect(page.getByRole("button", { name: "Add member" })).toBeDisabled();
});

test("data table sorts, filters, paginates and selects visible rows", async ({
  page,
}) => {
  await page.goto("/docs/components/data-table");
  const table = page.getByRole("table");
  await page.getByRole("button", { name: "Members" }).click();
  await expect(table.locator("tbody tr").first()).toContainText("Studio");
  await page.getByRole("button", { name: "Members" }).click();
  await expect(table.locator("tbody tr").first()).toContainText("Atlas");
  await page.getByRole("checkbox", { name: "Select visible rows" }).check();
  await expect(page.getByRole("status")).toContainText("3 selected");
  await page.getByRole("button", { name: "Next page" }).click();
  await expect(table.locator("tbody tr")).toHaveCount(1);
  await page.getByRole("searchbox", { name: "Filter Projects" }).fill("Coal");
  await expect(table.locator("tbody tr")).toHaveCount(1);
  await expect(table).toContainText("Coal");
  await page.getByRole("searchbox").fill("missing");
  await expect(table).toContainText("No results.");
});
test("command searches keywords and skips disabled actions with keyboard", async ({
  page,
}) => {
  await page.goto("/docs/components/command");
  const input = page.getByRole("combobox", { name: "Search commands" });
  await input.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText("invite selected");
  await input.fill("new");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText("create selected");
  await input.fill("absent");
  await expect(
    page.getByText("No commands found.", { exact: true }),
  ).toBeVisible();
});
test("attachment validates file types and removes selected files", async ({
  page,
}) => {
  await page.goto("/docs/components/attachment");
  const input = page.locator("input[type=file]");
  await input.setInputFiles([
    { name: "brief.txt", mimeType: "text/plain", buffer: Buffer.from("Hello") },
    {
      name: "bad.exe",
      mimeType: "application/octet-stream",
      buffer: Buffer.from("bad"),
    },
  ]);
  await expect(page.getByRole("status")).toContainText("Rejected: bad.exe");
  await expect(
    page.getByRole("button", { name: "Remove brief.txt" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Remove brief.txt" }).click();
  await expect(
    page.getByRole("button", { name: "Remove brief.txt" }),
  ).toHaveCount(0);
});
test("new selection and progress components respond", async ({ page }) => {
  await page.goto("/docs/components/toggle-group");
  const bold = page.getByRole("button", { name: "Bold", exact: true });
  await expect(bold).toHaveAttribute("aria-pressed", "true");
  await bold.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("button", { name: "Italic", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Space");
  await expect(
    page.getByRole("button", { name: "Italic", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.goto("/docs/components/steps");
  await page.getByRole("button", { name: "Next step" }).click();
  await expect(page.locator('[aria-current="step"]')).toContainText("Team");
  await page.goto("/docs/components/chip");
  await page.getByRole("button", { name: "Remove Design tag" }).click();
  await expect(page.getByRole("button", { name: "Restore tag" })).toBeVisible();
  await page.goto("/docs/components/action-bar");
  await page.getByRole("button", { name: "Archive", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("3 items archived.");
});

test("copyable value copies and native picker fields accept values", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/docs/components/copyable-value");
  await page.getByRole("button", { name: "Copy project ID" }).click();
  await expect(page.getByRole("status")).toHaveText("Copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "coal-project-001",
  );
  await page.goto("/docs/components/time-picker");
  await page.getByLabel("Meeting time").fill("10:45");
  await expect(page.getByLabel("Meeting time")).toHaveValue("10:45");
  await page.goto("/docs/components/color-picker");
  await expect(page.getByLabel("Accent color")).toHaveAttribute("type", "text");
  await expect(page.getByLabel("Accent color")).toHaveValue("#756887");
  await page.goto("/docs/components/input-group");
  await page.getByRole("textbox", { name: "Website" }).fill("coal.studio");
  await expect(page.getByRole("textbox", { name: "Website" })).toHaveValue(
    "coal.studio",
  );
});

test("foundations load local fonts, semantic statuses and density defaults", async ({
  page,
}) => {
  await page.goto("/docs/foundations");
  await page.evaluate(() => document.fonts.ready);
  await expect(
    page.getByRole("heading", { name: "Typography", exact: true }),
  ).toBeVisible();
  const field = page.getByRole("textbox", {
    name: "Project name",
    exact: true,
  });
  await expect(field).toHaveCSS("height", "40px");
  await expect(field).toHaveCSS("font-family", /Manrope/);
  expect(
    await page.evaluate(() => document.fonts.check('400 14px "Manrope"')),
  ).toBe(true);
  await page.getByRole("button", { name: "Compact density" }).click();
  await expect(field).toHaveCSS("height", "32px");
  await page.getByRole("button", { name: "Use dark theme" }).click();
  await expect(field).toHaveCSS("background-color", "rgb(23, 23, 23)");
  await expect(page.locator(".coal-badge.coal-intent-warning")).toContainText(
    "Approaching",
  );
  await expect(page.locator(".coal-alert.coal-intent-danger")).toHaveAttribute(
    "role",
    "alert",
  );
  await page.getByRole("button", { name: "Show a persistent error" }).click();
  await expect(page.locator(".coal-toast")).toContainText(
    "Could not save changes",
  );
  await page.waitForTimeout(5200);
  await expect(page.locator(".coal-toast")).toBeVisible();
  await page.getByRole("button", { name: "Dismiss notification" }).click();
  const save = page.getByRole("button", { name: "Save", exact: true });
  await save.click();
  await expect(save).toHaveAttribute("aria-busy", "true");
  await expect(save).toBeDisabled();
  await expect(save).toBeEnabled({ timeout: 4000 });
});
test("overlay motion supports reduced motion and interrupted closure", async ({
  page,
}) => {
  await page.goto("/docs/foundations");
  const trigger = page.getByRole("button", { name: "Open dialog" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toHaveCSS("animation-duration", "0.38s");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await trigger.click();
  await expect(dialog).toHaveCSS("animation-name", "none");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const pop = page.getByRole("button", { name: "Open popover" });
  await pop.click();
  await expect(page.locator(".coal-floating")).toHaveCSS(
    "animation-duration",
    "0.3s",
  );
  await page.keyboard.press("Escape");
  await pop.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.waitForTimeout(200);
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("cool surfaces keep structural corners crisp and controls square", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(250, 250, 250)",
  );
  await expect(page.locator(".component-tile").first()).toHaveCSS(
    "border-radius",
    "0px",
  );
  await expect(page.locator(".coal-button").first()).toHaveCSS(
    "border-radius",
    "0px",
  );
  await page.getByRole("button", { name: "Use dark theme" }).click();
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(23, 23, 23)",
  );
});

test("block loader retains its accessible name and stops with reduced motion", async ({
  page,
}) => {
  await page.goto("/docs/components/spinner");
  const spinner = page.getByRole("status", { name: "Loading", exact: true });
  await expect(spinner).toBeVisible();
  const blocks = spinner.locator("svg rect");
  expect(await blocks.count()).toBeGreaterThan(12);
  await expect(blocks.first()).toHaveCSS(
    "animation-name",
    "coal-loading-block",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(blocks.first()).toHaveCSS("animation-name", "none");
  await page.goto("/docs/foundations");
  const save = page.getByRole("button", { name: "Save", exact: true });
  const width = (await save.boundingBox())!.width;
  await save.click();
  await expect(save).toBeDisabled();
  await expect(save).toHaveAccessibleName("Save");
  expect((await save.boundingBox())!.width).toBe(width);
  await expect(save.locator("svg rect").first()).toHaveCSS(
    "animation-name",
    "none",
  );
});

test("disclosures reverse smoothly and remove closed content from interaction", async ({
  page,
}) => {
  await page.goto("/docs/components/accordion");
  const trigger = page.getByRole("button", {
    name: "What makes coal different?",
  });
  const panel = page.getByRole("region", {
    name: "What makes coal different?",
  });
  await trigger.click();
  await expect(panel).toBeVisible();
  await trigger.press("Enter");
  await trigger.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(panel).toBeVisible();
  await trigger.click();
  await expect(page.locator(".coal-accordion-content").first()).toHaveAttribute(
    "inert",
    "",
  );
  await expect(panel).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await trigger.click();
  await expect(panel).toBeVisible();
  await expect(panel).toHaveCSS("transition-duration", "0s");
});

test("rapid filtering settles in the right layout and respects reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  const search = page.getByRole("textbox", {
    name: "Search components",
    exact: true,
  });
  await search.fill("button");
  await search.fill("dialog");
  await search.fill("");
  await expect(page.locator(".component-tile")).toHaveCount(catalog.length);
  await expect
    .poll(() =>
      page
        .locator(".component-grid")
        .evaluate(
          (node) =>
            node
              .getAnimations({ subtree: true })
              .filter(
                (a) =>
                  a.effect instanceof KeyframeEffect &&
                  (a.effect.target as Element)?.classList.contains(
                    "component-tile",
                  ) &&
                  a.playState === "running",
              ).length,
        ),
    )
    .toBe(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Inputs", exact: true }).click();
  await expect(page.locator(".component-tile")).toHaveCount(
    catalog.filter((c) => c.category === "Inputs").length,
  );
  expect(
    await page
      .locator(".component-grid")
      .evaluate(
        (node) =>
          node
            .getAnimations({ subtree: true })
            .filter((a) => a.playState === "running").length,
      ),
  ).toBe(0);
});

test("pixel click feedback is inert, cleans itself up and respects reduced motion", async ({
  page,
}) => {
  await page.goto("/docs/foundations");
  await expect(
    page.getByRole("button", { name: "Press and hold" }),
  ).toBeVisible();
  const burst = () =>
    page.evaluate(() => {
      document.body.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          detail: 1,
          clientX: 200,
          clientY: 200,
        }),
      );
      const node = document.querySelector<HTMLElement>(".coal-pixel-burst");
      return node
        ? {
            inert: node.inert,
            pointerEvents: getComputedStyle(node).pointerEvents,
            hidden: node.getAttribute("aria-hidden"),
          }
        : null;
    });
  expect(await burst()).toEqual({
    inert: true,
    pointerEvents: "none",
    hidden: "true",
  });
  await expect(page.locator(".coal-pixel-burst")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await burst()).toBeNull();
});

test("custom pickers edit real form values and support keyboard dismissal", async ({
  page,
}) => {
  await page.goto("/docs/components/color-picker");
  const hex = page.getByRole("textbox", { name: "Accent color" });
  await expect(hex).toHaveValue("#756887");
  const palette = page.getByRole("button", { name: "Open color palette" });
  await palette.click();
  await page.getByRole("button", { name: "Use #242424" }).click();
  await expect(hex).toHaveValue("#242424");
  await page.keyboard.press("Escape");
  await expect(palette).toBeFocused();
  await hex.fill("#447a85");
  await expect(palette).toHaveCSS("background-color", "rgb(68, 122, 133)");
  await page.goto("/docs/components/time-picker");
  const time = page.getByRole("textbox", { name: "Meeting time" });
  await page.getByRole("button", { name: "Open time picker" }).click();
  await page.getByRole("button", { name: "Hour 12", exact: true }).click();
  await page.getByRole("button", { name: "Minute 15", exact: true }).click();
  await expect(time).toHaveValue("12:15");
  await expect(
    page.getByRole("button", { name: "Open time picker" }),
  ).toBeFocused();
  await time.fill("20:00");
  await time.press("Tab");
  await expect(time).toHaveAttribute("aria-invalid", "true");
  await expect(
    page.getByRole("alert").filter({ hasText: "Enter a time" }),
  ).toContainText("18:00");
  await time.fill("10:45");
  await time.press("ArrowUp");
  await expect(time).toHaveValue("10:46");
  await page.goto("/docs/components/native-select");
  const format = page.getByRole("combobox", { name: "Choose a format" });
  await format.press("ArrowDown");
  await page.getByRole("option", { name: "PNG image" }).click();
  await expect(format).toContainText("PNG image");
  await expect(page.locator("select").first()).toHaveValue("png");
  await page.goto("/docs/components/attachment");
  await expect(page.locator("input[type=file]")).toBeHidden();
  const chooser = page.waitForEvent("filechooser");
  await page
    .getByRole("button", { name: "Project attachments Choose files" })
    .click();
  await (
    await chooser
  ).setFiles({
    name: "custom.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("Custom file control"),
  });
  await expect(
    page.getByRole("button", { name: "Remove custom.txt" }),
  ).toBeVisible();
});

test("neutral previews, square controls and contained dialog typography", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".tile-preview").first()).toHaveCSS(
    "background-color",
    "rgb(250, 250, 250)",
  );
  await expect(page.locator(".side-link.selected")).toHaveCSS(
    "box-shadow",
    "none",
  );
  await page.goto("/docs/foundations");
  await page.getByRole("button", { name: "Open dialog", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator("h2")).toHaveCSS("margin-top", "0px");
  await expect(dialog).toHaveCSS("border-radius", "0px");
  await expect(dialog.getByRole("textbox")).toHaveCSS("border-radius", "0px");
  const description = await dialog
    .locator(".coal-dialog-description")
    .boundingBox();
  const input = await dialog.getByRole("textbox").boundingBox();
  expect(
    input!.y - (description!.y + description!.height),
  ).toBeGreaterThanOrEqual(12);
});

test("custom picker form values and reset survive the installed package", async ({
  page,
}) => {
  await page.goto("/package-smoke/index.html");
  await page
    .getByRole("textbox", { name: "Meeting", exact: true })
    .fill("11:45");
  await page
    .getByRole("textbox", { name: "Accent", exact: true })
    .fill("#242424");
  await page.getByRole("combobox", { name: "Format", exact: true }).click();
  await page.getByRole("option", { name: "PNG", exact: true }).click();
  expect(
    await page
      .locator("form")
      .evaluate((form) =>
        Object.fromEntries(new FormData(form as HTMLFormElement)),
      ),
  ).toMatchObject({ meeting: "11:45", accent: "#242424", format: "png" });
  await page.getByRole("button", { name: "Reset form" }).click();
  await expect(
    page.getByRole("textbox", { name: "Meeting", exact: true }),
  ).toHaveValue("09:30");
  await expect(
    page.getByRole("textbox", { name: "Accent", exact: true }),
  ).toHaveValue("#756887");
  await expect(
    page.getByRole("combobox", { name: "Format", exact: true }),
  ).toContainText("SVG");
});
