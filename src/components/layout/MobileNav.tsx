"use client";

import { useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { NavLinks } from "./NavLinks";
import { LangSwitch } from "./LangSwitch";
import { waLink } from "@/lib/contact";

export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const t = useTranslations("mobileNav");
  const th = useTranslations("header");

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={open}
        aria-label={t("open")}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-ink transition-colors hover:text-violet"
      >
        <Menu size={22} />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={th("navLabel")}
        className="mobile-drawer m-0 ml-auto h-dvh max-h-none w-[88vw] max-w-sm overflow-hidden rounded-l-2xl bg-surface p-0"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between px-6 pb-5 pt-6">
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              Oksa Satya<span className="text-violet">.</span>
            </span>
            <button
              type="button"
              onClick={close}
              aria-label={t("close")}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-violet hover:text-ink"
            >
              <X size={20} />
            </button>
          </header>

          <nav
            className="flex flex-1 flex-col overflow-y-auto px-4 py-2"
            aria-label={th("navLabel")}
          >
            {/* my-auto centers when content is short, scrolls from the top when tall. */}
            <div className="my-auto flex flex-col gap-1">
              <NavLinks
                variant="mobile"
                className="flex items-center rounded-xl px-4 py-4 font-display text-3xl tracking-tight transition-colors hover:bg-dark aria-[current=page]:bg-violet/10 aria-[current=page]:text-violet"
                onNavigate={close}
              />
            </div>
          </nav>

          <div className="space-y-5 border-t border-line px-6 pb-8 pt-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wide text-muted">
                {t("language")}
              </span>
              <LangSwitch />
            </div>
            <a
              href={waLink(th("waMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet px-5 font-semibold text-dark transition-colors hover:bg-violet-deep"
            >
              {th("cta")}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </dialog>
    </div>
  );
}
