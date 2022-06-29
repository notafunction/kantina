module.exports = {
  root: true,

  env: {
    es2021: true,
    browser: true,
    node: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'prettier',
  ],

  parser: 'vue-eslint-parser',

  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },

  plugins: ['vue', '@typescript-eslint', 'prettier'],
  // add your custom rules here
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
  },
}
