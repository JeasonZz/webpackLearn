const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
// console.log("环境变量", process.env.NODE_ENV, __dirname);
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  devtool: "source-map",
  module: {
    //ignore resolve these files' import and require
    noParse: /jquery|lodash/,
    rules: [
      //为了防止config过于臃肿所以另外写在.babelrc.js中配置
      // {
      //   test: /\.js/i,
      //   use: [
      //     {
      //       loader: "babel-loader",
      //       options: {
      //         presets: ["@babel/preset-env"],
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(s[ac]|c)ss$/i, //匹配所有的scss sass css文件
        include: resolve("src"), //point resolve scope
        exclude: /node_modules/,
        use: [
          // "style-loader"
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
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
    //样式文件单独打包 分离样式文件
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css",
    }),
    //指定打包模板HTML
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    //清理旧文件
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/, //test sources request path
      contextRegExp: /moment/, //test sources context path
    }),
  ],
  devServer: {
    //静态文件打包
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 8088,
  },
  //if you have own loader,you need config it for finding it quickly
  resolveLoader: {
    modules: ["node_modules", resolve("loader")],
  },

  //optimize resolve options
  resolve: {
    alias: {
      "@": resolve("src"),
    },
    //if import file that don't have extentions ,
    //it will use this options resolve file from left to right
    //'...' is used to reserve default options
    extensions: [".js", ".json", ".wasm", "..."],
    //webpack finds  files from left to right with a higher priority
    modules: [resolve("src"), "node_modules"],
  },

  //it delete these dependencies from bundle, for example, import jQuery by CDN
  external: {
    jquery: "jQuery",
  },
};
