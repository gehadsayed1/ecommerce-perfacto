const { override, addBabelPlugins, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addBabelPlugins(
    // أضف هنا أي إضافات Babel تحتاجها
  ),
  addWebpackAlias({
    ["@components"]: path.resolve(__dirname, "src/components"),
    ["@pages"]: path.resolve(__dirname, "src/pages"),
    // أضف المزيد من الاختصارات كما تريد
  })
);
