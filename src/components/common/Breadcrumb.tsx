import React from 'react'

export default function Breadcrumb({ title, style_2, style_3, style_4 }: any) {
  return (
    <>
      <section className="single-page-hero-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <h2>{title}</h2>
              {style_2 &&
                <p>Kumpulan karya dan pencapaian terbaru saya: temukan proyek-proyek yang mencerminkan passion dan keahlian saya dalam membangun solusi digital.</p>
              }
              {style_3 &&
                <p>Isi formulir di bawah untuk menghubungi saya. Saya selalu antusias mendengar peluang baru dan akan berusaha merespons dalam 24 jam.</p>
              }
              {style_4 &&
                <p>Cerita, tips, dan inspirasi untuk pikiran yang selalu ingin tahu</p>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
