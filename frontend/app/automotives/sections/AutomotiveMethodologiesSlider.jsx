'use client';

import React, { useEffect, useRef } from 'react';
import { getStrapiMedia } from '@/lib/strapi';
import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function AutomotiveMethodologiesSlider({ methodologies = [], heading, kicker, description }) {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current || methodologies.length === 0) return;

    swiperInstanceRef.current = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination, Navigation],
      slidesPerView: 1,
      spaceBetween: 16,
      grabCursor: true,
      loop: methodologies.length > 4,
      speed: 700,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      navigation: {
        prevEl: prevBtnRef.current,
        nextEl: nextBtnRef.current,
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
          slidesPerView: 1.15,
          spaceBetween: 14,
        },
        560: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2.8,
          spaceBetween: 18,
        },
        1024: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 22,
        },
      },
    });

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
      }
    };
  }, [methodologies]);

  if (!methodologies || methodologies.length === 0) return null;

  return (
    <section className="auto-methods-dark-section" id="auto-methods">
      <div className="srcn-container">
        {/* Dark Curved Hero Banner */}
        <div className="auto-methods-dark-banner">
          <div className="auto-methods-header">
            <span className="auto-methods-kicker">{kicker}</span>
            <h2 className="auto-methods-heading">{heading}</h2>
            <p className="auto-methods-desc">
              {description}
            </p>
          </div>
        </div>

        {/* Overlapping Slider with Side Navigation Arrows */}
        <div className="auto-methods-carousel-wrap">
          {/* Left Navigation Arrow */}
          <button
            ref={prevBtnRef}
            className="auto-methods-nav-btn auto-methods-prev"
            aria-label="Previous slide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Swiper Slider */}
          <div className="swiper auto-methods-swiper" ref={sliderRef}>
            <div className="swiper-wrapper">
              {methodologies.map((item, idx) => (
                <div key={item.id || idx} className="swiper-slide auto-methods-slide">
                  <article className="auto-method-card">
                    <div className="auto-method-img-wrap">
                      <img src={item.image || item.iconClass || getStrapiMedia('/uploads/online-surveys-card-img.png')} alt={item.title} loading="lazy" />
                    </div>
                    <div className="auto-method-body">
                      <h3 className="auto-method-title">{item.title}</h3>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Right Navigation Arrow */}
          <button
            ref={nextBtnRef}
            className="auto-methods-nav-btn auto-methods-next"
            aria-label="Next slide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Pagination Indicators */}
          <div className="auto-methods-pagination" ref={paginationRef}></div>
        </div>
      </div>
    </section>
  );
}
