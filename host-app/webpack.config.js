const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  remotes: {
    login: "http://localhost:4201/remoteEntry.js",
    dashboard: "http://localhost:4202/remoteEntry.js",
    companies: "http://localhost:4203/remoteEntry.js",
    parceiros: "http://localhost:4204/remoteEntry.js",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
