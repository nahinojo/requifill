/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devServer: {
    compress: true,
    port: 9000,
    static: {
      directory: path.join(
        __dirname, 'dist'
      )
    }
  },
  entry: {
    autofill: {
      filename: 'content_scripts/autofill.js',
      import: './src/content_scripts/autofill.ts'
    },
    enchance: {
      filename: 'content_scripts/enhance.js',
      import: './src/content_scripts/enhance.ts'
    },
    main: {
      filename: 'bundle.js',
      import: './src/app/index.tsx'
    }
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        test: /\.svg/,
        use: 'asset/resource'
      }
    ]
  },
  output: {
    path: path.resolve(
      __dirname, 'dist'
    )
  },
  performance: {
    maxAssetSize: 512000,
    maxEntrypointSize: 512000
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/app/index.html'
    })
  ],
  resolve: {
    aliasFields: ['browser'],
    extensions: ['.tsx', '.ts', '.js']
  }
}
