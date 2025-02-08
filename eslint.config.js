module.export = [
    {
      ignores: ["node_modules/", "test-results/", "results.json"],
    },
    {
      files: ["**/*.js"],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      plugins: {
        playwright: require("eslint-plugin-playwright"),
      },
      rules: {
        "no-unused-vars": "error",
        "quotes": ["error", "single"],
        "no-console": ["error", { allow: ["warn", "error"] }],
        "playwright/expect-expect": "off",
        // Add other rules here...
      },
    },
  ];
  