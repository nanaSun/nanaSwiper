const transformIgnorePatterns = [
    '/dist/',
    'node_modules/[^/]+?/(?!(es|node_modules)/)', // Ignore modules without es dir
  ];
  module.exports = {
    verbose: true,
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'md'],
    testPathIgnorePatterns: ['/node_modules/', 'dist'],
    transform: {
        "^.+\\.js$": "babel-jest"
    },
    moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "./test/__mocks__/fileMock.js"
    },
    transformIgnorePatterns,
    testURL: 'http://localhost',
    globals: {
        ontouchstart: null
    }
  };