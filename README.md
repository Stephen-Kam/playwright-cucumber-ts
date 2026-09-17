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
- `features/step_definitions/` — step implementations
- `features/support/world.ts` — Cucumber World, holds Playwright browser/context/page
- `features/support/hooks.ts` — Before/After hooks (browser lifecycle)
- `cucumber.js` — Cucumber config (loads ts-node, points at features)

## Adding a test
1. Add a scenario to a `.feature` file (or create a new one under `features/`).
2. Implement any new steps in `features/step_definitions/`.
3. Run `npm test`.
