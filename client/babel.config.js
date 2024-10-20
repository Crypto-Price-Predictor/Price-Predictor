module.exports = {
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }], // Support ES features
      "@babel/preset-react", // Support React JSX
      "@babel/preset-typescript", // Support TypeScript
    ],
  };
  