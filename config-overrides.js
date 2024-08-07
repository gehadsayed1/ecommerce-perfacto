const { override, addBabelPlugins, addWebpackAlias } = require('customize-cra');
const path = require('path');
const webpack = require('webpack');

module.exports = override(
  // إذا لم تكن بحاجة إلى إضافة Babel plugins، يمكنك إزالة هذا القسم
  ...addBabelPlugins(
    // أضف هنا أي إضافات Babel تحتاجها
  ),

  // إضافة Webpack Aliases
  addWebpackAlias({
    ["@components"]: path.resolve(__dirname, "src/components"),
    ["@pages"]: path.resolve(__dirname, "src/pages"),
    // أضف المزيد من الاختصارات كما تريد
  }),

  (config) => {
    // إضافة إعدادات fallback لـ buffer و core modules الأخرى
    config.resolve.fallback = {
      "buffer": require.resolve("buffer/"),
      "net": false,
      "tls": false,
      "assert": require.resolve("assert/"),
      "crypto": require.resolve("crypto-browserify")
    };

    // إضافة plugin لتوفير Buffer
    config.plugins = [
      ...config.plugins,
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ];

    return config;
  }
);
