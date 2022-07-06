const path = require("path");
const dotenv = require("dotenv");

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  const isProduction = env && env.production !== undefined;
  return {
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.html$/,
          use: [{ loader: "html-loader" }],
        },
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
    mode: isProduction ? "production" : "development",
    devServer: {
      static: "./client/dist",
      port: 3000,
      historyApiFallback: true,
    },

    devtool: "inline-source-map",
  };
};
