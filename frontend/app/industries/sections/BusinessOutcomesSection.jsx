'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { getStrapiMedia } from '@/lib/strapi';

export default function BusinessOutcomesSection({ outcomes = [], kicker = null, heading = null, description = null, dynamicSection = null }) {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  const displayKicker = dynamicSection?.kicker || kicker;
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || heading;
  const displayDesc = dynamicSection?.description || description;
  const list = dynamicSection?.values || dynamicSection?.cards || (outcomes && outcomes.length > 0 ? outcomes : []);

  useEffect(() => {
    if (!sliderRef.current || list.length === 0) return;

    swiperInstanceRef.current = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 16,
      grabCursor: true,
      loop: list.length > 3,
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
        0: { slidesPerView: 1, spaceBetween: 16 },
        576: { slidesPerView: 1.5, spaceBetween: 18 },
        768: { slidesPerView: 2.3, spaceBetween: 20 },
        1024: { slidesPerView: 3.3, spaceBetween: 24 },
        1280: { slidesPerView: 3.5, spaceBetween: 26 },
      },
    });

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
      }
    };
  }, [list]);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="business-outcomes-section" id="business-outcomes">
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <div className="outcomes-header section-header-area">
            {displayKicker && <span className="outcomes-kicker career-values-kicker">{displayKicker}</span>}
            {displayHeading && <h2 className="outcomes-heading section-main-heading">{displayHeading}</h2>}
            {displayDesc && <p className="outcomes-desc industries-expertise-desc">{displayDesc}</p>}
          </div>
        )}

        {list.length > 0 && (
          <div className="common-swiper-box">
            <div className="swiper outcomes-slider" ref={sliderRef}>
              <div className="swiper-wrapper">
                {list.map((item, index) => {
                  const iconSrc = getStrapiMedia(item.icon || item.image);
                  return (
                    <div key={item.id || index} className="swiper-slide outcomes-slide">
                      <article className="outcome-card">
                        {iconSrc && (
                          <div className="outcome-icon-wrap">
                            <img src={iconSrc} alt={item.title || ''} loading="lazy" />
                          </div>
                        )}
                        {item.title && <h3 className="outcome-title">{item.title}</h3>}
                        {(item.desc || item.description) && (
                          <p className="outcome-desc">{item.desc || item.description}</p>
                        )}
                      </article>
                    </div>
                  );
                })}
              </div>

              <div
                className="outcomes-pagination"
                ref={paginationRef}
                aria-label="Outcomes pagination"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
