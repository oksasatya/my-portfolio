import React from 'react'
import Home from '@/components/home'
import Wrapper from '@/layouts/Wrapper'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Full-Stack Developer (Go, Java, Next.js)'
}

export default function index() {
  return (
    <Wrapper>
     <Home /> 
    </Wrapper>
  )
}
