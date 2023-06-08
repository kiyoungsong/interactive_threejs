module.exports = {
  // 최신 문법으로 작성된 것을 과거 문법으로 변경해서 잘 구동되게 해줌
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "58",
          ie: "11",
        },
        useBuiltIns: "usage",
        corejs: {
          version: 3,
        },
      },
    ],
  ],
};
