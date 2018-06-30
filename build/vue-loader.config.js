// vue在不同的情况下的配置巷
module.exports = (isDev) => {
  // vue-loader的配置项
  return {
    preserveWhitepace: true, // 控制节点的空格
    extractCSS: !isDev, // 单独打包css 因为不会使用webpack单独打包的css
    cssModules: {
      localIndetName: '[path]-[name]-[hash:base64:5]', // 配置独一无二的类名
      camelCase: true
    },
    // hotReload: false,

  }
}