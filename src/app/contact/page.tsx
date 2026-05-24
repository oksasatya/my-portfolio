import Contact from '@/components/contact'
import Wrapper from '@/layouts/Wrapper'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Hubungi Saya — Kolaborasi Proyek Web Development',
  description:
    'Tertarik untuk berkolaborasi? Hubungi Oksa Satya untuk proyek pengembangan backend Golang, Laravel, Spring Boot, atau aplikasi web full-stack dengan Next.js.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Hubungi Oksa Satya',
    description:
      'Hubungi saya untuk proyek pengembangan backend, API, atau aplikasi web full-stack.',
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hubungi Oksa Satya',
    description:
      'Hubungi saya untuk proyek pengembangan backend dan full-stack.',
  },
}

export default function index() {
  return (
    <Wrapper>
      <Contact />
    </Wrapper>
  )
}
