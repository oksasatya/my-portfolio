import React from 'react'
import Image from 'next/image'

type Skill = {
  name: string
  src: string
  size: number
  delay: string
  alt: string
}

const skills: Skill[] = [
  { name: 'GO', alt: 'Go programming language logo', src: 'https://img.icons8.com/color/48/golang.png', size: 48, delay: 'delay-0-2s' },
  { name: 'Java', alt: 'Java programming language logo', src: 'https://img.icons8.com/color/50/java-coffee-cup-logo--v1.png', size: 50, delay: 'delay-0-3s' },
  { name: 'Next Js', alt: 'Next.js logo', src: 'https://img.icons8.com/color/50/nextjs.png', size: 50, delay: 'delay-0-4s' },
  { name: 'Tailwind', alt: 'Tailwind CSS logo', src: 'https://img.icons8.com/color/50/tailwind_css.png', size: 50, delay: 'delay-0-5s' },
  { name: 'Nuxt Js', alt: 'Nuxt.js logo', src: 'https://img.icons8.com/color/50/nuxt-jc.png', size: 50, delay: 'delay-0-2s' },
  { name: 'Laravel', alt: 'Laravel logo', src: 'https://img.icons8.com/windows/50/laravel.png', size: 50, delay: 'delay-0-3s' },
  { name: 'Python', alt: 'Python programming language logo', src: 'https://img.icons8.com/color/50/python--v1.png', size: 50, delay: 'delay-0-4s' },
  { name: 'Php', alt: 'PHP programming language logo', src: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/external-hypertext-preprocessor-a-widely-used-open-source-general-purpose-scripting-language-logo-color-tal-revivo.png', size: 48, delay: 'delay-0-5s' },
]

export default function SkillArea() {
  return (
    <>
      <section id="skills" className="skill-area">
        <div className="container">
          <div className="container-inner">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <div className="section-title section-black-title mb-40 wow fadeInUp delay-0-2s">
                  <h2>Professional Skills</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="skill-items-wrap">
                  <div className="row">
                    {skills.map((skill) => (
                      <div key={skill.name} className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                        <div className={`skill-item wow fadeInUp ${skill.delay}`}>
                          <Image
                            src={skill.src}
                            alt={skill.alt}
                            width={skill.size}
                            height={skill.size}
                          />
                          <h5>{skill.name}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
