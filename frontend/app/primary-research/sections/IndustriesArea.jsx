'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';

function formatIndustry(ind) {
  if (!ind) return null;
  const name = ind.title || ind.name || '';
  const slug = ind.slug || '';
  const iconSrc = getStrapiMedia(ind.icon || ind.thumbnail);
  return {
    name,
    icon: iconSrc,
    link: slug === 'automotives' || slug === 'automotive-mobility' ? '/automotives' : `/industries#${slug}`,
  };
}

export default function IndustriesArea({ initialIndustries = [], dynamicSection = null }) {
  const [list, setList] = useState(() => (initialIndustries || []).map(formatIndustry).filter(Boolean));

  const displayKicker = dynamicSection?.kicker;
  const displayHeading = dynamicSection?.heading || dynamicSection?.title;
  const displayDesc = dynamicSection?.description;

  useEffect(() => {
    if (initialIndustries && initialIndustries.length > 0) {
      setList(initialIndustries.map(formatIndustry).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/industries?populate=*&pagination[limit]=10`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setList(d.data.map(formatIndustry).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [initialIndustries]);

  if (list.length === 0) return null;

  return (
    <section className="our-industries-area">
      <div className="srcn-container">
        <div className="our-industries-wrapper-inner">
          {(displayKicker || displayHeading || displayDesc) && (
            <div className="our-industries-top-content primary-services-header">
              {displayKicker && (
                <span className="sub-title-red" style={{ display: 'inline-block', marginBottom: '8px' }}>
                  {displayKicker}
                </span>
              )}
              {displayHeading && <h2 className="our-industries-heading">{displayHeading}</h2>}
              {displayDesc && <p className="primary-services-desc">{displayDesc}</p>}
            </div>
          )}
          <div className="our-industries-box-listing">
            {list.map((item, index) => (
              <div key={index} className="our-industries-itme">
                <Link href={item.link}>
                  <div className="our-industries-icon-text">
                    {item.icon && <img src={item.icon} alt={item.name} />}
                    <span>{item.name}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
