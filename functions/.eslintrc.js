module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    quotes: ["error", "double"],
    test: /\.jsx?$/,
    loader: "babel-loader",
    exclude: /node_modules/,
    query: {
      presets: ["es2015"],
    },
  },
  module: {
    loader: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["es2015", "react"],
        },
      },
    ],
  },
};
