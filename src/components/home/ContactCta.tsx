import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ContourBackdrop } from "@/components/ui/backdrops";
import { CONTACT, waLink } from "@/lib/contact";

const INTENT_KEYS = ["freelance", "remote", "consult", "collab"] as const;

export function ContactCta() {
  const t = useTranslations("home");
  const tf = useTranslations("contactForm.topics");
  const th = useTranslations("header");
  return (
    <Section id="contact" className="overflow-hidden" contained={false} ariaLabel={t("contactTitle")}>
      <ContourBackdrop />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("contactTitle")}
          </h2>
          <p className="mt-4 text-lg text-muted">{t("contactIntro")}</p>

          <ul className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-xs text-muted sm:text-sm">
            {INTENT_KEYS.map((key) => (
              <li key={key}>{tf(key)}</li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={waLink(th("waMessage"))} external size="lg">
              {t("contactWa")}
            </Button>
            <Button href={`mailto:${CONTACT.email}`} variant="secondary" size="lg" external>
              <Mail size={16} aria-hidden /> {t("contactEmail")}
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm">
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-ink"
            >
              <GithubIcon size={16} /> GitHub
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-ink"
            >
              <LinkedinIcon size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
