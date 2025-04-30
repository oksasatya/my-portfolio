 
import React from 'react'

import type { Metadata } from 'next'  
import Home from '@/components/home'
import Wrapper from '@/layouts/Wrapper'

export default function index() {
  return (
    <Wrapper>
     <Home /> 
    </Wrapper>
  )
}
