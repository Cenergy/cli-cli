module.exports = {
    env: {
        node: true,
        browser: true,
        es6: true,
        commonjs: true,
    },
    extends: ['airbnb-base', 'prettier', 'prettier/vue'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'linebreak-style': ['error', 'windows'],
        'no-console': 'off',
        'no-underscore-dangle': 'off',
        'no-tabs': ['error', { allowIndentationTabs: true }],
        'valid-jsdoc': 'error',
        'class-methods-use-this': 'off',
        'no-param-reassign': ['error', { props: false }],
        'no-unused-vars': 'warn',
        'max-len': [
            'error',
            {
                comments: 300,
                ignoreStrings: true,
                ignoreUrls: true,
                code: 100,
            },
        ],
    },
};
