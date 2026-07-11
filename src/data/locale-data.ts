// Per-locale data selectors. UI strings live in messages/*.json (next-intl);
// structured content lives in data files and is picked here.

import type { Locale } from "@/i18n/routing";
import { capabilities, experience, trustItems, dexovaProblems } from "./home";
import {
  capabilitiesEn,
  experienceEn,
  trustItemsEn,
  dexovaProblemsEn,
} from "./home-en";
import { archiveProjects, caseStudies, getCaseStudy, type CaseStudy } from "./projects";
import { archiveProjectsEn, caseStudiesEn, getCaseStudyEn } from "./projects-en";
import { articles, getArticle, type Article } from "./articles";
import { articlesEn, getArticleEn } from "./articles-en";
import { approach, certificates, clientProjects, education, skillGroups, workExperience } from "./about";
import { approachEn, certificatesEn, clientProjectsEn, educationEn, workExperienceEn } from "./about-en";

export function getHomeData(locale: Locale) {
  if (locale === "en") {
    return {
      capabilities: capabilitiesEn,
      experience: experienceEn,
      trustItems: trustItemsEn,
      dexovaProblems: dexovaProblemsEn,
    };
  }
  return { capabilities, experience, trustItems, dexovaProblems };
}

export function getAboutData(locale: Locale) {
  if (locale === "en") {
    return {
      workExperience: workExperienceEn,
      clientProjects: clientProjectsEn,
      education: educationEn,
      certificates: certificatesEn,
      skillGroups,
      approach: approachEn,
    };
  }
  return { workExperience, clientProjects, education, certificates, skillGroups, approach };
}

export function getCaseStudyByLocale(locale: Locale, slug: string): CaseStudy | undefined {
  return locale === "en" ? getCaseStudyEn(slug) : getCaseStudy(slug);
}

export function getCaseStudiesByLocale(locale: Locale): readonly CaseStudy[] {
  return locale === "en" ? caseStudiesEn : caseStudies;
}

export function getArchiveProjectsByLocale(locale: Locale) {
  return locale === "en" ? archiveProjectsEn : archiveProjects;
}

export function getArticlesByLocale(locale: Locale): readonly Article[] {
  return locale === "en" ? articlesEn : articles;
}

export function getArticleByLocale(locale: Locale, slug: string): Article | undefined {
  return locale === "en" ? getArticleEn(slug) : getArticle(slug);
}
