module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: ["plugin:react/recommended", "prettier"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: ["prettier", "react", "@typescript-eslint"],
    rules: {
        "valid-jsdoc": [
            "error",
            {
                requireParamType: false,
                requireReturnType: false
            }
        ]
    }
};