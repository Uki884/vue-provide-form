// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  chainWebpack: function(config) {
    config.module.rule("js").exclude.add(/node_modules/);
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue: path.resolve("./node_modules/vue")
      },
      symlinks: false // 使用npm link
    }
  }
};
