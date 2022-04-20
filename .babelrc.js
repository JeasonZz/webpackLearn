module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: "7.17.9",
        targets: {
          chrom: "58",
          ie: "11",
        },
      },
    ],
  ],
};
