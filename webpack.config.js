const path = require('path');
const CopyWepbackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry:{
    content_script_pre: './src/content_script_pre.ts',
    content_script_post: './src/content_script_post.ts',
    hide_button: './src/components/hide_button.tsx',
    background: "./src/background.ts",
  },
  module: {
    rules: [
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            },
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyWepbackPlugin({
      patterns: [
        {
            from: "./manifest.json",
        },
        {
            from: "./assets/*",
        }
      ],
    }),
  ],
};