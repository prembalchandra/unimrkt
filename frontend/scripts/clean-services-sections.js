const fs = require('fs');
const path = require('path');

// 1. WhyChooseUs.jsx
const whyChooseUsCode = `'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function WhyChooseUs({ items = [], title = null, description = null, dynamicSection = null }) {
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || title;
  const displayDesc = dynamicSection?.description || description;
  const list = dynamicSection?.values || dynamicSection?.cards || (items && items.length > 0 ? items : []);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="why-choose-unimrkt-section">
      <div className="srcn-container">
        {(displayHeading || displayDesc) && (
          <div className="why-choose-header">
            {displayHeading && <h2 className="why-choose-title">{displayHeading}</h2>}
            {displayDesc && <p className="why-choose-desc">{displayDesc}</p>}
          </div>
        )}

        {list.length > 0 && (
          <div className="why-choose-grid">
            {list.map((item, index) => {
              const iconSrc = getStrapiMedia(item.icon || item.image);
              return (
                <article className="why-choose-card" key={item.id || index}>
                  {iconSrc && (
                    <div className="why-choose-icon-box">
                      <img
                        src={iconSrc}
                        alt={item.label || item.title || ''}
                        width={40}
                        height={40}
                        className="why-choose-icon"
                      />
                    </div>
                  )}

                  <div className="why-choose-content">
                    {(item.number || item.stat || item.title) && (
                      <span className="why-choose-stat">{item.number || item.stat || item.title}</span>
                    )}
                    {(item.label || item.desc || item.description) && (
                      <span className="why-choose-label">{item.label || item.desc || item.description}</span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
`;
fs.writeFileSync(path.join(__dirname, '../app/services/sections/WhyChooseUs.jsx'), whyChooseUsCode);

// 2. ServicesWorkflow.jsx
const servicesWorkflowCode = `'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { getStrapiMedia } from '@/lib/strapi';
import 'swiper/css';
import 'swiper/css/pagination';

export default function ServicesWorkflow({ processSteps = [], heading = null, description = null, dynamicSection = null }) {
  const slidersRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  const displayHeading = dynamicSection?.heading || dynamicSection?.title || heading;
  const displayDesc = dynamicSection?.description || description;
  const list = dynamicSection?.cards || dynamicSection?.values || (processSteps && processSteps.length > 0 ? processSteps : []);

  useEffect(() => {
    if (!slidersRef.current || list.length === 0) return;

    swiperInstanceRef.current = new Swiper(slidersRef.current, {
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
          return \`<span class="\${className}" role="button" aria-label="Go to slide \${index + 1}"></span>\`;
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
    <section className="telephonic-process-area services-workflow-section" id="research-process-impact">
      <div className="telephonic-process-container">
        {(displayHeading || displayDesc) && (
          <div className="telephonic-process-header">
            {displayHeading && <h2 className="telephonic-process-main-heading">{displayHeading}</h2>}
            {displayDesc && <p className="telephonic-process-sub-heading">{displayDesc}</p>}
          </div>
        )}

        {list.length > 0 && (
          <div className="common-swiper-box">
            <div className="swiper telephonic-process-slider" ref={slidersRef}>
              <div className="swiper-wrapper">
                {list.map((step, index) => {
                  const iconSrc = getStrapiMedia(step.icon || step.image);
                  return (
                    <div key={step.id || index} className="swiper-slide telephonic-process-slide">
                      <article className="telephonic-process-card">
                        <span className="telephonic-process-number">
                          {step.num || (index < 9 ? \`0\${index + 1}\` : index + 1)}
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
`;
fs.writeFileSync(path.join(__dirname, '../app/services/sections/ServicesWorkflow.jsx'), servicesWorkflowCode);

// 3. ServicesAboutOverview.jsx
const servicesAboutOverviewCode = `'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function ServicesAboutOverview({ dynamicOverview = null }) {
  if (!dynamicOverview) return null;

  const kicker = dynamicOverview.kicker;
  const title = dynamicOverview.title || dynamicOverview.heading;
  const desc = dynamicOverview.description;
  const image = getStrapiMedia(dynamicOverview.image);

  if (!title && !desc) return null;

  return (
    <section className="telephonic-overview-section">
      <div className="srcn-container">
        <div className="telephonic-overview-grid">
          <div className="telephonic-overview-content">
            {kicker && <span className="telephonic-overview-kicker sub-title-red">{kicker}</span>}
            {title && <h2 className="telephonic-overview-title">{title}</h2>}
            {desc && (
              <div className="abou-Primary-overview">
                <p>{desc}</p>
              </div>
            )}
          </div>

          {image && (
            <div className="telephonic-overview-visual-wrap">
              <div className="telephonic-overview-figure abou-Primary-img">
                <img src={image} alt={title || ''} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(path.join(__dirname, '../app/services/sections/ServicesAboutOverview.jsx'), servicesAboutOverviewCode);

// 4. ServicesFaq.jsx
const servicesFaqCode = `'use client';

import React, { useState } from 'react';

export default function ServicesFaq({ faqs = [], dynamicFaq = null }) {
  const [openIndex, setOpenIndex] = useState(null);

  const displayHeading = dynamicFaq?.heading || dynamicFaq?.title;
  const displayKicker = dynamicFaq?.kicker;

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const list = (dynamicFaq?.items && dynamicFaq.items.length > 0) ? dynamicFaq.items : faqs;
  if (!list || list.length === 0) return null;

  return (
    <section className="faq-section-area">
      <div className="srcn-container">
        {(displayKicker || displayHeading) && (
          <div className="section-header-area">
            {displayKicker && <span className="career-values-kicker">{displayKicker}</span>}
            {displayHeading && <h2 className="section-main-heading">{displayHeading}</h2>}
          </div>
        )}

        <div className="faq-accordion-container">
          {list.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id || index}
                className={\`faq-accordion-item \${isOpen ? 'active' : ''}\`}
              >
                <div
                  className="faq-accordion-header"
                  onClick={() => toggleAccordion(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon-indicator" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
                {isOpen && (
                  <div className="faq-accordion-body">
                    <p className="faq-accordion-answer">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(path.join(__dirname, '../app/services/sections/ServicesFaq.jsx'), servicesFaqCode);

console.log('All services sections cleaned successfully!');
