const fs = require('fs');
const path = require('path');

// 1. TelephonicOverview.jsx
const telephonicOverviewCode = `'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function TelephonicOverview({ dynamicOverview = null }) {
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
fs.writeFileSync(path.join(__dirname, '../app/telephonic-surveys/sections/TelephonicOverview.jsx'), telephonicOverviewCode);

// 2. WhyTelephonic.jsx
const whyTelephonicCode = `'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function WhyTelephonic({ dynamicValues = null, reasons = [] }) {
  const displayKicker = dynamicValues?.kicker;
  const displayHeading = dynamicValues?.heading || dynamicValues?.title;
  const list = dynamicValues?.values || dynamicValues?.cards || (reasons && reasons.length > 0 ? reasons : []);

  if (!displayHeading && list.length === 0) return null;

  return (
    <section className="why-telephonic-section approach-section">
      <div className="srcn-container">
        <div className="why-telephonic-container">
          {(displayKicker || displayHeading) && (
            <div className="why-telephonic-header career-journey-header">
              {displayKicker && (
                <span className="why-telephonic-kicker career-values-kicker career-journey-kicker">
                  {displayKicker}
                </span>
              )}
              {displayHeading && (
                <h2 className="why-telephonic-title approach-title section-main-heading">
                  {displayHeading}
                </h2>
              )}
            </div>
          )}

          {list.length > 0 && (
            <div className="why-telephonic-grid approach-grid">
              {list.map((r, i) => {
                const iconSrc = getStrapiMedia(r.icon || r.image);
                return (
                  <article key={r.id || i} className="why-telephonic-card approach-card career-journey-step">
                    <div className="why-telephonic-card-area">
                      {iconSrc && (
                        <div className="why-telephonic-icon approach-icon career-journey-icon">
                          <img src={iconSrc} alt={r.title || ''} />
                        </div>
                      )}
                      <div className="why-telephonic-card-content">
                        {r.title && <h3>{r.title}</h3>}
                        {(r.desc || r.description) && <p>{r.desc || r.description}</p>}
                      </div>
                    </div>
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
fs.writeFileSync(path.join(__dirname, '../app/telephonic-surveys/sections/WhyTelephonic.jsx'), whyTelephonicCode);

// 3. TelephonicProcess.jsx
const telephonicProcessCode = `'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { getStrapiMedia } from '@/lib/strapi';

export default function TelephonicProcess({ processSteps = [], title = null, description = null, dynamicSection = null }) {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  const displayHeading = dynamicSection?.heading || dynamicSection?.title || title;
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
    <section className="telephonic-process-area" id="research-process-impact">
      <div className="telephonic-process-container">
        {(displayHeading || displayDesc) && (
          <div className="telephonic-process-header">
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
fs.writeFileSync(path.join(__dirname, '../app/telephonic-surveys/sections/TelephonicProcess.jsx'), telephonicProcessCode);

// 4. QualityFirst.jsx
const qualityFirstCode = `'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function QualityFirst({ dynamicValues = null, items = [] }) {
  const displayKicker = dynamicValues?.kicker;
  const displayHeading = dynamicValues?.heading || dynamicValues?.title;
  const displayDesc = dynamicValues?.description;
  const list = dynamicValues?.values || dynamicValues?.cards || (items && items.length > 0 ? items : []);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="quality-first-section">
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <div className="quality-first-header">
            {displayKicker && <span className="quality-first-kicker sub-title-red">{displayKicker}</span>}
            {displayHeading && <h2 className="quality-first-title">{displayHeading}</h2>}
            {displayDesc && <p className="quality-first-desc">{displayDesc}</p>}
          </div>
        )}

        {list.length > 0 && (
          <div className="quality-first-grid">
            {list.map((item, index) => {
              const iconSrc = getStrapiMedia(item.icon || item.image);
              return (
                <article key={item.id || index} className="quality-first-card">
                  {iconSrc && (
                    <div className="quality-first-icon-box">
                      <img src={iconSrc} alt={item.title || ''} />
                    </div>
                  )}
                  <div className="quality-first-content">
                    {item.title && <h3>{item.title}</h3>}
                    {(item.desc || item.description) && <p>{item.desc || item.description}</p>}
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
fs.writeFileSync(path.join(__dirname, '../app/telephonic-surveys/sections/QualityFirst.jsx'), qualityFirstCode);

// 5. TelephonicCanMeasure.jsx
const telephonicCanMeasureCode = `'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function TelephonicCanMeasure({ dynamicMetrics = null, items = [] }) {
  const displayKicker = dynamicMetrics?.kicker;
  const displayHeading = dynamicMetrics?.heading || dynamicMetrics?.title;
  const displayDesc = dynamicMetrics?.description;
  const list = dynamicMetrics?.metrics || dynamicMetrics?.values || (items && items.length > 0 ? items : []);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="telephonic-measure-section">
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <div className="telephonic-measure-header">
            {displayKicker && <span className="telephonic-measure-kicker sub-title-red">{displayKicker}</span>}
            {displayHeading && <h2 className="telephonic-measure-title">{displayHeading}</h2>}
            {displayDesc && <p className="telephonic-measure-desc">{displayDesc}</p>}
          </div>
        )}

        {list.length > 0 && (
          <div className="telephonic-measure-grid">
            {list.map((item, index) => {
              const iconSrc = getStrapiMedia(item.icon || item.image);
              return (
                <article key={item.id || index} className="telephonic-measure-card">
                  {iconSrc && (
                    <div className="telephonic-measure-icon-box">
                      <img src={iconSrc} alt={item.title || item.label || ''} />
                    </div>
                  )}
                  <div className="telephonic-measure-card-content">
                    {(item.title || item.label) && <h3>{item.title || item.label}</h3>}
                    {(item.desc || item.description) && <p>{item.desc || item.description}</p>}
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
fs.writeFileSync(path.join(__dirname, '../app/telephonic-surveys/sections/TelephonicCanMeasure.jsx'), telephonicCanMeasureCode);

// 6. MeasureSection.jsx
const measureSectionCode = `'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function MeasureSection({ dynamicSection = null, items = [] }) {
  const displayKicker = dynamicSection?.kicker;
  const displayHeading = dynamicSection?.heading || dynamicSection?.title;
  const displayDesc = dynamicSection?.description;
  const list = dynamicSection?.values || dynamicSection?.metrics || (items && items.length > 0 ? items : []);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="measure-section">
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <div className="measure-header section-header-area">
            {displayKicker && <span className="measure-kicker career-values-kicker">{displayKicker}</span>}
            {displayHeading && <h2 className="measure-heading section-main-heading">{displayHeading}</h2>}
            {displayDesc && <p className="measure-desc">{displayDesc}</p>}
          </div>
        )}

        {list.length > 0 && (
          <div className="measure-grid">
            {list.map((item, index) => {
              const iconSrc = getStrapiMedia(item.icon || item.image);
              return (
                <article key={item.id || index} className="measure-card">
                  {iconSrc && (
                    <div className="measure-icon-wrap">
                      <img src={iconSrc} alt={item.title || ''} />
                    </div>
                  )}
                  {item.title && <h3>{item.title}</h3>}
                  {(item.desc || item.description) && <p>{item.desc || item.description}</p>}
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
fs.writeFileSync(path.join(__dirname, '../app/telephonic-surveys/sections/MeasureSection.jsx'), measureSectionCode);

// 7. ResearchImpact.jsx
const researchImpactCode = `'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function ResearchImpact({ dynamicSection = null, impacts = [] }) {
  const displayKicker = dynamicSection?.kicker;
  const displayHeading = dynamicSection?.heading || dynamicSection?.title;
  const displayDesc = dynamicSection?.description;
  const list = dynamicSection?.values || dynamicSection?.metrics || (impacts && impacts.length > 0 ? impacts : []);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="research-impact-section">
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <div className="research-impact-header section-header-area">
            {displayKicker && <span className="research-impact-kicker career-values-kicker">{displayKicker}</span>}
            {displayHeading && <h2 className="research-impact-heading section-main-heading">{displayHeading}</h2>}
            {displayDesc && <p className="research-impact-desc">{displayDesc}</p>}
          </div>
        )}

        {list.length > 0 && (
          <div className="research-impact-grid">
            {list.map((item, index) => {
              const iconSrc = getStrapiMedia(item.icon || item.image);
              return (
                <article key={item.id || index} className="research-impact-card">
                  {iconSrc && (
                    <div className="research-impact-icon-wrap">
                      <img src={iconSrc} alt={item.title || ''} />
                    </div>
                  )}
                  {item.title && <h3>{item.title}</h3>}
                  {(item.desc || item.description) && <p>{item.desc || item.description}</p>}
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
fs.writeFileSync(path.join(__dirname, '../app/telephonic-surveys/sections/ResearchImpact.jsx'), researchImpactCode);

// 8. TelephonicFaq.jsx
const telephonicFaqCode = `'use client';

import React, { useState } from 'react';

export default function TelephonicFaq({ faqs = [], dynamicFaq = null }) {
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
fs.writeFileSync(path.join(__dirname, '../app/telephonic-surveys/sections/TelephonicFaq.jsx'), telephonicFaqCode);

console.log('All telephonic survey sections cleaned successfully!');
