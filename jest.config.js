module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|@ionic|@stencil|ionicons)'],
  
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  
  coverageDirectory: 'coverage',
  
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/main.ts',
    '!src/polyfills.ts',
    '!src/environments/*.ts'
  ],
  
  // HTML Reporter Configuration
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './test-report',
        filename: 'index.html',
        openReport: true,
        expand: true,
        pageTitle: 'Test Report',
        darkTheme: true
      }
    ]
  ],
  
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};