module.exports = {
  preset: 'ts-jest',
  testEnvironment: './prisma/test-environment.js',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
}
