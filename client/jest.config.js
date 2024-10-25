// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
  });
  
  const customJestConfig = {
    testEnvironment: "jest-environment-jsdom", // Set the environment to jsdom for browser-like testing
    transform: {
      "^.+\\.tsx?$": "ts-jest", // Handle TypeScript files using ts-jest
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    transformIgnorePatterns: ["/node_modules/"],
  };
  
  module.exports = createJestConfig(customJestConfig);