/**
 * Jest configuration for TypeScript and ECMAScript Modules (ESM) support.
 */
export default {
  // Enable verbose output for detailed test results
  verbose: true,

  // Use Node.js as the test environment
  testEnvironment: 'node',

  // Configure TypeScript transformation using ts-jest
  transform: {
    // Transform .ts and .tsx files
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // Enable ESM support in ts-jest
        useESM: true,
      },
    ],
  },

  // Treat these extensions as ESM modules
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  // Map .js extensions in imports to TypeScript files
  // This allows importing .ts files with .js extension
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
