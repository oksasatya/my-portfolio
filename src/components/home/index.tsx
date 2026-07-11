import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "./Hero";
import { TechMarquee } from "./TechMarquee";
import { Snapshot } from "./Snapshot";
import { FeaturedDexova } from "./FeaturedDexova";
import { SelectedProjects } from "./SelectedProjects";
import { Capabilities } from "./Capabilities";
import { Experience } from "./Experience";
import { ArticlesTeaser } from "./ArticlesTeaser";
import { ContactCta } from "./ContactCta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TechMarquee />
        <Snapshot />
        <FeaturedDexova />
        <SelectedProjects />
        <Capabilities />
        <Experience />
        <ArticlesTeaser />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
