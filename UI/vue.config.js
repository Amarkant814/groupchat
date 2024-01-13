const TerserPlugin = require("terser-webpack-plugin");
const { defineConfig } = require('@vue/cli-service')
const MomentTimezoneDataPlugin = require("moment-timezone-data-webpack-plugin");
const currentYear = new Date().getFullYear();
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  runtimeCompiler:true,
  configureWebpack: {
    // devtool: "source-map",
    optimization: {
      runtimeChunk: "single",
      minimize: true,
      removeEmptyChunks: true,
      minimizer: [new TerserPlugin({
        terserOptions :{
          sourceMap: true,
          drop_console:true
        }
      })],
    },
    plugins: [
      new MomentTimezoneDataPlugin({
        startYear: currentYear - 5,
        endYear: currentYear + 5,
      }),
    ]
  }
})
