
import React from 'react'
import ServiceArea from '../home/ServiceArea'
import Breadcrumb from '../common/Breadcrumb'
import FooterOne from '@/layouts/footers/FooterOne'
import HeaderOne from '@/layouts/headers/HeaderOne'

export default function Service() {
  return (
    <>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Breadcrumb title="Jasa Pembuatan Website, Aplikasi & Sistem" />
            <ServiceArea />
          </main>
          <FooterOne />
        </div>
      </div>
    </>
  )
}
