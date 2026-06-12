import React from 'react'

export default function FooterOne() {
  return (
    <>
      <footer className="main-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-top">
                <p>Punya proyek yang ingin dikerjakan?</p>
                <h2><a href="https://wa.me/62818846228" target="_blank" rel="noopener noreferrer">ayo kerja sama</a></h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-sm-6">
              <p className="copy-left-text">Oksa Satya®</p>
            </div>
            <div className="col-lg-6 col-sm-6">
              <p className="copy-right-text">© Hak Cipta {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
