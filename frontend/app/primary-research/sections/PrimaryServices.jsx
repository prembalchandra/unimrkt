'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';

function formatService(s) {
  if (!s) return null;
  const title = s.title || '';
  const imageSrc = getStrapiMedia(s.thumbnail || s.icon);
  const href = s.slug ? (s.slug.includes('telephonic') ? '/telephonic-surveys' : `/services#${s.slug}`) : '/services';
  return {
    title,
    description: s.shortDescription || s.description || '',
    image: imageSrc,
    alt: title,
    href,
  };
}

export default function PrimaryServices({ initialServices = [], dynamicSection = null }) {
  const [servicesList, setServicesList] = useState(() => (initialServices || []).map(formatService).filter(Boolean));

  const displayKicker = dynamicSection?.kicker;
  const displayTitle = dynamicSection?.heading || dynamicSection?.title;
  const displayDesc = dynamicSection?.description;

  useEffect(() => {
    if (initialServices && initialServices.length > 0) {
      setServicesList(initialServices.map(formatService).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/services?populate=*&pagination[limit]=4`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setServicesList(d.data.map(formatService).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [initialServices]);

  if (servicesList.length === 0) return null;

  return (
    <section className="primary-services-section">
      <div className="srcn-container">
        {(displayKicker || displayTitle || displayDesc) && (
          <div className="primary-services-header">
            {displayKicker && (
              <span className="primary-services-kicker">
                {displayKicker}
              </span>
            )}
            {displayTitle && (
              <h2 className="primary-services-title">
                {displayTitle}
              </h2>
            )}
            {displayDesc && (
              <p className="primary-services-desc">
                {displayDesc}
              </p>
            )}
          </div>
        )}

        <div className="primary-services-grid">
          {servicesList.map((service, index) => (
            <div key={index} className="primary-service-col">
              <div className="primary-service-card">
                {service.image && (
                  <div className="primary-service-img-wrap">
                    <img src={service.image} alt={service.alt} />
                  </div>
                )}
                <div className="primary-service-content">
                  {service.title && <h3 className="primary-service-heading">{service.title}</h3>}
                  {service.description && (
                    <p className="primary-service-text">{service.description}</p>
                  )}
                  <Link href={service.href} className="primary-service-link">
                    Explore Service <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
