module.exports = {
  extends: [
    '@antfu',
    'vue-global-api',
    'plugin:tailwindcss/recommended',
    'plugin:vue/recommended',
    'eslint:recommended',
  ],
  plugins: ['vue'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'semi': ['error', 'never'],
    'eol-last': ['error', 'never'],
    'no-console': 'off',
    'no-undef': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    'no-invalid-regexp': 2,
    'no-trailing-spaces': 1,
    'tailwindcss/no-custom-classname': 'off',
    'unused-imports/no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-unused-vars': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-v-for-key': 'off',
    'vue/valid-attribute-name': 'off',
  },
}