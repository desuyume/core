import antfu from '@antfu/eslint-config'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'

/** @type {import('@eslint').Eslint} */
export const eslint = (options, ...configs) => {
  if (options['jsx-a11y']) {
    configs.unshift({
      plugins: {
        'jsx-a11y': pluginJsxA11y
      },
      name: 'jsx-a11y'
    })
  }

  if (options.react) {
    configs.unshift({
      name: 'react-config',
      plugins: {
        'react-config': pluginReact
      },
      settings: {
        react: {
          version: 'detect'
        }
      },
      rules: {
        'react-config/react-in-jsx-scope': 'off',
        'react-config/function-component-definition': [
          'error',
          {
            namedComponents: ['arrow-function'],
            unnamedComponents: 'arrow-function'
          }
        ]
      }
    })
  }
  return antfu(
    { ...options, stylistic: options.stylistic ?? false },
    {
      name: 'rewrite',
      rules: {
        'antfu/top-level-function': 'off',
        'antfu/if-newline': 'off',
        'antfu/curly': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'test/prefer-lowercase-title': 'off',
        'no-console': 'warn'
      }
    },
    {
      name: 'imports',
      plugins: {
        'plugin-simple-import-sort': pluginSimpleImportSort
      },
      rules: {
        'sort-imports': 'off',
        'import/order': 'off',
        'import/extensions': 'off',
        'plugin-simple-import-sort/exports': 'error',
        'plugin-simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react', '^@?\\w'],
              ['^@(desuyume-core/.*|$)'],
              ['^@(([\\/.]?\\w)|assets|test-utils)'],
              ['^\\u0000'],
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              ['^.+\\.s?css$']
            ]
          }
        ]
      }
    },
    ...configs
  )
}
