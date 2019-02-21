const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            browsers: 'last 8 versions'
          }),
        ],
      },
    },
  ];
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
};

const config = {
  context: __dirname,
  mode: 'production',
  entry: [
    path.join(__dirname, 'demo/index.js')
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
            chunks: "initial",
                      minChunks: 2,//最小重复的次数
                      minSize: 0//最小提取字节数
        },
        vendor: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
        }
      }
    }
  },
  output: {
    path: path.join(__dirname, 'demo/dist'),
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '/demo/tpl/index.html'),
    }),
    new webpack.DefinePlugin({ 
      'process.env': { 
        NODE_ENV: JSON.stringify("production")
      } 
    }),
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
            }),
          },
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              modules: true
            }),
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader'),
          },
          {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                modules: true
              },
              'sass-loader'
            ),
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          }]
      }
    ]
  }
};

module.exports = config;
