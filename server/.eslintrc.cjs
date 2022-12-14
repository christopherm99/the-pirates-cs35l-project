module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:promise/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "promise/always-return": [2, { ignoreLastCallback: true }],
    "promise/no-callback-in-promise": 0,
  },
  plugins: ["promise"],
};
