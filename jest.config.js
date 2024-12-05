module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', 
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testEnvironment: 'jest-environment-jsdom', 
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], 
  moduleNameMapper: { 
    '\\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest.mock.js',
    '\\.css$': 'identity-obj-proxy',
  },
};
