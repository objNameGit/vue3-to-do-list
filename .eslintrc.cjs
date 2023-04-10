/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    ignorePatterns: ['/dist'],
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    // rules: {
    //     semi: 'off',
    //     'space-before-function-paren': 'off',
    //     'vue/max-attributes-per-line': [2, {
    //         'singleline': 20,
    //         'multiline': {
    //            'max': 1,
    //            'allowFirstLine': false
    //          }
    //     }]
    // },
    rules: {
        'vue/html-indent': ['error', 4],
        'vue/max-len': [
            'warn',
            {
                code: 120,
                template: 120,
                tabWidth: 4,
                comments: 120,
                ignorePattern: '',
                ignoreComments: false,
                ignoreTrailingComments: false,
                ignoreUrls: false,
                ignoreStrings: false,
                ignoreTemplateLiterals: false,
                ignoreRegExpLiterals: false,
                ignoreHTMLAttributeValues: false,
                ignoreHTMLTextContents: false,
            },
        ],
        'no-underscore-dangle': [
            'error',
            {
                allowAfterThis: true,
            },
        ],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'always',
            },
        ],
    },
};
