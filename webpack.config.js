const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MinCssExtractPlugin = require("mini-css-extract-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
console.log("环境变量", process.env.NODE_ENV, __dirname);
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i, //匹配所有的scss sass css文件
        use: [
          // "style-loader"
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      // {
      //   test: /\.(jpe?g|png|gif)$/i,
      //   //使用file-loader解决webpack不认识图片的问题
      //   use: [
      //     // "file-loader",
      //     {
      //       loader: "url-loader",
      //       options: {
      //         name: "[name].[hash:8].[ext]",
      //         limit: 50 * 1024,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: "asset",
        generator: {
          filename: "[name][hash:8][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024,
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: "asset",
        generator: {
          filename: "[name][hash:8][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    //样式文件单独打包
    new MinCssExtractPlugin({
      filename: "[name].[hash:8].css",
    }),
    //指定打包模板HTML
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    //清理旧文件
    new CleanWebpackPlugin(),
  ],
  devServer: {
    //静态文件打包
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 8088,
  },
};
