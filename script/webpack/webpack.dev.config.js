const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const common = require('./webpack.common.config');
const { mergeLoaderOptions} =require('./webpack.util')
const webpack = require('webpack')
const path =require('path')
mergeLoaderOptions('ts-loader',{
    getCustomTransformers: () => ({
        before: [ReactRefreshTypeScript()],
    }),
    transpileOnly:true
})
mergeLoaderOptions('css-loader', {
    modules: {
      auto: true,
      localIdentContext: path.resolve(__dirname, '../../src'),
      getLocalIdent(context, localIdentName, localName, options) {
        const contextPath = path.relative(options.context, context.resourcePath);
        if (contextPath.endsWith('/index.module.less')) {
          if (localName === 'container') {
            localName = '';
          }
        }
        let prefix = contextPath
          .replace(/^components\//, '')
          .replace(/^styles\//, '')
          .replace(/\/index.module.less$/, '')
          .replace(/\/index.less$/, '');
        let merged = '';
        if (prefix) {
          merged += prefix;
          if (localName) {
            merged += '--' + localName;
          }
        } else {
          merged = localName;
        }
        return merged;
      },
    },
  });
module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    client:{
        overlay:{
            warnings:false
        }
    },
    port:8089,
    open:true
  },
  plugins:[
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin()
  ]
});