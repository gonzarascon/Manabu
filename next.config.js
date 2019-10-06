// next.config.js
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  webpack: function(config) {
    // config.module.rules.push({
    //   test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
    //   use: [
    //     {
    //       loader: 'url-loader',
    //       options: {
    //         limit: 10000,
    //         name: '[name].[ext]'
    //       }
    //     }
    //   ]
    // });

    return config;
  }
};

module.exports = withPlugins(
  [
    withCSS({
      webpack: function(config) {
        config.module.rules.push({
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: '[name].[ext]'
              }
            }
          ]
        });

        return config;
      }
    }),
    withFonts
  ],
  nextConfig
);
