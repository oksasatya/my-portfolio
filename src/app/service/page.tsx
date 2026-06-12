import Service from '@/components/service'
import Wrapper from '@/layouts/Wrapper'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Jasa Pembuatan Website, Aplikasi & API',
  description:
    'Jasa pembuatan website, aplikasi web, sistem informasi, dan API/integrasi sistem dengan Golang, Laravel, Spring Boot, dan Next.js. Dari company profile & toko online sampai platform SaaS — backend skalabel, aman, dan siap tumbuh.',
  keywords: [
    'jasa pembuatan website',
    'jasa pembuatan aplikasi',
    'jasa pembuatan aplikasi web',
    'jasa pembuatan website company profile',
    'jasa pembuatan toko online',
    'jasa pembuatan API',
    'jasa integrasi sistem',
    'jasa pembuatan sistem informasi',
    'jasa backend developer',
    'jasa pembuatan SaaS',
    'freelance web developer Indonesia',
    'jasa Golang',
    'jasa Laravel',
    'jasa Next.js',
  ],
  alternates: { canonical: '/service' },
  openGraph: {
    title: 'Jasa Pembuatan Website, Aplikasi & API — Oksa Satya',
    description:
      'Jasa pembuatan website, aplikasi web, API & integrasi sistem dengan Golang, Laravel, dan Next.js — backend skalabel sampai platform SaaS.',
    url: '/service',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Pembuatan Website, Aplikasi & API — Oksa Satya',
    description:
      'Jasa pembuatan website, aplikasi web, API & integrasi sistem — Golang, Laravel, Next.js.',
  },
}

export default function index() {
  return (
    <Wrapper>
      <Service />
    </Wrapper>
  )
}
