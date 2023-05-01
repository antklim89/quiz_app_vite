module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'eslint:all',

        'plugin:vue/vue3-recommended',

        'plugin:import/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
    ],

    parser: 'vue-eslint-parser', // VUE

    parserOptions: {
        'parser': '@typescript-eslint/parser',
        'sourceType': 'module',
    },
    plugins: [
        '@typescript-eslint',
        'jsx-a11y',
    ],
    rules: {

        /**
        * Imports
        */
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0,
        'import/extensions': 0,
        'import/newline-after-import': ['error', { count: 2 }],
        'import/order': [
            1, {
                'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
                'alphabetize': { order: 'asc', caseInsensitive: true },
            },
        ],
        'import/no-extraneous-dependencies': ['error', { 'devDependencies': ['**/*.test.*', '**/*.spec.*', '**/*.config.*'] }],

        /**
        * TypeScript
        */
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-shadow': 2,
        '@typescript-eslint/no-unused-vars': [1, { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-empty-interface': 0,

        /**
         * Vue
         */
        'vue/html-indent': [2, 4],
        'vue/multi-word-component-names': 0,

        /**
        * JavaScript
        */
        'newline-per-chained-call': [1, { ignoreChainWithDepth: 3 }],
        'new-cap': 0,
        'capitalized-comments': 0,
        'multiline-comment-style': 0,
        'no-inline-comments': 0,
        'line-comment-position': 0,
        'require-unicode-regexp': 0,
        'no-extra-parens': 0,
        'prefer-named-capture-group': 0,
        'id-length': 0,
        'no-ternary': 0,
        'curly': 0,
        'init-declarations': 0,
        'require-await': 0,
        'space-before-function-paren': 0,
        'sort-imports': 0,
        'one-var': 0,
        'padded-blocks': 0,
        'no-magic-numbers': 0,
        'sort-keys': 0,
        'object-property-newline': 0,
        'no-shadow': 0,
        'no-undef': 0,
        'no-useless-constructor': 0,
        'no-unused-vars': 0,
        'no-process-env': 0,
        'no-negated-condition': 0,
        'func-style': 0,
        'arrow-body-style': 0,
        'max-params': [1, 4],
        'no-underscore-dangle': [2, { 'allow': ['_q'] }],
        'multiline-ternary': [2, 'always-multiline'],
        'no-implicit-coercion': 2,
        'operator-linebreak': [2, 'before'],
        'dot-location': [2, 'property'],
        'max-lines-per-function': [2, 200],
        'max-statements': ['error', 20, { ignoreTopLevelFunctions: true }],
        'function-call-argument-newline': [2, 'consistent'],
        'no-console': [1, { allow: ['warn', 'error'] }],
        'object-curly-spacing': [2, 'always'],
        'no-use-before-define': [1, { functions: false, classes: true }],
        'semi': 2,
        'comma-dangle': [1, 'always-multiline'],
        'quotes': [1, 'single'],
        'quote-props': [2, 'consistent'],
        'eol-last': 2,
        'no-multiple-empty-lines': [1, { max: 2 }],
        'indent': [1, 4],
        'max-len': [1, { code: 120, ignoreComments: true, ignoreStrings: true }],
        'no-restricted-syntax': [2, 'WithStatement'],
        'camelcase': [1, { properties: 'never' }],
        'object-curly-newline': [1, { minProperties: 6, multiline: false, consistent: true }],
        'array-element-newline': [1, 'consistent'],
    },

    globals: {
        module: true,
        process: true,
    },

    ignorePatterns: [
        '**/node_modules/**/*',
        '**/.next/**/*',
        '**/build/**/*',
        '**/.tmp/**/*',
        '**/.cache/**/*',
    ],
};
