// 出力は絶対pathで指定しなければいけない為、node.jsのpathモジュールを使用する
const path = require("path");

const outputPath = path.resolve(__dirname, "dist");

module.exports = {
  // バンドルするファイルを指定
  entry: path.resolve(__dirname, "src/index.tsx"),

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },

  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devServer: {
    contentBase: outputPath
  }
};
