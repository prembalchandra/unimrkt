'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const processSteps = [
  {
    num: '01',
    icon: '/asstes/images/icon/understanding-icon-img.png',
    title: 'Understand',
    desc: 'We begin by understanding your research goals, target audience, sample needs and key questions.',
  },
  {
    num: '02',
    icon: '/asstes/images/icon/front-end-programming-icon-img.png',
    title: 'Design',
    desc: 'Our research team structures the questionnaire and interview flow around the study objectives.',
  },
  {
    num: '03',
    icon: '/asstes/images/icon/recruit-icon-img.png',
    title: 'Recruit',
    desc: 'We identify and reach relevant respondents based on the agreed sample criteria.',
  },
  {
    num: '04',
    icon: '/asstes/images/icon/Interview-icon-img.png',
    title: 'Interview',
    desc: 'Trained interviewers conduct structured interviews using CATI-enabled workflows.',
  },
  {
    num: '05',
    icon: '/asstes/images/icon/ouality-check-icon-img.png',
    title: 'Quality Check',
    desc: 'Interviews and collected data undergo systematic quality checks to maintain consistency and reliability.',
  },
  {
    num: '06',
    icon: '/asstes/images/icon/deliver-icon-img.png',
    title: 'Deliver',
    desc: 'Validated datasets and research outputs are prepared for analysis and decision-making.',
  },
];

export default function TelephonicProcess() {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    swiperInstanceRef.current = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 16,
      grabCursor: true,
      loop: true,
      speed: 700,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      pagination: {
        el: paginationRef.current,
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className}" role="button" aria-label="Go to slide ${index + 1}"></span>`;
        },
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        576: {
          slidesPerView: 1.5,
          spaceBetween: 18,
        },
        768: {
          slidesPerView: 2.3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3.3,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 3.5,
          spaceBetween: 26,
        },
      },
    });

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
      }
    };
  }, []);

  return (
    <section className="telephonic-process-area" id="telephonic-process">
      <div className="telephonic-process-container">
        <div className="telephonic-process-header">
          <span className="telephonic-process-eyebrow">
            OUR TELEPHONIC SURVEY PROCESS
          </span>
          <h2 className="telephonic-process-main-heading">
            From Research Brief To Reliable Insights
          </h2>
        </div>
<div className='common-swiper-box'>
        <div className="swiper telephonic-process-slider" ref={sliderRef}>
          <div className="swiper-wrapper">
            {processSteps.map((step) => (
              <div key={step.num} className="swiper-slide telephonic-process-slide">
                <article className="telephonic-process-card">
                  <span className="telephonic-process-number">
                    {step.num}
                  </span>
                  <div className="telephonic-process-icon">
                    <img src={step.icon} alt={step.title} loading="lazy" />
                  </div>
                  <div className="telephonic-process-content">
                    <h3 className="telephonic-process-card-heading">
                      {step.title}
                    </h3>
                    <p className="telephonic-process-desc">
                      {step.desc}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div
            className="telephonic-process-pagination telephonic-process-dots"
            ref={paginationRef}
            aria-label="Telephonic survey process pagination"
          />
        </div>
        </div>
      </div>
    </section>
  );
}
