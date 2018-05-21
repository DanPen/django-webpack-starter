const fs = require('fs')
const path = require('path')

const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')
const WebpackOnBuildPlugin = require('on-build-webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const buildDir = './dist/'

module.exports = (env) => ({
  context: __dirname,
  entry: './src/js/index.js',
  output: {
    path: path.resolve(buildDir),
    filename: '[name]-[hash:6].js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            minimize: env.production
          }
        }, {
          loader: 'sass-loader'
        }]
      })
    }]
  },
  plugins: [
    new WebpackOnBuildPlugin(clearBuild),
    new ExtractTextPlugin('styles-[hash:6].css', {
      allChunks: true
    }),
    new BundleTracker({
      filename: './webpack-stats.json'
    })
  ]
})


function clearBuild (stats) {
  const newlyCreatedAssets = stats.compilation.assets;

  const unlinked = []

  fs.readdir(path.resolve(buildDir), (err, files) => {
    files.forEach(file => {
      if (!newlyCreatedAssets[file]) {
        fs.unlink(path.resolve(buildDir + file), () => {
          unlinked.push(file)
        })
      }
    })

    if (unlinked.length > 0) {
      console.log('Removed old assets: ', unlinked)
    }
  })
}
