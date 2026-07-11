// Paths that exist in BOTH locales (unprefixed form). Anything else is
// Indonesian-only; the language switcher falls back to the EN home.

const EN_PATHS = new Set([
  "/",
  "/about",
  "/contact",
  "/service",
  "/projects",
  "/projects/dexova-erp",
  "/projects/dexova-hris",
  "/projects/dexova-pos",
  "/articles",
  "/articles/arsitektur-hris-payroll-indonesia",
  "/articles/membangun-saas-multi-tenant",
]);

export function hasEnglishPage(pathname: string): boolean {
  return EN_PATHS.has(pathname);
}

/** hreflang alternates for paired pages (Next metadata `alternates.languages`). */
export function languageAlternates(idPath: string) {
  if (!hasEnglishPage(idPath)) return undefined;
  const en = idPath === "/" ? "/en" : `/en${idPath}`;
  return { id: idPath, en, "x-default": idPath };
}
