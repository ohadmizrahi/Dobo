module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
         {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',

        },
      ],
      ["module-resolver", {
        "alias": {
          "@Root": ".",
          "@Components": "./components",
          "@Schemas": "./schemas",
          "@Utils": "./utils",
          "@Screens": "./screens",
          "@Assets": "./assets"
        },
        "extensions": [
          ".js",
          ".jsx"
        ]
      }],
    ],
  };
};


