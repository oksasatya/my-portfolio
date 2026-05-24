import Projects from '@/components/projects'
import Wrapper from '@/layouts/Wrapper'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Proyek & Studi Kasus — Backend Go, Laravel, Next.js',
  description:
    'Kumpulan karya Oksa Satya: API skalabel, platform SaaS, dan aplikasi web modern dibangun dengan Golang, Laravel, Spring Boot, dan Next.js.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Proyek & Studi Kasus — Oksa Satya',
    description:
      'Karya dan studi kasus pengembangan backend dan full-stack: Go, Laravel, Spring Boot, Next.js.',
    url: '/projects',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proyek & Studi Kasus — Oksa Satya',
    description:
      'Karya dan studi kasus pengembangan backend dan full-stack.',
  },
}

export default function index() {
  return (
    <Wrapper>
      <Projects />
    </Wrapper>
  )
}
