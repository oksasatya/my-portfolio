import SingleProject from '@/components/single-project'
import Wrapper from '@/layouts/Wrapper'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Project Detail',
  robots: { index: false, follow: false },
}

export default function index() {
  return (
    <Wrapper>
      <SingleProject />
    </Wrapper>
  )
}
