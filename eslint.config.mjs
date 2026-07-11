import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

// eslint-config-next 16 ships native flat configs (arrays), so FlatCompat is
// no longer needed — spread directly. Scope matches the pre-upgrade config
// (core-web-vitals only; not the stricter typescript ruleset).
const eslintConfig = [
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'public/**', 'next.config.mjs'],
  },
  ...nextCoreWebVitals,
];

export default eslintConfig;
