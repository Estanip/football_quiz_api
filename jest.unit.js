// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('./jest.config');

process.env.TEST_TYPE = 'unit';

module.exports = {
  ...baseConfig,
  displayName: 'Unit Tests',
  roots: ['<rootDir>/src/modules'],
  testMatch: ['**/test/unit/**/*.spec.[jt]s?(x)'],
  collectCoverageFrom: ['**/src/modules/**/*.service.ts', '**/src/modules/**/*.controller.ts'],
  coverageDirectory: '<rootDir>/coverage/unit',
};
