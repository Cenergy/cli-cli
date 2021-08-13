module.exports = {
    env: {
        node: true,
        browser: true,
        es6: true,
        commonjs: true,
    },
    extends: ["airbnb-base", "prettier", "prettier/vue"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 2018,
        sourceType: "module",
    },
    plugins: ["vue", "import"],
    settings: {
        "import/resolver": {
            webpack: {
                config: require.resolve("@vue/cli-service/webpack.config.js"),
            },
        },
        "import/extensions": [".js", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    rules: {
        "linebreak-style": [0, "error", "windows"],
        "no-console": "off",
        "max-len": [
            "error",
            {
                comments: 300,
                ignoreStrings: true,
                ignoreUrls: true,
                code: 120,
                ignoreTemplateLiterals: true,
                ignoreTrailingComments: true,
            },
        ],
        "no-underscore-dangle": ["error", { allowAfterThis: true }],
        "import/extensions": [
            "error",
            "always",
            {
                js: "never",
                mjs: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
                vue: "never",
            },
        ],
        "no-param-reassign": ["error", { props: false }],
        "no-unused-vars": "warn",
        "prefer-destructuring": [
            "error",
            {
                array: false,
                object: false,
            },
            {
                enforceForRenamedProperties: false,
            },
        ],
        "no-restricted-syntax": "off",
        "no-prototype-builtins": "off",
        "no-bitwise": ["error", { int32Hint: true }],
        radix: ["error", "as-needed"],
        "no-unused-expressions": ["error", { allowShortCircuit: true, allowTernary: true }],
        "no-shadow": ["error", { builtinGlobals: false, hoist: "never", allow: [] }],
        indent: ["error", 4],
    },
};
