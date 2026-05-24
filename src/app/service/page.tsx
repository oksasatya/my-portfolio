import Service from '@/components/service'
import Wrapper from '@/layouts/Wrapper'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Layanan Pembuatan Web App & API — Go, Laravel, Next.js',
  description:
    'Layanan pengembangan backend Golang, Laravel, Spring Boot, API skalabel, dan aplikasi web full-stack dengan Next.js — oleh Oksa Satya.',
  alternates: { canonical: '/service' },
  openGraph: {
    title: 'Layanan Web Development — Oksa Satya',
    description:
      'Layanan pengembangan backend, API, dan aplikasi web full-stack.',
    url: '/service',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Layanan Web Development — Oksa Satya',
    description:
      'Layanan pengembangan backend, API, dan aplikasi web full-stack.',
  },
}

export default function index() {
  return (
    <Wrapper>
      <Service />
    </Wrapper>
  )
}
