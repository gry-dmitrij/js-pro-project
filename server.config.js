const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const inputDir = 'src/server';      // входная директория
const outputDir = 'dist/server';    // выходная директория

const copyObj = (mode) => {
    const copy = [
        {
            from: 'db/*',
            to: 'db/[name].[ext]'
        }
    ];
    if (mode) {
        copy.push({
            from: './*.js'
        });
    }
    console.log(copy);
    return copy;
}

module.exports = (env, options) => {
    const devMode = options.mode === 'development';
    return {
        context: path.resolve(__dirname, inputDir),
        entry: {
            server: ['./server.js']
        },
        watch: devMode,
        output:
            {
                path: path.join(__dirname, outputDir),
                publicPath: "./",
                filename: devMode ? 'dev.js' : '[name].js',
            },
        devtool: devMode ? 'source-map' : 'none',
        stats: {
            children: true,
            errorDetails:
                true
        },
        target: 'node',
        plugins: [
            new CleanWebpackPlugin(),
            new CopyPlugin({
                patterns: copyObj(devMode)
            })]
    }
}