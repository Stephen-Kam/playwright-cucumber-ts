# Playwright + TypeScript + Cucumber (minimal starter)

## Setup
```
npm install
npx playwright install chromium
```

## Run
```
npm test
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
