'use strict';

const { Webpack } = require('@embroider/webpack');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

function isProduction() {
  return EmberApp.env() === 'production';
}

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    autoImport: {
      watchDependencies: ['ember-container-query'],
    },
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
  });

  return require('@embroider/compat').compatBuild(app, Webpack, {
    packagerOptions: {
      // Embroider lets us send our own options to the style-loader
      cssLoaderOptions: {
        // enable CSS modules
        modules: {
          // class naming template
          localIdentName: isProduction()
            ? '[sha512:hash:base64:5]'
            : '[path][name]__[local]',
          // global mode, can be either `global` or `local`
          mode: (resourcePath) => {
            if (resourcePath.includes(`/${app.name}/`)) {
              return 'local';
            }

            return 'global';
          },
        },
        // don't create source maps in production
        sourceMap: !isProduction(),
      },

      // publicAssetURL is used similarly to Ember CLI's asset fingerprint prepend option.
      publicAssetURL: '/',

      webpackConfig: {
        module: {
          rules: [
            {
              // When webpack sees an import for a CSS files
              exclude: /node_modules/,
              test: /\.css$/i,
              use: [
                {
                  // use the PostCSS loader addon
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: !isProduction(),
                    postcssOptions: {
                      config: './postcss.config.js',
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    },
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    splitAtRoutes: ['album', 'dashboard', 'form', 'products'],
    staticAddonTestSupportTrees: true,
    staticAddonTrees: false, // due to ember-css-modules
    staticComponents: false, // due to ember-css-modules
    staticHelpers: true,
    staticModifiers: true,
  });
};
