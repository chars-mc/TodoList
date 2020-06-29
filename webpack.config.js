const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
   entry: './src/app.js',
   mode: "production",
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.hbs',
         minify: true
      }),
      new MiniCssExtractPlugin({
         filename: 'style.css'
      })
   ],
   module: {
      rules: [
         {
            test: /\.s?[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
         },
         {
            test: /\.hbs$/,
            loader: 'handlebars-loader'
         },
         {
            test: /\.(gif|jpg|jpeg|png|svg)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name:'[name].[ext]',
                     outputPath: 'static',
                     useRelativePath: true
                  }
               }
            ]
         }
      ]
   }
}