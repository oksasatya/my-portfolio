import { useTranslations } from "next-intl";

/**
 * Tech-stack marquee under the hero. Icons are self-hosted brand SVGs
 * (simple-icons) in /public/assets/icons/tech. The track is duplicated for a
 * seamless CSS loop; animation pauses on hover/focus and disappears under
 * prefers-reduced-motion (static row remains readable).
 */
const STACK: readonly { slug: string; label: string }[] = [
  // Languages
  { slug: "go", label: "Go" },
  { slug: "openjdk", label: "Java" },
  { slug: "typescript", label: "TypeScript" },
  { slug: "php", label: "PHP" },
  // Backend frameworks
  { slug: "spring", label: "Spring Boot" },
  { slug: "laravel", label: "Laravel" },
  { slug: "nodedotjs", label: "Node.js" },
  { slug: "express", label: "Express" },
  // Frontend
  { slug: "react", label: "React" },
  { slug: "nextdotjs", label: "Next.js" },
  { slug: "tailwindcss", label: "Tailwind CSS" },
  // Databases
  { slug: "postgresql", label: "PostgreSQL" },
  { slug: "mysql", label: "MySQL" },
  { slug: "mongodb", label: "MongoDB" },
  { slug: "redis", label: "Redis" },
  // Infra / DevOps
  { slug: "docker", label: "Docker" },
  { slug: "nginx", label: "Nginx" },
  { slug: "linux", label: "Linux" },
  { slug: "git", label: "Git" },
];

function Track({ hidden = false }: Readonly<{ hidden?: boolean }>) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {STACK.map((item) => (
        <li key={item.slug} className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny local SVGs, no optimizer needed */}
          <img
            src={`/assets/icons/tech/${item.slug}.svg`}
            alt=""
            width={22}
            height={22}
            loading="lazy"
            className="h-[22px] w-[22px] opacity-90"
          />
          <span className="whitespace-nowrap font-mono text-sm text-muted">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function TechMarquee() {
  const t = useTranslations("home");
  return (
    <section
      aria-label={t("stackLabel")}
      className="marquee overflow-hidden border-b border-line bg-dark py-5"
    >
      <div className="marquee-track flex w-max">
        <Track />
        <Track hidden />
      </div>
    </section>
  );
}
