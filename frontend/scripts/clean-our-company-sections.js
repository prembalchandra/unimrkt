const fs = require('fs');
const path = require('path');

// 1. CompanyOurResearchEcosystem.jsx
const ecosystemCode = `'use client';

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
fs.writeFileSync(path.join(__dirname, '../app/our-company/sections/CompanyOurResearchEcosystem.jsx'), ecosystemCode);

// 2. CompnayOurValues.jsx
const ourValuesCode = `'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function CompnayOurValues({ values = [], kicker = null, heading = null, description = null, dynamicSection = null }) {
  const displayKicker = dynamicSection?.kicker || kicker;
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || heading;
  const displayDesc = dynamicSection?.description || description;
  const list = dynamicSection?.values || dynamicSection?.cards || (values && values.length > 0 ? values : []);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="our-unimrkt-research-area">
      <div className="our-unimrkt-research-banner" aria-hidden="true" />
      <div className="srcn-container">
        <div className="our-unimrkt-research-wrapper-inner">
          {(displayKicker || displayHeading || displayDesc) && (
            <div className="our-unimrkt-research-top-content primary-services-header">
              {displayKicker && <span className="our-unimrkt-research-sub-title">{displayKicker}</span>}
              {displayHeading && <h2 className="our-unimrkt-research-main-heading section-main-heading">{displayHeading}</h2>}
              {displayDesc && <p className="our-unimrkt-research-title">{displayDesc}</p>}
            </div>
          )}

          {list.length > 0 && (
            <div className="our-values-grid">
              {list.map((item, index) => {
                const iconSrc = getStrapiMedia(item.icon || item.image);
                return (
                  <div className="our-unimrkt-research-card-col" key={item.id || index}>
                    <div className="our-unimrkt-research-card">
                      {iconSrc && (
                        <div className="our-unimrkt-research-icon-box">
                          <img src={iconSrc} alt={item.title || ''} loading="lazy" />
                        </div>
                      )}
                      <div className="our-unimrkt-research-content">
                        {item.title && <h3>{item.title}</h3>}
                        {(item.desc || item.description) && <p>{item.desc || item.description}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(path.join(__dirname, '../app/our-company/sections/CompnayOurValues.jsx'), ourValuesCode);

// 3. CompanyOverview.jsx
const companyOverviewCode = `'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function CompanyOverview({ pillars = [], kicker = null, heading = null, description = null, dynamicSection = null }) {
  const displayKicker = dynamicSection?.kicker || kicker;
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || heading;
  const displayDesc = dynamicSection?.description || description;
  const list = dynamicSection?.values || dynamicSection?.cards || (pillars && pillars.length > 0 ? pillars : []);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="research-value-section">
      <div className="srcn-container">
        <div className="research-value-wrap">
          {(displayKicker || displayHeading || displayDesc) && (
            <div className="research-value-header">
              {displayKicker && <span className="research-value-kicker career-values-kicker">{displayKicker}</span>}
              {displayHeading && <h2 className="research-value-title section-main-heading">{displayHeading}</h2>}
              {displayDesc && <p>{displayDesc}</p>}
            </div>
          )}
          {list.length > 0 && (
            <div className="research-value-grid">
              {list.map((pillar, idx) => {
                const iconSrc = getStrapiMedia(pillar.icon || pillar.image);
                return (
                  <article key={pillar.id || idx} className="research-value-card">
                    {iconSrc && (
                      <div className="value-icon-wrap">
                        <img src={iconSrc} alt={pillar.title || ''} />
                      </div>
                    )}
                    {pillar.title && <h3>{pillar.title}</h3>}
                    {(pillar.desc || pillar.description) && <p>{pillar.desc || pillar.description}</p>}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(path.join(__dirname, '../app/our-company/sections/CompanyOverview.jsx'), companyOverviewCode);

// 4. CompnayOurFqa.jsx
const compnayOurFqaCode = `'use client';

import React, { useState } from 'react';

export default function CompnayOurFqa({ faqs = [], dynamicFaq = null }) {
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
fs.writeFileSync(path.join(__dirname, '../app/our-company/sections/CompnayOurFqa.jsx'), compnayOurFqaCode);

console.log('All our-company sections cleaned successfully!');
