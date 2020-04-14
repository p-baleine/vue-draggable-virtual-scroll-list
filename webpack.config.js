const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: process.env.NODE_ENV || 'production',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: ['DraggableVirtualList'],
    libraryExport: 'default',
    libraryTarget: 'var',
  },
  externals: {
    vue: 'Vue',
  }
};
