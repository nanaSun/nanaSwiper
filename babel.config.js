const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          "browsers": ["last 10 versions"]
        },
        useBuiltIns: "usage",
      }
    ],
    ["@babel/preset-react"]
  ];
  const plugins=[
    ["@babel/plugin-proposal-class-properties"]
  ]
  module.exports = { presets,plugins };