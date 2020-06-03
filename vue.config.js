const path = require('path')
module.exports = {
  chainWebpack: config => {
    config
      .plugin('fork-ts-checker')
      .tap(args => {
        args[0].tsconfig = './example/tsconfig.json';
        return args;
      });
    config.resolve.alias.set('~', path.join(__dirname, 'src/'));
  },
};
