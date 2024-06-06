const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    return {
        context: path.resolve(__dirname),
        mode: argv.mode || 'production', // Default to 'production' if mode is not provided
        entry: './src/index.ts',
        devtool: argv.mode === 'development' ? 'source-map' : false,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true, // This will clean the output directory before emit
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
        ],
        devServer: {
            devMiddleware: {
                writeToDisk: false,
            },
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 8080,
            historyApiFallback: true,
        },
    };
};
