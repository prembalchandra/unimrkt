'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function ResearchMethodologies({ steps = [], kicker = null, heading = null, description = null, dynamicSection = null }) {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);

  const displayKicker = dynamicSection?.kicker || kicker;
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || heading;
  const displayDesc = dynamicSection?.description || description;
  const list = dynamicSection?.cards || dynamicSection?.values || (steps && steps.length > 0 ? steps : []);

  useEffect(() => {
    if (!sliderRef.current || list.length === 0) return;

    const swiperInstance = new Swiper(sliderRef.current, {
      modules: [Pagination, Autoplay],
      slideClass: 'research-methodologies-col',
      wrapperClass: 'research-methodologies-grid',
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 16,
      loop: list.length > 3,
      speed: 650,
      grabCursor: true,
      observer: true,
      observeParents: true,
      watchOverflow: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      pagination: {
        el: paginationRef.current,
        clickable: true,
      },
      breakpoints: {
        320: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 16 },
        580: { slidesPerView: 1.8, slidesPerGroup: 1, spaceBetween: 18 },
        768: { slidesPerView: 2.3, slidesPerGroup: 1, spaceBetween: 20 },
        992: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 24 },
        1200: { slidesPerView: 3.5, slidesPerGroup: 1, spaceBetween: 26 },
      },
    });

    return () => {
      swiperInstance.destroy(true, true);
    };
  }, [list]);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="research-methodologies-section">
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <div className="research-methodologies-header">
            {displayKicker && (
              <span className="research-methodologies-sub-title">
                {displayKicker}
              </span>
            )}
            {displayHeading && (
              <h2 className="research-methodologies-main-heading">
                {displayHeading}
              </h2>
            )}
            {displayDesc && (
              <p className="research-methodologies-title">
                {displayDesc}
              </p>
            )}
          </div>
        )}

        {list.length > 0 && (
          <div className="common-swiper-box">
            <div className="swiper research-methodologies-slider" ref={sliderRef}>
              <div className="research-methodologies-grid">
                {list.map((item, index) => (
                  <article className="research-methodologies-col" key={item.id || index}>
                    <div className="research-methodologies-card">
                      <span className="methodology-step-number">
                        {item.num || item.iconClass || (index < 9 ? `0${index + 1}` : `${index + 1}`)}
                      </span>
                      <div className="research-methodologies-content">
                        {item.title && <h3 className="methodology-step-title">{item.title}</h3>}
                        {(item.desc || item.description) && (
                          <p className="methodology-step-description">{item.desc || item.description}</p>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div
                className="research-methodologies-pagination"
                ref={paginationRef}
                aria-label="Methodologies pagination"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
