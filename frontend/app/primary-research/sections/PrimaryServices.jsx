'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function getServiceVisuals(title = '', idx = 0) {
  const t = title.toLowerCase();
  if (t.includes('telephonic') || t.includes('phone')) {
    return {
      image: '/asstes/images/telephonic-surveys-card-img.png',
      href: '/telephonic-surveys',
    };
  }
  if (t.includes('online') || t.includes('panel')) {
    return {
      image: '/asstes/images/online-surveys-card-img.png',
      href: '/services',
    };
  }
  if (t.includes('in-depth') || t.includes('interview')) {
    return {
      image: '/asstes/images/interview-controls-card-img.png',
      href: '/services',
    };
  }
  return {
    image: '/asstes/images/smart-survey-management-card-img.png',
    href: '/telephonic-surveys',
  };
}

function formatService(s, idx) {
  if (!s) return null;
  const title = s.title || '';
  const visuals = getServiceVisuals(title, idx);
  return {
    title,
    description: s.shortDescription || s.description || 'Efficient research methodologies capturing valuable respondent insights.',
    image: visuals.image,
    alt: title,
    href: visuals.href,
  };
}

export default function PrimaryServices({ initialServices = [] }) {
  const [servicesList, setServicesList] = useState(() => (initialServices || []).map(formatService).filter(Boolean));

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
        <div className="primary-services-header">
          <span className="primary-services-kicker">
            WHAT WE DO
          </span>
          <h2 className="primary-services-title">
            Our Primary Research Services
          </h2>
          <p className="primary-services-desc">
            Delivering actionable data through custom research methodologies designed to help you understand your market, your competitors, and your customers.
          </p>
        </div>
        <div className="primary-services-grid">
          {servicesList.slice(0, 4).map((service) => (
            <Link
              href={service.href}
              className="primary-service-card"
              key={service.title}
            >
              <img
                src={service.image}
                alt={service.alt}
                className="primary-service-card-img"
                loading="lazy"
              />

              <div
                className="primary-service-card-overlay"
                aria-hidden="true"
              />

              <div className="primary-service-card-body">
                <h3 className="primary-service-card-title">
                  {service.title}
                </h3>

                <p className="primary-service-card-desc">
                  {service.description}
                </p>

                <div className="primary-service-card-btn-wrap btn-sm">
                  <span
                    className="primary-service-card-btn"
                    aria-hidden="true"
                  >
                    <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
