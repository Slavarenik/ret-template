const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './frontend/src/',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../assets/'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.png', '.svg', '.jpg', '.jpeg'],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './frontend/src/index.html' }),
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    new CompressionPlugin(),
  ],
  devtool: 'inline-source-map',
  module: {
    rules: [
      // images
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              // Path where images will be after transpile
              outputPath: 'images',
            }
          },
        ],
      },
      // javascript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // typescript
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      // sass modules
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      // css modules
      {
        test: /\.module\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      // sass
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module\.s(a|c)ss$/,
        use: [ MiniCssExtractPlugin.loader, 'sass-loader' ],
      },
      // css
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
}