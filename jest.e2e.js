// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('./jest.config');

process.env.TEST_TYPE = 'e2e';

module.exports = {
  ...baseConfig,
  displayName: 'E2E Tests',
  roots: ['<rootDir>/src/modules'],
  testMatch: ['**/test/e2e/**/*.spec.[jt]s?(x)'],
  collectCoverageFrom: ['**/src/modules/**/*.service.ts', '**/src/modules/**/*.controller.ts'],
  coverageDirectory: '<rootDir>/coverage/e2e',
};
