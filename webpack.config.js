const path = require("path"); // предоставляет утилиты для работы с путями к файлам и директориям
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //записываем в константу класс MiniCssExtractPlugin из библиотеки "mini-css-extract-plugin" для дальнейшего создания плагина
const HtmlWebpackPlugin = require("html-webpack-plugin"); //записываем в константу HtmlWebpackPlugin из библиотеки "html-webpack-plugin" для дальнейшего создания плагина

module.exports = {
  //исходные файлыы
  entry: {
    index: "./src/scripts/index.js",
  },
  //получаемые файлы
  output: {
    filename: "bundle.js", //конечный js файл, в который собираются все скрипты
    path: path.resolve(__dirname, "dist"), //папка с получаемыми файлами
  },
  module: {
    rules: [
      // babel переносит новые функции в старый стандарт
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      //используем file-loader для переноса шрифтов в сборку
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "assets/fonts/[name].[ext]",
          },
        },
      },
      {
        //используем file-loader для переноса изображений в сборку
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "assets/images/[name].[ext]",
          },
        },
      },
      {//используем loader-ы для переноса файлов типа css и scss и сборку их в единый файл bundle.css
        test: /\.(sa|sc|c)ss$/i,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    // Выгружает все стили в один в файл bundle.css
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    // Берет страницу html, обрабатывает (подключает bundle.js  и стили автоматически и работает как шаблонизатор) и помещает в dist/*
    new HtmlWebpackPlugin({
      inject: true,
      filename: "index.html",
      template: path.resolve(__dirname, "src", "index.html"),
    }),
  ],
};
