import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";

// Display face — headings, hero. Variable font.
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

// Body face.
export const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

// Technical labels, data figures, breadcrumbs, code. Mostly below the fold.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
  variable: "--font-jetbrains-mono",
});
