const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = {
  reactStrictMode: true,
  // optimizedImages,
  async rewrites() {
    return [ 
      { source: '/api/:path*', destination: `https://metavatar.kingkongs.cn/api/:path*` } 
    ]
  }

}


// module.exports = withPlugins([
//   [optimizedImages, {
//     /* config for next-optimized-images */
//   }],

//   // your other plugins here

// ])