const path = require('path');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ProgressPlugin = require('progress-webpack-plugin');

module.exports = {
  mode,
  target,
  devtool,
  context: path.resolve(__dirname, 'src'),
  devServer: {
    historyApiFallback: true,
    //Ось та сама строка коду яка оновлює браузер при зміні коду у  файлах
    watchFiles: path.join(__dirname, 'src'),
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  entry: {
    main: './js/index.js',
    // analyticks: './js/analytics.js',
    // style: './sass/style.sass'
  },
  // entry: path.join(__dirname, 'js/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.[contenthash].js',
    assetModuleFilename: path.join('img', '[name].[contenthash][ext]'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new ProgressPlugin(true),
  ],
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              ['svgo', { name: 'preset-default' }],
            ],
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },

          {
            loader: 'sass-loader',
            options: {
              // Prefer Dart Sass
              implementation: require('sass'),
              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false,
              sassOptions: {
                includePaths: ['./node_modules'],
              },
            },
          },
        ],
      },
      {
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      //

      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: path.join('icons', '[name].[contenthash][ext]'),
        },
      },
    ],
  },
};

// Додав два посилання на github-repositories. Перший link це project on webpack. Намучився вдосталь з ним. Але все працює - як і планував. Картинки усі, які під'єднані до index.html - компілюються у папку img або icons з хешом, а також завдяки плагіну зменшує їх розмір до оптимального. Додав MiniCssExtractPlugin , а також у post-css додав автопрефіксер. Додав babel який тепер компілює js код у стандарт es5 для допотопних браузерів). Додав ProgressPlugin. А ле він чисто для красоти). Намагався додати EsLint плагін , але не доробив. Якщо буде потрібно - зроблю потім. І найголовніше - це додав webpack до минулого проекту на бутсрапі. І додав bootstrap and material-design через npm. Працює))) Додав слайдер під аккордіоном - щоб послідкувати за зміноє розмуру картинок після компіляції webpack. А також під слайдером додав кнопку від material-design . У якої запрацювали стилі)))) Довго я його мучив і він мене))) Другий link це project on gulp. Там лише необхідно було додати дві строчки коду від bootstrap і запрацювало). Я розумію що неправильно додав файли до репозиторію ( на скільки я знаю додається тільки вміст src, а dist взагалі не додається). Але ж для повної картини як виглядають файли до компіляції і після - вирішив додати файли так.
