# Playwright + TypeScript + Cucumber (minimal starter)

## Setup
```
npm install
npx playwright install chromium
```

## Run
```
npm test                 # functional scenarios only, report at reports/functional/report.html
npm run test:accessibility  # accessibility scans only, report at reports/accessibility/report.html
npm run test:all          # both, one after the other
```

## Structure
- `features/*.feature` — Gherkin scenarios
- `features/step_definitions/` — step implementations (call page objects, not raw Playwright)
- `features/pages/` — page objects: `BasePage` (shared actions) + one class per page
- `features/support/world.ts` — Cucumber World, holds Playwright browser/context/page and page object instances
- `features/support/hooks.ts` — Before/After hooks (browser lifecycle, instantiates page objects)
- `cucumber.js` — Cucumber config (loads ts-node, points at features)

## Page object model
Each page gets its own class under `features/pages/` extending `BasePage`. Locators and page-specific actions live on that class — step definitions call methods like `examplePage.open(url)`, never `this.page.goto(...)` directly.

To add a new page:
1. Create `features/pages/YourPage.ts` extending `BasePage`, with locators/methods for that page.
2. Add an instance property for it on `CustomWorld` in `features/support/world.ts`.
3. Instantiate it in the `Before` hook in `features/support/hooks.ts`.
4. Reference it from your step definitions.

## Adding a test
1. Add a scenario to a `.feature` file (or create a new one under `features/`).
2. Implement any new steps in `features/step_definitions/`, calling page object methods.
3. Run `npm test`.

## Accessibility scanning
`BasePage.runAccessibilityScan()` wraps [`@axe-core/playwright`](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) and is available on every page object. It's scoped to `ACCESSIBILITY_TAGS` (`wcag2a`, `wcag2aa`, `wcag21aa`) hardcoded at the top of `features/pages/BasePage.ts` — the same standard applies to every accessibility scenario, so there's nothing to specify per-step. Change that one constant to adjust the standard project-wide.

See `features/accessibility.feature` and `features/step_definitions/accessibility.steps.ts` for the pattern: navigate to a URL, then assert `the page should have no accessibility violations`. Violations (if any) are attached to the step in the HTML report and logged to the console, listing each rule's impact, ID, help URL, and the specific affected elements.

For finer scoping on a specific scenario (a section of the page, or specific rules to skip), chain further onto the `AxeBuilder` call in `BasePage.runAccessibilityScan()` — `.include()`, `.exclude()`, `.disableRules()` are all available.

## Reporting
Cucumber's built-in HTML formatter generates a self-contained report per run, written to `reports/` (gitignored — each run overwrites the previous report, nothing to clean up).

Two profiles are defined in `cucumber.js`:
- `functional` — runs everything except scenarios tagged `@accessibility` → `reports/functional/report.html`
- `accessibility` — runs only scenarios tagged `@accessibility` → `reports/accessibility/report.html`

Tag any new accessibility scenario with `@accessibility` (see `features/accessibility.feature`) so it's picked up by the right profile and excluded from the other. Untagged scenarios are treated as functional by default.
