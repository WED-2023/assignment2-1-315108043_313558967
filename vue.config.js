module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    host: "localhost"
    // host: "132.73.84.108"
  },
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
  transpileDependencies: []
};
