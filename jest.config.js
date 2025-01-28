process.env.NODE_ENV = 'test';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/src/test/$1',
  },
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'lcov'],
  testTimeout: 60000,
  maxWorkers: 1,
};
