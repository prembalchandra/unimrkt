'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function getIndustryIcon(name = '') {
  const n = name.toLowerCase();
  if (n.includes('auto')) return '/asstes/images/icon/automotive-icon-img.png';
  if (n.includes('health') || n.includes('medic')) return '/asstes/images/icon/healthcare-icon-img.png';
  if (n.includes('bank') || n.includes('bfsi') || n.includes('financ')) return '/asstes/images/icon/BFSI-icon-img.png';
  if (n.includes('retail') || n.includes('consumer')) return '/asstes/images/icon/retail-icon-img.png';
  if (n.includes('tech')) return '/asstes/images/icon/technology-icon-img.png';
  if (n.includes('manufactur')) return '/asstes/images/icon/Manufacturing-icon-img.png';
  if (n.includes('energy') || n.includes('utilit')) return '/asstes/images/icon/energy-icon-img.png';
  if (n.includes('fmcg') || n.includes('food')) return '/asstes/images/icon/FMCG-icon-img.png';
  if (n.includes('telecom')) return '/asstes/images/icon/telecom-icon-img.png';
  return '/asstes/images/icon/other-icon-img.png';
}

function formatIndustry(ind) {
  if (!ind) return null;
  const name = ind.title || ind.name || '';
  const slug = ind.slug || '';
  return {
    name,
    icon: getIndustryIcon(name),
    link: slug === 'automotives' || slug === 'automotive-mobility' ? '/automotives' : `/industries#${slug}`,
  };
}

export default function IndustriesArea({ initialIndustries = [], dynamicSection = null }) {
  const [list, setList] = useState(() => (initialIndustries || []).map(formatIndustry).filter(Boolean));

  const displayKicker = dynamicSection?.kicker || 'WHO WE SERVE';
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || 'Industries We Support';
  const displayDesc = dynamicSection?.description || 'Tailoring specialized research methodologies to unique sector challenges and dynamics.';

  useEffect(() => {
    if (initialIndustries && initialIndustries.length > 0) {
      setList(initialIndustries.map(formatIndustry).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/industries?pagination[limit]=10`)
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
          <div className="our-industries-top-content primary-services-header">
            <span className="sub-title-red" style={{ display: 'inline-block', marginBottom: '8px' }}>
              {displayKicker}
            </span>
            <h2 className="our-industries-heading">{displayHeading}</h2>
            <p className="primary-services-desc">
              {displayDesc}
            </p>
          </div>
          <div className="our-industries-box-listing">
            {list.map((item, index) => (
              <div key={index} className="our-industries-itme">
                <Link href={item.link}>
                  <div className="our-industries-icon-text">
                    <img src={item.icon} alt={item.name} />
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
