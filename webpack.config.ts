import * as webpack from 'webpack';
import * as path from 'path';
import Dotenv from 'dotenv-webpack';

/**
 * Importance of webpack.config.ts in Reading .env Files
 * The Webpack configuration (webpack.config.ts) is important for injecting .env variables into Angular apps
 * during the build process. Here's why:
 * 
  Why not use process.env directly?:
  Angular runs in the browser, where process.env is not natively available. process.env is a Node.js-specific object.
  Browsers do not have access to your server-side environment variables.
  Role of Webpack in this process:

 * Webpack processes and bundles your code before sending it to the browser. By using a plugin like dotenv-webpack, 
  Webpack can read your .env file during the build and replace process.env variables with their values at compile time.
  How it works with Webpack:
  dotenv-webpack reads the .env file and injects the variables into the bundle, making them 
  available as process.env in your Angular application. This bridges the gap between Node.js (backend) and the browser (frontend).
*/
const config: webpack.Configuration = {
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      safe: true, // Ensures all required variables are defined
    }),
  ],
};

export default config;
