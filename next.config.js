const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: 'loose'
  },
  webpack:(config)=>{

    // config.module.rules.push({
    //   test: /\.(mp3|wasm)$/,
    //   type: "asset/resource",
    //   generator: {
    //     filename: "static/chunks/[path][name].[hash][ext]",
    //   },
    // });

    config.plugins.push(new MonacoWebpackPlugin({languages:[]}))
    return config
  }
}

module.exports = nextConfig
