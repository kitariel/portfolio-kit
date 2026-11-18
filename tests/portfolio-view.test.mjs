import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import ts from "typescript";

async function loadSource(path) {
  if (!existsSync(path)) return {};
  const source = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  return import(
    `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
  );
}
const { filterProjects, getYearsExperience } = await loadSource(
  "src/lib/portfolio-view.ts",
);
const { projects } = await loadSource("src/lib/portfolio-data.ts");

test("project filters use actual status and contribution without treating a missing link as live", () => {
  assert.equal(filterProjects(projects, "all", "").length, 13);
  assert.equal(filterProjects(projects, "live", "").length, 6);
  assert.equal(filterProjects(projects, "independent", "").length, 8);
  assert.equal(filterProjects(projects, "team", "").length, 5);
  assert.ok(
    !filterProjects(projects, "live", "").some((project) =>
      ["finllet", "bmad"].includes(project.slug),
    ),
  );
  assert.equal(
    filterProjects(
      [{ ...projects[0], href: undefined, status: "Independent product" }],
      "live",
      "",
    ).length,
    0,
  );
});
test("search matches names and technologies, combines with filters, and handles empty results", () => {
  assert.equal(
    filterProjects(projects, "all", "  ALIPLACE ")[0].slug,
    "aliplace",
  );
  assert.ok(
    filterProjects(projects, "all", "Mapbox").some(
      (p) => p.slug === "aliplace",
    ),
  );
  assert.equal(filterProjects(projects, "team", "aliplace").length, 0);
  assert.equal(filterProjects(projects, "all", "no-such-project").length, 0);
});
test("career years use the earliest record and completed anniversaries", () => {
  const records = [{ startedAt: "2022-04-01" }, { startedAt: "2019-09-01" }];
  assert.equal(
    getYearsExperience(records, new Date("2026-11-18T00:00:00Z")),
    7,
  );
  assert.equal(
    getYearsExperience(records, new Date("2026-08-31T00:00:00Z")),
    6,
  );
  assert.equal(getYearsExperience([], new Date("2026-11-18T00:00:00Z")), 0);
  assert.equal(
    getYearsExperience(records, new Date("2018-01-01T00:00:00Z")),
    0,
  );
});

test("navigation identifies the final section at page bottom even when it cannot reach the header", async () => {
  const { getActiveSection } = await loadSource("src/lib/portfolio-view.ts");
  const sections = [
    { href: "#overview", top: -2600 },
    { href: "#about", top: -500 },
    { href: "#contact", top: 300 },
  ];
  assert.equal(getActiveSection(sections, "#about", true), "#contact");
  assert.equal(getActiveSection(sections, "#about", false), "#about");
});
test("navigation keeps the selected panel when adjacent panels share a grid row", async () => {
  const { getActiveSection } = await loadSource("src/lib/portfolio-view.ts");
  const sections = [
    { href: "#overview", top: -500 },
    { href: "#process", top: 100 },
    { href: "#stack", top: 100 },
  ];
  assert.equal(getActiveSection(sections, "#stack", false), "#stack");
  assert.equal(getActiveSection(sections, "#overview", false), "#process");
});
