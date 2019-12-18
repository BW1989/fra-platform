import path from 'path'
import webpack from 'webpack'
import uuidv4 from 'uuid/v4'

import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const buildReport = process.env.BUILD_REPORT === 'true'

const lastCommit = process.env.SOURCE_VERSION || 'N/A'
const platformVersion = lastCommit + '_' + new Date().toISOString()

const config = {
  mode: process.env.NODE_ENV || 'development',
  path: path.resolve(__dirname, 'dist')
}

const plugins = [
  new MiniCssExtractPlugin({ filename: 'style/styles-[hash].css' }),
  new HtmlWebpackPlugin({ template: './web-resources/index.html' }),
  new webpack.DefinePlugin({
    __PLATFORM_VERSION__: `"${platformVersion}"`,
    __BUST__: `"${uuidv4()}"`,
    __GOOGLE_API__: JSON.stringify(process.env.FRA_GOOGLE_API)
  })
]

if (buildReport) {
  plugins.push(new BundleAnalyzerPlugin())
}

const appConfig = {
  mode: config.mode,
  devtool: 'source-map',
  entry: ['./webapp/main.js'],
  output: {
    filename: 'js/bundle-[hash].js',
    path: config.path,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'less-loader',
        ]
      },
    ]
  },
  plugins
}

webpack.optimization = {
  minimizer: [
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        compress: true,
        output: { comments: false },
      },
      sourceMap: true
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
}

export default appConfig
