'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { getStrapiMedia } from '@/lib/strapi';

export default function CompanyOurResearchEcosystem({ processSteps = [], heading = null, kicker = null, description = null, dynamicSection = null }) {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  const displayKicker = dynamicSection?.kicker || kicker;
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || heading;
  const displayDesc = dynamicSection?.description || description;
  const list = dynamicSection?.cards || dynamicSection?.values || (processSteps && processSteps.length > 0 ? processSteps : []);

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
    <section className="telephonic-process-area company-ecosystem-section" id="research-process-impact">
      <div className="telephonic-process-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <div className="telephonic-process-header">
            {displayKicker && <span className="telephonic-process-eyebrow">{displayKicker}</span>}
            {displayHeading && <h2 className="telephonic-process-main-heading">{displayHeading}</h2>}
            {displayDesc && <p className="telephonic-process-sub-heading">{displayDesc}</p>}
          </div>
        )}

        {list.length > 0 && (
          <div className="common-swiper-box">
            <div className="swiper telephonic-process-slider" ref={sliderRef}>
              <div className="swiper-wrapper">
                {list.map((step, index) => {
                  const iconSrc = getStrapiMedia(step.icon || step.image);
                  return (
                    <div key={step.id || index} className="swiper-slide telephonic-process-slide">
                      <article className="telephonic-process-card">
                        <span className="telephonic-process-number">
                          {step.num || (index < 9 ? `0${index + 1}` : index + 1)}
                        </span>
                        {iconSrc && (
                          <div className="telephonic-process-icon">
                            <img src={iconSrc} alt={step.title || ''} loading="lazy" />
                          </div>
                        )}
                        <div className="telephonic-process-content">
                          {step.title && <h3 className="telephonic-process-card-heading">{step.title}</h3>}
                          {(step.desc || step.description) && (
                            <p className="telephonic-process-desc">{step.desc || step.description}</p>
                          )}
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>

              <div
                className="telephonic-process-pagination telephonic-process-dots"
                ref={paginationRef}
                aria-label="Process pagination"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
