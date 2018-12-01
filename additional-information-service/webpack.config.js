const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");

// const VENDOR_LIBS = [
//   "JSONStream",
//   "apollo-boost",
//   "cassandra-driver",
//   "cors",
//   "csv",
//   "express",
//   "express-cassandra",
//   "express-graphql",
//   "faker",
//   "fast-csv",
//   "graphql",
//   "graphql-tools",
//   "moment",
//   "newrelic",
//   "pg",
//   "react",
//   "react-apollo",
//   "react-dom",
//   "react-number-format",
//   "recharts"
// ];

// const UNUSED_LIBS = ["mongoose", "mongoose-simple-random", "sstable"];

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false // remove all comments
        }
      }
    })
    // new CompressionPlugin()
  ],
  // entry: __dirname + '/src/index.js',
  entry: {
    bundle: "./src/index.js"
    // vendor: VENDOR_LIBS,
    // unused: UNUSED_LIBS
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"]
          }
        }
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/server/public"
  }
};
