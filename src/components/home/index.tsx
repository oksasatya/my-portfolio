
import React from 'react'
import HeroArea from './HeroArea'
import AboutArea from './AboutArea'
import ServiceArea from './ServiceArea'
import HeaderOne from '@/layouts/headers/HeaderOne'
import PortfolioArea from './PortfolioArea'
// Testimonials section removed: placeholder/unverifiable testimonials (E-E-A-T). Re-add with real proof.
import ContactArea from './ContactArea'
import FooterOne from '@/layouts/footers/FooterOne'



export default function Home() {
  return (
    <>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <HeroArea />
            <AboutArea />
            <ServiceArea />
            <PortfolioArea />
            <ContactArea />
          </main>
          <FooterOne />
        </div>
      </div> 
    </>
  )
}
