
import React from 'react'
import HeroArea from './HeroArea'
// import BrandArea from './BrandArea'
import AboutArea from './AboutArea'
import ServiceArea from './ServiceArea'
import HeaderOne from '@/layouts/headers/HeaderOne'
import PortfolioArea from './PortfolioArea'
// import TestimonoalArea from './TestimonoalArea' // removed: placeholder/unverifiable testimonials (E-E-A-T). Re-add with real proof.
// import BlogArea from './BlogArea'
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
            {/*<BrandArea />*/}
            <AboutArea />
            <ServiceArea />
            <PortfolioArea />
            {/* <TestimonoalArea /> removed — testimonials were placeholder/unverifiable (E-E-A-T). Re-add real proof later. */}
            {/*<BlogArea />*/}
            <ContactArea />
          </main>
          <FooterOne />
        </div>
      </div> 
    </>
  )
}
