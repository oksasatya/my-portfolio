import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { NavLinks } from "./NavLinks";
import { MobileNav } from "./MobileNav";
import { LangSwitch } from "./LangSwitch";
import { waLink } from "@/lib/contact";

export function Header() {
  const t = useTranslations("header");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <Container className="relative flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-lg font-bold tracking-tight text-ink">
          Oksa Satya<span className="text-violet-deep">.</span>
        </Link>

        {/* Absolutely centered so the nav sits in the same spot in every
            language — different label widths never shift it. */}
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm md:flex"
          aria-label={t("navLabel")}
        >
          <NavLinks />
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LangSwitch />
          <a
            href={waLink(t("waMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-violet px-5 text-sm font-semibold text-dark transition-colors hover:bg-violet-deep"
          >
            {t("cta")}
          </a>
        </div>

        <div className="flex items-center md:hidden">
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
