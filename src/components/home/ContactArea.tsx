"use client"
import React, { useState } from 'react'

// Single source of truth for contact details (keep in sync with FooterOne + Person schema).
const WA_NUMBER = '62818846228'; // 0818846228 in international format
const WA_DISPLAY = '+62 818-846-228';
const EMAIL = 'oksasatyaa@gmail.com';
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

export default function ContactArea() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  // No backend by design — the message is routed to WhatsApp with a prefilled text.
  const composeWaHref = () => {
    const lines = [
      `Halo Oksa, saya ${name || '[nama]'}.`,
      subject ? `Perihal: ${subject}` : '',
      message ? `\n${message}` : '',
      email ? `\nEmail saya: ${email}` : '',
    ].filter(Boolean);
    return `${WA_BASE}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(composeWaHref(), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <>
      <section id="contact" className="contact-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="section-title text-white wow fadeInUp delay-0-2s">
                <h2>Hubungi Saya</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>
                  Lebih cepat? Chat langsung via WhatsApp — biasanya saya balas dalam &lt;24 jam.
                </p>
                <a
                  href={WA_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-btn"
                  style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  <i className="ri-whatsapp-line" aria-hidden></i> Chat WhatsApp
                </a>
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
                    <i className="ri-whatsapp-line"></i>
                  </span>
                  <h2>WhatsApp:</h2>
                  <p>
                    <a href={WA_BASE} target="_blank" rel="noopener noreferrer">{WA_DISPLAY}</a>
                  </p>
                </div>
                <div className="single-contact wow fadeInUp" data-wow-delay=".6s">
                  <span className="circle-btn">
                    <i className="ri-mail-line"></i>
                  </span>
                  <h2>Email:</h2>
                  <p>
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </p>
                </div>
                <div className="single-contact wow fadeInUp" data-wow-delay=".6s">
                  <h2>Media Sosial</h2>
                  <div className="about-social">
                    <ul>
                      <li><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/oksastya/"><i className="ri-facebook-circle-fill"></i></a></li>
                      <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/oksastya/"><i className="ri-linkedin-fill"></i></a></li>
                      <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/oksasatya"><i className="ri-github-line"></i></a></li>
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
                          Kirim via WhatsApp <i className="ri-whatsapp-line"></i>
                        </button>
                        <a href={`mailto:${EMAIL}`} style={{ marginLeft: 16, color: 'rgba(255,255,255,0.7)' }}>
                          atau kirim email
                        </a>
                      </div>
                    </div>
                    {sent && (
                      <div className="col-md-12 text-center">
                        <p className="input-success" role="status">
                          WhatsApp terbuka dengan pesan Anda — tinggal tekan kirim. Jika tidak terbuka,{' '}
                          <a href={WA_BASE} target="_blank" rel="noopener noreferrer">chat di sini</a>.
                        </p>
                      </div>
                    )}
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
