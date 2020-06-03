module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    "ts",
    "tsx",
    'json',
    // tell Jest to handle *.vue files
    'vue'
  ],

  transform: {
    // process *.vue files with vue-jest
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  "moduleNameMapper": {
    "^~/(.+)": "<rootDir>/src/$1"
  },
  testEnvironment: 'jest-environment-jsdom',
  // serializer for snapshots
  snapshotSerializers: [
    'jest-serializer-vue'
  ],

  // https://github.com/facebook/jest/issues/6766
  testURL: 'http://localhost:8080/',
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsConfig: './tests/tsconfig.json'
    }
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
}
