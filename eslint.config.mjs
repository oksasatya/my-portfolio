import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const eslintConfig = [
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'public/**', 'next.config.mjs'],
  },
  ...compat.extends('next/core-web-vitals'),
];

export default eslintConfig;
