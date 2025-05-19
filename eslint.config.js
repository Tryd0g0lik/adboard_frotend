// eslint.config.js
// const { defineConfig }= require('eslint-define-config';
// const js= require('@eslint/js';

const eslintPluginTypeScript = require('@typescript-eslint/eslint-plugin');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintPlugImport = require("eslint-plugin-import");
const eslintPluginN = require("eslint-plugin-n");
const eslintPluginPromise = require("eslint-plugin-promise");
const TypescriptEslintParser = require('@typescript-eslint/parser');

const stylisticEslintPlugin = require('@stylistic/eslint-plugin');
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
// const stylisticTs = require('@stylistic/eslint-plugin-ts');
module.exports = {

  languageOptions: {
    ecmaVersion: 'latest', // Версия ECMAScript
    sourceType: 'module', // Использование модулей
    globals: {
      browser: true, // Глобальные переменные браузера
      // node: true, // Глобальные переменные Node.js
      // browser: true,
      commonjs: true,
      es2022: true,
    },
    parser: TypescriptEslintParser, // Парсер для TypeScript
    parserOptions: {
      project: ['./tsconfig.json'],
      ecmaVersion: 2018, //'latest',
      sourceType: 'module',
      tsconfigRootDir: __dirname,
      ecmaFeatures: {
        ts: true,
        js: true,
      },
    },
  },

  plugins: {
    // '@stylistic/ts': stylisticTs,
    '@eslint/js': eslint,
    'typescript-eslint': tseslint,
    'eol-last': ['error', 'always'],
    prettier: eslintPluginPrettier,
    promise: eslintPluginPromise,
    '@typescript-eslint': eslintPluginTypeScript,
    '@stylistic': stylisticEslintPlugin,
    'import': eslintPlugImport,
    'eslintpluginn': eslintPluginN,
    '@stylistic/eslint-plugin-plus': stylisticEslintPlugin,
  },

  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    // Запятую  вконце * нельзя ставить
    // "comma-dangle": ["error", {
    //   "arrays": "never",
    //   "objects": "never",
    //   "imports": "never",
    //   "exports": "never",
    //   "functions": "never"
    // }],
    //  последние строки в не пустом файле
    'eol-last': ['error', 'always'],
    // количество последних и первых строк в не пустом файле
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],
    
    // не востребованные переменные
    "@typescript-eslint/no-unused-vars": "error",
    quotes: 'off',
    'import/extensions': [
      'error',
      {
        ts: 'never',
        tsx: 'never',
        scss: 'always',
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error', {
      // ignoreTypeValueShadow: true,
      // ignoreFunctionTypeParameterNameValueShadow: true,
    }],
    '@typescript-eslint/space-before-function-paren': 'off',
    '@stylistic/space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
    }],
    //в операторах возврата всегда или никогда указывались значения
    "consistent-return": "off",
    "@typescript-eslint/consistent-return": "error",
    //запрещает использовать переменные до их определения
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
    //  запрещает пустые экспорты
    "@typescript-eslint/no-useless-empty-export": "error",
    'no-new': 'off',
    'no-new-wrappers': 'off',

    '@stylistic/member-delimiter-style': ['error', {
      "multiline": {
        "delimiter": "comma",
        "requireLast": false
      },
      "singleline": {
        "delimiter": "comma",
        "requireLast": false
      }
    }],
    '@stylistic/semi': ['error', 'always', { omitLastInOneLineBlock: false }],
    'semi-spacing': ['error', { before: false, after: true }],
    '@stylistic/semi-style': ['error', 'last'],


    'indent': 'off',
    // '@stylistic/ts/indent': ['error', 2],
    '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: false, ignoreRestArgs: true }],
    '@typescript-eslint/no-var-requires': 'error',

    "@typescript-eslint/consistent-indexed-object-style": ["error", "index-signature"],

    '@typescript-eslint/await-thenable': 'error',

    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',

  // TypeScript - три разделителя между элементами в интерфейсах и псевдонимах типов
    // '@stylistic/ts/member-delimiter-style': [
    //   'error', {
    //     multiline: {
    //       delimiter: 'none', // Options are ',' or ';'
    //       requireLast: false, // Last line
    //     },
    //   },
    // ],

  defaultParamLast: 'off',
    '@typescript-eslint/default-param-last': 'error',

  '@typescript-eslint/prefer-nullish-coalescing': 'off', //["error", { ignoreTernaryTests: true }]
},
  ignores: [
    "webpack.config.js",
    "postcss.config.js",
    "/*eslintrc.js",
    "/src/index.ts",
    "babel.config.js",
    "dist/",
    "src/**/interfaces.ts",
    "src/index.ts",
    "src/frontend/index.*",
    "*.js",
    "src/interfaces.ts",
    "**/interfaces.ts"
  ],
};
