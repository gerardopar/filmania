const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  
    entry: ['babel-polyfill' , './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_module/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: ['transform-object-rest-spread']
                }
            }
        },
        {
            test: /\.(png|jpg|jpeg|svg)$/,
            loader: 'file-loader',
            include: path.join(__dirname, 'src')
        },
        {
          test: /\.s?[ac]ss$/,
          use: [
              MiniCssExtractPlugin.loader,
              { loader: 'css-loader', options: { url: false, sourceMap: true } },
              { loader: 'sass-loader', options: { sourceMap: true } }
          ],
      }
        ]},
        plugins: [
          new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
          })
        ],
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true
    },
    devtool: 'source-map',
    mode : devMode ? 'development' : 'production'
};