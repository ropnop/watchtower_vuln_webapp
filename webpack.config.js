const path = require('path');

module.exports = {
    entry: "./client/heroes.jsx",
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'static')
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, "client")
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            }
        ]
    }
}