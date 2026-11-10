'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function AutomotiveSegmentsSlider({ segments = [], heading, kicker }) {
  const sliderRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current || segments.length === 0) return;

    const swiper = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 16,
      grabCursor: true,
      loop: segments.length > 3,
      speed: 700,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      pagination: {
        el: sliderRef.current.querySelector('.auto-segments-pagination'),
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        540: {
          slidesPerView: 1.15,
          spaceBetween: 18,
        },
        720: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 22,
        },
        1240: {
          slidesPerView: 3.5,
          spaceBetween: 22,
        },
      },
    });

    swiperInstanceRef.current = swiper;

    return () => {
      swiper.destroy(true, true);
      swiperInstanceRef.current = null;
    };
  }, [segments]);

  if (!segments || segments.length === 0) return null;

  return (
    <section className="auto-segments-section" id="auto-segments">
      <div className="auto-segments-container">
        <div className="auto-segments-header">
          <span className="auto-segments-kicker">{kicker || 'WHO WE SERVE'}</span>
          <h2 className="auto-segments-heading">{heading || 'Supporting Every Automotive Segment'}</h2>
        </div>
        <div className="common-swiper-box">
          <div className="swiper auto-segments-swiper" ref={sliderRef}>
            <div className="swiper-wrapper">
              {segments.map((slide, idx) => (
                <div key={slide.id || idx} className="swiper-slide auto-segments-slide">
                  <article className="auto-segment-card">
                    <h3 className="auto-segment-title">{slide.title}</h3>
                    <p className="auto-segment-desc">{slide.desc || slide.description}</p>
                    <div className="auto-segment-bottom-icon">
                      <img src={slide.icon || slide.iconClass || '/asstes/images/icon/automotive-icon-img.png'} alt={slide.title} loading="lazy" />
                    </div>
                  </article>
                </div>
              ))}
            </div>
            <div className="auto-segments-pagination" />
          </div>
        </div>
      </div>
    </section>
  );
}
