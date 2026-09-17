import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import type { Result } from 'axe-core';
import { CustomWorld } from '../support/world';

async function assertNoViolations(world: CustomWorld, violations: Result[]): Promise<void> {
  if (violations.length > 0) {
    const summary = violations
      .map((v) => {
        const targets = v.nodes
          .map((n) => `    - ${n.target.join(' ')}${n.failureSummary ? `\n      ${n.failureSummary.replace(/\n/g, '\n      ')}` : ''}`)
          .join('\n');
        return `[${v.impact}] ${v.id}: ${v.help}\n  ${v.helpUrl}\n  Affected elements (${v.nodes.length}):\n${targets}`;
      })
      .join('\n\n');

    // Shows up as an attachment on this step in the Cucumber HTML report.
    await world.attach(`Accessibility violations (${violations.length}):\n\n${summary}`, 'text/plain');
    console.log(`Accessibility violations found:\n${summary}`);
  } else {
    await world.attach('No accessibility violations found.', 'text/plain');
  }

  expect(violations).toEqual([]);
}

Then('the page should have no accessibility violations', async function (this: CustomWorld) {
  const results = await this.examplePage.runAccessibilityScan();
  await assertNoViolations(this, results.violations);
});
