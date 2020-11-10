const merge = require("webpack-merge");

module.exports = {
  env: {
    FIREBASE_API_KEY: "AIzaSyDsvQfpDg90P3IsbACvpy09JeEtcYHrYQw",
    FIREBASE_AUTH_DOMAIN: "priddy-a580f.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://priddy-a580f.firebaseio.com",
    FIREBASE_PROJECT_ID: "priddy-a580f",
    FIREBASE_STORAGE_BUCKET: "priddy-a580f.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: 765909586111,
    FIREBASE_APP_ID: "1:765909586111:web:0be0125922bbfb4eb5f60a",
    GRAPHQL_SERVER: "http://localhost:4000/",
    GRAPHQL_WS_SERVER: "ws://localhost:4000/graphql",
  },
  webpack: (
    origConfig,
    { buildId, dev, isServer, defaultLoaders, webpack, dir }
  ) => {
    const config = {
      module: {
        rules: [
          {
            test: /\.(graphql|gql)$/,
            include: [dir],
            exclude: /node_modules/,
            use: [{ loader: "graphql-tag/loader" }],
          },
        ],
      },
      // resolve: {
      //   alias: {
      //     Config: path.resolve(
      //       "./src/config/",
      //       ENV === "dev" ? "dev.ts" : "default.ts"
      //     ),
      //     Or2Base: path.resolve("./src/base"),
      //     Components: path.resolve("./src/components"),
      //     Graphql: path.resolve("./src/graphql"),
      //     Contexts: path.resolve("./src/contexts"),
      //   },
      // },
    };
    return merge(origConfig, config);
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
