import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  // Indonesian URLs stay unprefixed (SEO equity); English lives under /en.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
