'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const ecosystemSlides = [
  {
    num: '01.',
    title: 'Mobility',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
        <path d="M5 17H3v-4l2-5h10l2 5v4h-2" />
        <path d="M7 8V6a5 5 0 0 1 10 0v2" />
        <circle cx="12" cy="3" r="1.2" fill="#ba2327" stroke="none" />
      </svg>
    ),
  },
  {
    num: '02.',
    title: 'Automobile Manufacturing',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17h18M6 17v-3l2-4h8l2 4v3" />
        <circle cx="8" cy="17" r="2" />
        <circle cx="16" cy="17" r="2" />
        <path d="M12 2v5m-3-2l3 2 3-2" stroke="#ba2327" />
        <path d="M4 3h16" />
      </svg>
    ),
  },
  {
    num: '03.',
    title: 'Two-Wheeler & Three-Wheeler Vehicles',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5.5" cy="16.5" r="3.5" />
        <circle cx="18.5" cy="16.5" r="3.5" />
        <path d="M12 16.5V11l3-4h3M5.5 16.5l3.5-5.5h5l2.5 5.5" />
        <path d="M15 7h4" stroke="#ba2327" />
      </svg>
    ),
  },
  {
    num: '04.',
    title: 'Automobile Technology',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="8" rx="2" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="17" cy="19" r="2" />
        <path d="M5 11l2-5h10l2 5" />
        <path d="M9 3a5 5 0 0 1 6 0M10 5a3 3 0 0 1 4 0" stroke="#ba2327" />
      </svg>
    ),
  },
  {
    num: '05.',
    title: 'Accessories',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        <path d="M8 16l4-4" stroke="#ba2327" />
      </svg>
    ),
  },
  {
    num: '06.',
    title: 'Commercial & Fleet Mobility',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="5" width="15" height="11" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    num: '07.',
    title: 'Aftermarket & Dealerships',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 6l4 4-8 8H6v-4l8-8z" />
        <circle cx="16" cy="6" r="3" />
        <path d="M4 20h16" stroke="#ba2327" />
      </svg>
    ),
  },
];

export default function AutomotiveEcosystemSlider() {
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
        // Mobile phone: 1 full card view
        0: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        520: {
          slidesPerView: 1.25,
          spaceBetween: 18,
        },
        720: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },
        960: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4.5,
          spaceBetween: 20,
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
    <section className="auto-ecosystem-section" id="auto-ecosystem">
      <div className="auto-ecosystem-container">
        <div className="auto-ecosystem-header">
          <span className="auto-ecosystem-kicker">OUR EXPERTISE</span>
          <h2 className="auto-ecosystem-heading">Expertise Across The Automotive Ecosystem</h2>
        </div>
        <div className='common-swiper-box'>
          <div className="swiper auto-ecosystem-swiper" ref={sliderRef}>
            <div className="swiper-wrapper">
              {ecosystemSlides.map((slide, idx) => (
                <div key={idx} className="swiper-slide auto-ecosystem-slide">
                  <article className="auto-ecosystem-card">
                    <span className="auto-eco-number">{slide.num}</span>
                    <div className="auto-eco-bottom-wrap">
                      <div className="auto-eco-icon-svg" aria-hidden="true">
                        {slide.icon}
                      </div>
                      <h3 className="auto-eco-title">{slide.title}</h3>
                    </div>
                  </article>
                </div>
              ))}
            </div>
            <div className="auto-ecosystem-pagination" ref={paginationRef}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
