module.exports = {
  extends: ["../.eslintrc.js"],
  env: {
    browser: true,
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
  // Angular-specific rules can be added here if needed
  rules: {
    // Example: Stricter console.log rules for frontend
    "no-console": "error",
  },
};
