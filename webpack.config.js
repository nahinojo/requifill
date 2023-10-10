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
    addNumericScroller: {
      filename: 'content_scripts/addNumericScroller.js',
      import: './src/content_scripts/addNumericScroller.ts'
    },
    attachAutofillList: {
      filename: 'content_scripts/attachAutofillList.js',
      import: './src/content_scripts/attachAutofillList.tsx'
    },
    autofillFirstValue: {
      filename: 'content_scripts/autofillFirstValue.js',
      import: './src/content_scripts/autofillFirstValue.ts'
    },
    initiateSyncStorage: {
      filename: 'background_scripts/initiateSyncStorage.js',
      import: './src/background_scripts/initiateSyncStorage.ts'
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
