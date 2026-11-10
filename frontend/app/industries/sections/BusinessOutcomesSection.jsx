'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const defaultIcons = [
  '/asstes/images/icon/the-challenge-img.png',
  '/asstes/images/icon/cogwheel-icon-img.png',
  '/asstes/images/icon/insight-icon-img.png',
  '/asstes/images/icon/ouality-check-icon-img.png',
  '/asstes/images/icon/deliver-icon-img.png',
];

export default function BusinessOutcomesSection({ outcomes = [], kicker, heading, description }) {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current || outcomes.length === 0) return;

    swiperInstanceRef.current = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 16,
      grabCursor: true,
      loop: outcomes.length > 3,
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
          slidesPerView: 2.2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3.2,
          spaceBetween: 22,
        },
        1200: {
          slidesPerView: 3.5,
          spaceBetween: 24,
        },
      },
    });

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
      }
    };
  }, [outcomes]);

  if (!outcomes || outcomes.length === 0) return null;

  return (
    <section className="business-outcomes-section" id="business-outcomes">
      <div className="srcn-container">
        <div className="outcomes-header section-header-area">
          <span className="outcomes-kicker career-values-kicker">{kicker || 'BUSINESS OUTCOMES'}</span>
          <h2 className="outcomes-heading section-main-heading">{heading || 'Research That Moves Businesses Forward'}</h2>
          <p className="outcomes-desc industries-expertise-desc">
            {description || 'We help businesses make confident decisions, unlock new opportunities and achieve measurable growth through reliable research and market insights.'}
          </p>
        </div>

        <div className="common-swiper-box">
          <div className="swiper outcomes-swiper" ref={sliderRef}>
            <div className="swiper-wrapper">
              {outcomes.map((item, index) => (
                <div key={item.id || index} className="swiper-slide outcomes-slide">
                  <article className="outcome-card">
                    <div className="outcome-icon-wrap">
                      <img src={item.icon || item.iconClass || defaultIcons[index % defaultIcons.length]} alt={item.title} loading="lazy" />
                    </div>
                    <h3 className="outcome-title">{item.title}</h3>
                    <p className="outcome-desc">{item.desc || item.description}</p>
                  </article>
                </div>
              ))}
            </div>
            <div className="outcomes-pagination" ref={paginationRef}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
