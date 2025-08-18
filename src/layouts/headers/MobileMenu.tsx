"use client"
import React, { useState } from 'react'
import menu_data from './menu_data'
import Link from 'next/link'


export default function MobileMenu() {

  const [navTitle, setNavTitle] = useState("");
  //openMobileMenu
  const openMobileMenu = (menu: string) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };


  return (
    <>

      <div className="react-menu-bar">
        <nav className="react-menu-nav">
          <ul className="react-menu-list">
            {menu_data.map((item, i) => (
              <li key={i} className={`react-menu-item ${item.has_dropdown && "has-dropdown"} ${navTitle === item.title ? "dropdown-opened" : ""}`}>
                <Link href={item.link} className="react-menu-link linkstyle">{item.title}</Link>
                {item.has_dropdown &&
                  <>
                    <ul className="react-sub-menu" style={{ display: navTitle === item.title ? "block" : "none" }}>
                      {item.sub_menus?.map((sub_menu, index) => (
                        <li key={index} className="react-sub-menu-item">
                          <Link href={sub_menu.link} className="react-sub-menu-link">{sub_menu.title}</Link>
                        </li>
                      ))}
                    </ul>
                    <a className={`react-menu-expand ${navTitle === item.title ? "expanded" : ""}`}
                      onClick={() => openMobileMenu(item.title)}
                      style={{ fontSize: "18px", cursor: "pointer" }}>
                      <i className={`fal ${navTitle === item.title ? "fa-minus" : "fa-plus"}`}></i>
                    </a>
                  </>
                }
              </li>
            ))}
          </ul>
        </nav>
      </div>

    </>
  )
}
