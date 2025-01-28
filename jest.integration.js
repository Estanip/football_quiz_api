// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('./jest.config');

process.env.TEST_TYPE = 'integration';

module.exports = {
  ...baseConfig,
  displayName: 'Integration Tests',
  roots: ['<rootDir>/src/modules'],
  testMatch: ['**/test/integration/**/*.spec.[jt]s?(x)'],
  collectCoverageFrom: ['**/src/modules/**/*.service.ts', '**/src/modules/**/*.controller.ts'],
  coverageDirectory: '<rootDir>/coverage/integration',
};
