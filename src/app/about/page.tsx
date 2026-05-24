import About from '@/components/about'
import Wrapper from '@/layouts/Wrapper'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Tentang Saya — Full-Stack Developer (Go, Java, Next.js)',
  description:
    'Pengalaman, keahlian, dan perjalanan karier Oksa Satya membangun backend Golang, Laravel, Spring Boot, dan aplikasi web modern dengan Next.js.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'Tentang Oksa Satya — Full-Stack Developer',
    description:
      'Profil, keahlian teknis, dan perjalanan karier sebagai Full-Stack Developer dengan fokus backend.',
    url: '/about',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tentang Oksa Satya — Full-Stack Developer',
    description:
      'Profil, keahlian teknis, dan perjalanan karier sebagai Full-Stack Developer.',
  },
}

export default function index() {
  return (
    <Wrapper>
      <About />
    </Wrapper>
  )
}
