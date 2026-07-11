import { Mail, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { ContactForm } from "./ContactForm";
import { CONTACT, waLink } from "@/lib/contact";

export function ContactPage() {
  const t = useTranslations("contactPage");
  const th = useTranslations("header");
  const CHANNELS = [
    {
      label: "WhatsApp",
      value: CONTACT.waDisplay,
      href: waLink(th("waMessage")),
      icon: MessageCircle,
      note: t("waNote"),
    },
    {
      label: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      icon: Mail,
      note: t("emailNote"),
    },
  ] as const;
  return (
    <>
      <Header />
      <main>
        <div className="border-b border-line">
          <Container className="py-14 sm:py-20">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">{t("intro")}</p>
          </Container>
        </div>

        <Container className="py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
            <div className="space-y-4">
              {CHANNELS.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-xl border border-line bg-surface p-6 transition-colors hover:border-violet-glow"
                >
                  <ch.icon size={20} aria-hidden className="mt-0.5 text-violet-deep" />
                  <span>
                    <span className="block font-display font-semibold">{ch.label}</span>
                    <span className="mt-0.5 block text-sm text-ink">{ch.value}</span>
                    <span className="mt-1 block text-xs text-muted">{ch.note}</span>
                  </span>
                </a>
              ))}

              <div className="flex gap-4 pt-2">
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                >
                  <GithubIcon size={16} /> GitHub
                </a>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                >
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
              </div>
            </div>

            <ContactForm />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
