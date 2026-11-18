import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const path = "src/lib/theme.ts";
const source = existsSync(path)
  ? ts.transpileModule(readFileSync(path, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.ES2022,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText
  : "";
const theme = source
  ? await import(
      `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
    )
  : {};
function environment(value, blocked = false) {
  const classes = new Set();
  const values = new Map([["portfolio-theme", value]]);
  const meta = {
    content: "#f8fafc",
    setAttribute(name, value) {
      this[name] = value;
    },
  };
  const root = {
    classList: {
      toggle(name, on) {
        on ? classes.add(name) : classes.delete(name);
      },
    },
    style: {},
  };
  const storage = {
    getItem(key) {
      if (blocked) throw Error("blocked");
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      if (blocked) throw Error("blocked");
      values.set(key, value);
    },
  };
  const document = {
    documentElement: root,
    querySelector() {
      return meta;
    },
  };
  return { classes, values, meta, root, storage, document };
}
test("theme defaults to light and only accepts known saved choices", () => {
  assert.equal(theme.readTheme(environment(null).storage), "light");
  assert.equal(theme.readTheme(environment("dark").storage), "dark");
  assert.equal(theme.readTheme(environment("other").storage), "light");
  assert.equal(theme.readTheme(environment("dark", true).storage), "light");
});
test("applying a theme updates page class, native controls, address-bar color and saved preference", () => {
  const env = environment(null);
  theme.applyTheme("dark", env.document, env.storage);
  assert.ok(env.classes.has("dark"));
  assert.equal(env.root.style.colorScheme, "dark");
  assert.equal(env.meta.content, "#111317");
  assert.equal(env.values.get("portfolio-theme"), "dark");
  theme.applyTheme("light", env.document, env.storage);
  assert.ok(!env.classes.has("dark"));
  assert.equal(env.root.style.colorScheme, "light");
  assert.equal(env.meta.content, "#f8fafc");
});
test("blocked persistence still changes the current page theme", () => {
  const env = environment(null, true);
  assert.doesNotThrow(() =>
    theme.applyTheme("dark", env.document, env.storage),
  );
  assert.ok(env.classes.has("dark"));
});
test("pre-paint initialization restores dark mode and survives unavailable browser storage", () => {
  assert.equal(typeof theme.themeInitScript, "string");
  for (const blocked of [false, true]) {
    const env = environment("dark", blocked);
    const window = {
      get localStorage() {
        if (blocked) throw Error("unavailable");
        return env.storage;
      },
    };
    assert.doesNotThrow(() =>
      vm.runInNewContext(theme.themeInitScript, {
        document: env.document,
        window,
      }),
    );
    assert.equal(env.classes.has("dark"), !blocked);
    assert.equal(env.root.style.colorScheme, blocked ? "light" : "dark");
  }
});
