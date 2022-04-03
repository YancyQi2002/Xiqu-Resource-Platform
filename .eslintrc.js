module.exports = {
  extends: [
    'vue-global-api',
    'plugin:tailwindcss/recommended',
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  plugins: ['vue'],
  rules: {
    semi: [2, "never"],
    "no-invalid-regexp": 2, //禁止无效的正则表达式
    "no-trailing-spaces": 1,//一行结束后面不要有空格
  }
}