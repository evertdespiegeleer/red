import eslint from '@eslint/js'
import hooksPlugin from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      'react-hooks': hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
  {
    rules: {
      // No semicolons
      semi: ['error', 'never'],
      // Use single quotes
      quotes: ['error', 'single', { avoidEscape: true }],
      // Allow explicit any types
      '@typescript-eslint/no-explicit-any': 'warn',
    }
  }
], {
  ignores: [
    '**/dist/**/*'
  ]
})
