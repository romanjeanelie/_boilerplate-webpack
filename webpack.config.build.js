const path = require("path");

const { merge } = require("webpack-merge");
const config = require("./webpack.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(config, {
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./views/pages/home.pug",
    }),
  ],

  output: {
    path: path.join(__dirname, "public"),
  },
});
