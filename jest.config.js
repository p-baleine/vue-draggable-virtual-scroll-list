module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    'vue$': 'vue/dist/vue.common.dev.js'
  },
  setupFiles: ['./tests/setup.js'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  }
}
