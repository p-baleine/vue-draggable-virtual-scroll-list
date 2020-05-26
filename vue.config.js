module.exports = {
  chainWebpack: config => {
    config
      .plugin('fork-ts-checker')
      .tap(args => {
        args[0].tsconfig = './tsconfig.test.json';
        return args;
      });
  }
};
