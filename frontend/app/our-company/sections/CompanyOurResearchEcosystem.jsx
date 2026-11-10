'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const defaultIcons = [
  '/asstes/images/icon/understanding-icon-img.png',
  '/asstes/images/icon/front-end-programming-icon-img.png',
  '/asstes/images/icon/recruit-icon-img.png',
  '/asstes/images/icon/Interview-icon-img.png',
  '/asstes/images/icon/deliver-icon-img.png',
];

export default function CompanyOurResearchEcosystem({ processSteps = [], heading, kicker, description }) {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current || processSteps.length === 0) return;

    swiperInstanceRef.current = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 16,
      grabCursor: true,
      loop: processSteps.length > 3,
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
  }, [processSteps]);

  if (!processSteps || processSteps.length === 0) return null;

  return (
    <section className="telephonic-process-area" id="telephonic-process">
      <div className="telephonic-process-container">
        <div className="telephonic-process-header">
          <span className="telephonic-process-eyebrow">
            {kicker || 'OUR RESEARCH ECOSYSTEM'}
          </span>
          <h2 className="telephonic-process-main-heading">
            {heading || 'From Question To Business Decision'}
          </h2>
          <p className="telephonic-process-sub-heading">
            {description || 'A highly visual interactive journey:'}
          </p>
        </div>

        <div className="common-swiper-box">
          <div className="swiper telephonic-process-slider" ref={sliderRef}>
            <div className="swiper-wrapper">
              {processSteps.map((step, idx) => (
                <div key={step.id || idx} className="swiper-slide telephonic-process-slide">
                  <article className="telephonic-process-card">
                    <span className="telephonic-process-number">
                      {step.num || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`)}
                    </span>
                    <div className="telephonic-process-icon">
                      <img src={step.icon || step.iconClass || defaultIcons[idx % defaultIcons.length]} alt={step.title} loading="lazy" />
                    </div>
                    <div className="telephonic-process-content">
                      <h3 className="telephonic-process-card-heading">
                        {step.title}
                      </h3>
                      <p className="telephonic-process-desc">
                        {step.desc || step.description}
                      </p>
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
