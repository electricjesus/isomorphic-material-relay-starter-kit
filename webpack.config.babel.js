import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

var version = require('./package.json').version;

let config = {
  entry: {
    app: path.resolve('webapp/app.js')
  },
  output: {
    path: path.resolve(`public/assets/${version}`),
    filename: '[name].js',
    publicPath: `http://localhost:8080/${version}/`
  },
  module: {
    loaders: [
      {test: /\.js(x)?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
      {test: /\.json$/, loaders: ['json']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
    new ExtractTextPlugin('[name].css'),
  ]
};

export default config;
