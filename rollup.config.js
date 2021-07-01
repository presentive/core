export default [
  {
    input: "src/browser.js",
    output: {
      file: "dist/presentive.browser.js",
      format: "iife",
      name: "presentive",
    },
  },
  {
    input: "src/presentive.js",
    output: {
      file: "dist/presentive.umd.js",
      format: "umd",
      name: "presentive",
    },
  },
];
