module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}, modules: false}],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
  ],
};
