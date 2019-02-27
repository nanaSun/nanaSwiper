const path = require('path');
const webpack = require('webpack');

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
  context:__dirname,
  mode: 'production',
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname,"dist"),
    filename: 'nanaSwiper.umd.js',
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
        NODE_ENV: JSON.stringify("development"), 
        PUBLIC_URL: JSON.stringify("")
      } 
    }),
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
    ]
  }
};
module.exports = config;