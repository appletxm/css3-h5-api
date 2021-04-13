module.exports = {
    "presets": [
      "@babel/preset-env"
    ],
    "plugins": [
      "@babel/plugin-transform-runtime",
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["./scripts/babel-my-plugin", {
        "test": "12345",
        "options": "6666"
      }]
    ],
    "env": {
      "test": {},
      "development": {},
      "mock": {}
    }
}
