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

export default function IndustriesArea({ initialIndustries = [] }) {
  const [list, setList] = useState(() => (initialIndustries || []).map(formatIndustry).filter(Boolean));

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
              WHO WE SERVE
            </span>
            <h2 className="our-industries-heading">Industries We Support</h2>
            <p className="our-industries-title">
              Our primary research expertise spans multiple sectors, giving us the domain knowledge needed to design relevant surveys and ask the right questions.
            </p>
          </div>
          <div className="our-industries-wapper-area">
            <div className="our-industries-grid">
              {list.slice(0, 10).map((ind, idx) => (
                <div key={idx} className="our-industries-card-col">
                  <Link href={ind.link} className="our-industries-card-wapper">
                    <div className="our-industries-card">
                      <div className="icon-img-box">
                        <img src={ind.icon} alt={ind.name} />
                      </div>
                      <div className="our-industries-content-area">
                        <h3 className="our-industries-content">{ind.name}</h3>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
