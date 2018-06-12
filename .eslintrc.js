// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': ['error', 'never'], // 函数前面括弧是否有空格
    'one-var': ["error", { var: 'always', let: 'never', const: 'never' }], // 声明变量
    'quotes': ['error', 'single'], // 引号
    'semi': ['error', 'never'], // 块结尾分号
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }] // 不检查标签，在使用框架时跳过组件标签检查适用
  }
}
