import globals from 'globals'
import path from 'node:path'
import pluginJs from '@eslint/js'
// import pluginReact from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'node:url'
import { includeIgnoreFile } from '@eslint/compat'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const gitIgnorePath = path.resolve(dirname, '.gitignore')

export default [
  includeIgnoreFile(gitIgnorePath),
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  //  pluginReact.configs.flat.recommended,
]
