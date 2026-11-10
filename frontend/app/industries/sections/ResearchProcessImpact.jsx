'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const defaultIcons = [
  '/asstes/images/icon/understand-clipboard-tick-icon-img.png',
  '/asstes/images/icon/design-brush-ion-img.png',
  '/asstes/images/icon/research-presention-chart-icon-img.png',
  '/asstes/images/icon/analyze-chart-icon-img.png',
  '/asstes/images/icon/deliver-icon-img.png',
  '/asstes/images/icon/ouality-check-icon-img.png',
];

export default function ResearchProcessImpact({ steps = [], kicker, heading, description }) {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current || steps.length === 0) return;

    swiperInstanceRef.current = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 16,
      grabCursor: true,
      loop: steps.length > 3,
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
  }, [steps]);

  if (!steps || steps.length === 0) return null;

  return (
    <section className="telephonic-process-area" id="research-process-impact">
      <div className="telephonic-process-container">
        <div className="telephonic-process-header">
          <span className="telephonic-process-eyebrow">{kicker || 'RESEARCH PROCESS'}</span>
          <h2 className="telephonic-process-main-heading">{heading || 'Structured Research. Meaningful Impact.'}</h2>
          <p className="telephonic-process-sub-heading">
            {description || 'A structured approach ensures that every industry study is executed with rigor, precision, and alignment with client priorities.'}
          </p>
        </div>

        <div className="common-swiper-box">
          <div className="swiper telephonic-process-slider" ref={sliderRef}>
            <div className="swiper-wrapper">
              {steps.map((step, index) => (
                <div key={step.id || index} className="swiper-slide telephonic-process-slide">
                  <article className="telephonic-process-card">
                    <span className="telephonic-process-number">
                      {step.num || (index < 9 ? `0${index + 1}` : index + 1)}
                    </span>
                    <div className="telephonic-process-icon">
                      <img src={step.icon || step.iconClass || defaultIcons[index % defaultIcons.length]} alt={step.title} loading="lazy" />
                    </div>
                    <div className="telephonic-process-content">
                      <h3 className="telephonic-process-card-heading">{step.title}</h3>
                      <p className="telephonic-process-desc">{step.desc || step.description}</p>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            <div
              className="telephonic-process-pagination telephonic-process-dots"
              ref={paginationRef}
              aria-label="Process pagination"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
