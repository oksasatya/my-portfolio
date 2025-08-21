import SingleProject from '@/components/single-project'
import Wrapper from '@/layouts/Wrapper'
import { Metadata } from 'next'
import React from 'react'

export default function index() {
  return (
    <Wrapper>
      <SingleProject />
    </Wrapper>
  )
}
