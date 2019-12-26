const path = require('path');
const dotenv = require('dotenv');

module.exports = () => {
    const env = dotenv.config().parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});
    const isProduction = env && env.production !== undefined;
    return {
        entry: ['babel-polyfill', './src/index.js'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        { loader: 'html-loader' }
                    ]
                },
                {
                    test: /\.css$/i,
                    loader: 'style-loader!css-loader?modules',
                    exclude: /node_modules/,
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
            ]
        },
        node: {
            fs: 'empty'
        },
        mode: isProduction ? 'production' : 'development',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            publicPath: 'http://localhost:8000/',
            compress: true,
            port: 8000,
            hot: true,
            historyApiFallback: true,
        },
        devtool: 'inline-source-map',
    }
}