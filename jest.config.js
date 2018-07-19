module.exports = {
  'roots': [
    '<rootDir>/src'
  ],
  'transform': {
    '.*\.tsx?$': 'ts-jest',
    "^.+\\.jsx?$": "babel-jest",
  },
  'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  moduleNameMapper: {
    '\.(css|jpg|png)$': '<rootDir>src/test/empty-module.js',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/index.tsx',
  ],
  'setupTestFrameworkScriptFile': "<rootDir>src/test/setupEnzyme.ts"
}
