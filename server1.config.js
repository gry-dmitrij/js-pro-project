const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
    const devMode = options.mode === 'development';
    return {
        entry: {
            server: path.join(__dirname, 'src/server/server.js'),
        },
        output: {
            path: path.join(__dirname, 'dist/server'),
            publicPath: "/",
            filename:
                "[name].js"
        },
        watch: devMode,
        target: "node",
        node: {
            // Только для express приложений
            __dirname: false,
            __filename: false
        },
        externals: [nodeExternals()], // Только для express приложений
        module: {
            rules: [
                {
                    // Перекомпилировать es6+ в es5
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                }
            ]
        },
        plugins: [
            new CopyPlugin({
                patterns:[
                    {
                        from: 'src/server/db/*',
                        to: 'db/[name][ext]',
                        // toType: 'template'
                    },
                ]
            }),
        ]
    }
};
