import path from 'path';

export default {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.ttf?$/,
      loaders: ['file-loader']
    }, {
      test: /\.ttf?$/,
      loaders: ['file-loader']
    }, {
      test: /\.woff?$/,
      loaders: ['file-loader']
    }, {
      test: /\.woff2?$/,
      loaders: ['file-loader']
    }, {
      test: /\.eot?$/,
      loaders: ['file-loader']
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [

  ],
  externals: [
    'node-icu-charset-detector',
    'iconv'
  ]
};
