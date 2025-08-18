"use client"
import Link from "next/link";
import UseSticky from "@/hooks/UseSticky";
import NavMenu from "./NavMenu"; 
import { useState } from "react";
import Sidebar from "@/components/common/Sidebar";

export default function HeaderOne() {

  const { sticky } = UseSticky()
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={`main-header ${sticky ? 'fixed-header' : ''}`}>
        <div className="header-upper">
          <div className="container">
            <div className="header-inner">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-12 d-lg-block">
                  <div className="logo-area">
                    <div className="logo d-lg-block d-flex justify-content-center">
                      <Link href="/"><img src="/assets/images/logo.png" alt="" /></Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-10 d-none d-lg-block">
                  <div className="main-menu">
                    <nav className="desktop-menu-nav">
                      <NavMenu />
                    </nav>
                  </div>
                </div>
              </div>
              {/* Mobile hamburger button pinned top-right */}
              <div className="side-menu-icon d-lg-none">
                <a style={{ cursor: "pointer" }} onClick={() => setOpen(!open)} className="info-toggle-btn f-right sidebar-toggle-btn"><i className="fal fa-bars"></i></a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Sidebar open={open} setOpen={setOpen} />
    </>
  )
}
