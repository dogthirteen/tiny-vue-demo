/*
 * @Author: Jolen.Ding
 * @Date: 2021-06-02 10:15:13
 * @LastEditors: Jolen.Ding
 * @LastEditTime: 2021-11-05 16:57:37
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  plugins: ['vue'],
  rules: {
    'no-useless-escape': 0,
    'no-unused-vars': 0,
    'no-async-promise-executor': 0,
  },
};
