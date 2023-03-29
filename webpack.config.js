const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: {
            import: './src/popup/index.tsx',
            filename: 'bundle.js',
        },
        autofill: {
            import: './src/context_scripts/autofill.ts',
            filename: 'context_scripts/autofill.js'
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        aliasFields: ['browser'],
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins : [
        new HtmlWebpackPlugin ({
            template: './src/popup/index.html',
            filename: 'index.html'
        })
    ],
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
};