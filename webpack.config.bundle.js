const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    //require.resolve('style-loader'),
    MiniCssExtractPlugin.loader,
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
  context:__dirname,
  mode: 'production',
  entry: {
    nanaSwiper:path.join(__dirname, 'index.js'),
    SwiperCSS:path.join(__dirname, './src/styles/Swiper.scss')
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  output: {
    path: path.join(__dirname,"dist"),
    filename: '[name].umd.js',
    //filename: 'nanaSwiper.cjs.js',
    libraryTarget: "umd",
    library: "Swiper",
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({ 
      'process.env': { 
        NODE_ENV: JSON.stringify("production"), 
        PUBLIC_URL: JSON.stringify("")
      } 
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  externals:{
    react:{ 
       root: 'React',
       amd: 'react',
       commonjs: 'react',
       commonjs2: 'react' 
    },
    "prop-types":{ 
      root: 'prop-types',
      amd: 'prop-types',
      commonjs: 'prop-types',
      commonjs2: 'prop-types' 
   }
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader')
      }
    ]
  }
};
module.exports = config;