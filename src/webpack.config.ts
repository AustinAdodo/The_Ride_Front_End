import * as webpack from 'webpack';

/**
 * NB: Note custom webpack configuration must be installed to allow custom webpack in angular.json
 * use npm install @angular-builders/custom-webpack
 * Also remember to change @angular-devkit/build-angular:application to @angular-builders/custom-webpack as the latter
 * supports configuration for custom webpack.
 */
const config: webpack.Configuration = {
  // Resolve configuration options
  resolve: {
    fallback: {
      // Specify modules that should not be bundled for the client-side
      net: false, // 'net' module is a Node.js built-in module
      // Add other Node.js modules here if needed
    },
  },
  // Plugins configuration
  plugins: [
    new webpack.DefinePlugin({
      // Define environment variables for the build process
      'process.env': JSON.stringify(process.env),
    }),
  ],
};

export default config;
