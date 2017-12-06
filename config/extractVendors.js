const webpack = require("webpack");

const isVendor = context => context.indexOf("node_modules") >= 0;
const minChunks = module => module.context && isVendor(module.context);

module.exports = [
  // HashedModuleIdsPlugin will ensure that hashes for static assets will ONLY change
  // when associated code changes. This is crucial for proper browser caching.
  // https://webpack.js.org/guides/caching/#module-identifiers
  // https://webpack.js.org/plugins/hashed-module-ids-plugin/
  new webpack.HashedModuleIdsPlugin(),
  // Split out polyfills identified in webpack.config.prod.js entry config and from our main bundle.
  // 1. "vendor" refers to the named entry config in webpack.config.prod.js
  // 2. minChunks is used to resolve imports where the context contains "node_modules"
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    minChunks
  }),
  // Split out Webpack's boilerplate and manifest which can change for each build.  This ensures that
  // hashes for all static assets will NOT change especially when their contents have not.
  // https://webpack.js.org/guides/caching/#extracting-boilerplate
  new webpack.optimize.CommonsChunkPlugin({
    name: "manifest"
  }),
  // Split out node modules from async "code split" chunks.
  new webpack.optimize.CommonsChunkPlugin({
    async: true,
    deepChildren: true,
    minChunks
  })
];
