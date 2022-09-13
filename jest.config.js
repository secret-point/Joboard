module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/index.{js,jsx,ts,tsx}',
    '!src/i18n.ts',
    '!src/@types.{js,jsx,ts,tsx}',
    '!src/metrics.ts',
    '!src/**/*.d.ts',
    '!src/actions/**/*.ts',
    '!src/actions/old/**.{ts,tsx,js,jsx}',
    '!src/helpers/old/*.{ts,tsx,js,jsx}',
    '!src/reducers/old/**.{ts,tsx,js,jsx}',
    '!src/utils/api/**.{ts,tsx,js,jsx}',
    '!src/utils/enums/**/*.ts',
    '!src/utils/types/**/*.ts',
    '!src/utils/apiTypes.ts',
    '!src/utils/colors.ts',
    '!src/i18n/translations/arbManifest.js'
  ],
  coverageReporters: [
    'text',
    'html',
    'cobertura',
    'json-summary',
  ],
  coverageThreshold: {
    global: {
      lines: 7,
      statements: 7,
      functions: 4,
      branches: 1
    }
  },
  globals: {
    SERVER_MODE: 'test'
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: ['**/tests/unit-tests/**/*.{js,jsx,ts,tsx}'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '\\.(s?css|jpe?g|png|gif|eot|otf|webp|svg|ttf|woff2?|mp[34]|webm|wav|m4a|aac|oga)$': 'jest-transform-stub'
  },
  transformIgnorePatterns: [
    // Enable babel transforms for these specific packages. They ship code as es
    // modules only, and must be transpiled in order to run on Node.
    'node_modules/(?!(@amzn/katal-components|@amzn/katal-react|@babel/runtime/helpers/esm|lit-element|lit-html)/)',
  ],
  testEnvironmentOptions: {
    url: "http://test.com/"
  },
  snapshotSerializers: ["enzyme-to-json/serializer"]
};
