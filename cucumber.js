const common = {
  requireModule: ['ts-node/register'],
  require: ['features/support/**/*.ts', 'features/step_definitions/**/*.ts'],
  paths: ['features/**/*.feature'],
  publishQuiet: true
};

module.exports = {
  // Runs everything with no HTML report, e.g. `npx cucumber-js`
  default: {
    ...common,
    format: ['progress-bar']
  },
  // Normal functional scenarios, excluding accessibility scans
  functional: {
    ...common,
    tags: 'not @accessibility',
    format: ['progress-bar', 'html:reports/functional/report.html']
  },
  // Accessibility scans only
  accessibility: {
    ...common,
    tags: '@accessibility',
    format: ['progress-bar', 'html:reports/accessibility/report.html']
  }
};
