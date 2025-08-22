const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node", // runs in Node.js
  transform: {
    ...tsJestTransformCfg, // TypeScript support
  },
  testMatch: ["**/tests/**/*.test.ts"], // run all .test.ts files in tests folder
  moduleFileExtensions: ["ts", "js", "json", "node"],
  clearMocks: true, // clears mocks between tests
  collectCoverage: true, // enable coverage reports
  coverageDirectory: "coverage", // output folder
  coverageReporters: ["text", "lcov"], // standard reporters
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // optional: add setup files here
};
