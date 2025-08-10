module.exports = {
  extends: ["../.eslintrc.js"],
  env: {
    node: true,
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
  // NestJS-specific rules can be added here if needed
  rules: {
    // Example: Allow console.log in backend for debugging
    "no-console": "off",
  },
};
