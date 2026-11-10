'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function ContactProcess({
  steps = [],
  title,
  description,
  kicker,
  dynamicSection = null,
}) {
  const sliderRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  const displayKicker = dynamicSection?.kicker || kicker;
  const displayTitle = dynamicSection?.heading || dynamicSection?.title || title;
  const displayDesc = dynamicSection?.description || description;

  useEffect(() => {
    if (!sliderRef.current || steps.length === 0) return;

    const swiper = new Swiper(sliderRef.current, {
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
        el: sliderRef.current.querySelector('.contact-process-pagination'),
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
  }, [steps]);

  if (!steps || steps.length === 0) return null;

  return (
    <section className="contact-process-section" id="contact-process">
      <div className="contact-process-container">
        <div className="contact-process-header">
          <span className="contact-process-kicker">
            {displayKicker}
          </span>
          <h2 className="contact-process-heading">
            {displayTitle}
          </h2>
          <p className="contact-process-description">
            {displayDesc}
          </p>
        </div>

        <div className="common-swiper-box">
          <div className="swiper contact-process-swiper" ref={sliderRef}>
            <div className="swiper-wrapper">
              {steps.map((slide, index) => (
                <div key={slide.id || index} className="swiper-slide contact-process-slide">
                  <article className="contact-process-card">
                    <span className="contact-process-number">
                      {slide.number || slide.num || (index < 9 ? `0${index + 1}` : index + 1)}
                    </span>
                    <h3 className="contact-process-title">
                      {slide.title}
                    </h3>
                    <p className="contact-process-desc">
                      {slide.desc || slide.description}
                    </p>
                  </article>
                </div>
              ))}
            </div>
            <div className="contact-process-pagination" />
          </div>
        </div>
      </div>
    </section>
  );
}
