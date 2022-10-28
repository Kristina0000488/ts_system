module.exports = {
    preset: 'ts-jest',
    collectCoverageFrom: ['!**/node_modules/**', '**/*.{js,ts,tsx}'],
    coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
    roots: ['<rootDir>/src/'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$', 
    //testMatch: ['**/__tests__/*.ts?(x)'],
    transform: { '^.+\\.(t|j)sx?$': 'ts-jest', 
    '^.+\\.tsx?$': 'babel-jest', },
    verbose: true,
};

export {};