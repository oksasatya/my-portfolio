"use client"
import React, { useState } from 'react'

export default function ContactArea() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, subject, message });
  };

  return (
    <>
      <section id="contact" className="contact-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="section-title text-white wow fadeInUp delay-0-2s">
                <h2>Hubungi Saya</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="contact-content-part wow fadeInUp delay-0-2s">
                <div className="single-contact wow fadeInUp" data-wow-delay=".2s">
                  <span className="circle-btn">
                    <i className="ri-map-pin-line"></i>
                  </span>
                  <h2>Lokasi:</h2>
                  <p>Dubai, Uni Emirat Arab</p>
                </div>
                <div className="single-contact wow fadeInUp" data-wow-delay=".4s">
                  <span className="circle-btn">
                    <i className="ri-headphone-line"></i>
                  </span>
                  <h2>Nomor Telepon:</h2>
                  <p>+62818846228</p>
                </div>
                <div className="single-contact wow fadeInUp" data-wow-delay=".6s">
                  <span className="circle-btn">
                    <i className="ri-mail-line"></i>
                  </span>
                  <h2>Email:</h2>
                  <p>oksasatyaa@gmail.com</p>
                </div>
                <div className="single-contact wow fadeInUp" data-wow-delay=".6s">
                  <h2>Media Sosial</h2>
                  <div className="about-social">
                    <ul>
                      <li><a target="_blank" href="https://www.facebook.com/oksastya/"><i className="ri-facebook-circle-fill"></i></a></li>
                      <li><a target="_blank" href="https://www.linkedin.com/in/oksastya/"><i className="ri-linkedin-fill"></i></a></li>
                      <li><a target="_blank" href="https://github.com/oksasatya"><i className="ri-github-line"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="contact-form contact-form-area wow fadeInUp delay-0-4s">
                <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">Nama Lengkap</label>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Budi Santoso"
                          required
                          data-error="Masukkan nama Anda"
                        />
                        <label htmlFor="name" className="for-icon"><i className="far fa-user"></i></label>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Alamat Email</label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="halo@namaanda.com"
                          required
                          data-error="Masukkan email Anda"
                        />
                        <label htmlFor="email" className="for-icon"><i className="far fa-envelope"></i></label>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="subject">Subjek</label>
                        <input
                          type="text"
                          id="subject"
                          className="form-control"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Subjek pesan Anda"
                          required
                          data-error="Masukkan subjek pesan"
                        />
                        <label htmlFor="subject" className="for-icon"><i className="far fa-user"></i></label>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="message">Pesan Anda</label>
                        <textarea
                          name="message"
                          id="message"
                          className="form-control"
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tulis pesan Anda di sini"
                          required
                          data-error="Tulis pesan Anda"
                        ></textarea>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-0">
                        <button type="submit" className="theme-btn">
                          Kirim Pesan <i className="ri-mail-line"></i>
                        </button>
                        <div id="msgSubmit" className="hidden"></div>
                      </div>
                    </div>
                    <div className="col-md-12 text-center">
                      <p className="input-success">Pesan Anda telah diterima, kami akan segera menghubungi Anda!</p>
                      <p className="input-error">Maaf, pesan gagal terkirim! Silakan coba lagi.</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
