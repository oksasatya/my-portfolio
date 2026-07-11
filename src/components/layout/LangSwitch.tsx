"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { hasEnglishPage } from "@/i18n/routes";
import { FlagID, FlagGB } from "@/components/ui/flags";

const LOCALES = [
  { code: "id", label: "Bahasa Indonesia", Flag: FlagID },
  { code: "en", label: "English", Flag: FlagGB },
] as const;

export function LangSwitch() {
  const locale = useLocale();
  const t = useTranslations("header");
  const pathname = usePathname();

  // ID-only pages have no EN twin — fall back to the EN home.
  const hrefFor = (code: string) =>
    code === "en" && !hasEnglishPage(pathname) ? "/" : pathname;

  return (
    <div
      role="group"
      aria-label={t("langSwitch")}
      className="inline-flex items-center gap-0.5 rounded-full border border-line p-0.5"
    >
      {LOCALES.map(({ code, label, Flag }) => {
        const active = locale === code;
        return (
          <Link
            key={code}
            href={hrefFor(code)}
            locale={code}
            aria-label={label}
            aria-current={active ? "true" : undefined}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-all md:h-8 md:w-9 ${
              active ? "bg-surface ring-1 ring-line" : "opacity-45 hover:opacity-100"
            }`}
          >
            <span className="block h-3.5 w-5 overflow-hidden rounded-[3px] ring-1 ring-black/15">
              <Flag className="h-full w-full" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
