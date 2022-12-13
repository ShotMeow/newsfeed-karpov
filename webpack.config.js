const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlInlineScriptWebpackPlugin = require('html-inline-script-webpack-plugin');

const mode = process.env.NODE_ENV ? 'development' : 'production';

module.exports = {
  entry: {
    main: './src/index.tsx',
    initColorScheme: './src/features/colorScheme/initColorScheme.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  mode,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(svg|jpg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@components': path.resolve('./src/components'),
      '@features': path.resolve('./src/features'),
      '@app': path.resolve('./src/app'),
      '@images': path.resolve('./src/images'),
    },
  },
  optimization: {
    runtimeChunk: mode === 'production' ? false : 'single',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
    }),
    new HtmlInlineScriptWebpackPlugin([/initColorScheme\..+\.js$/]),
    new MiniCssExtractPlugin({
      filename: 'bundle.[contenthash].css',
    }),
    new StylelintPlugin({
      files: 'src/{**/*,*}.css',
    }),
    new ESLintPlugin({
      files: 'src/{**/*,*}.{tsx,ts}',
    }),
  ],
  devServer: {
    client: {
      overlay: false,
    },
    open: true,
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};
