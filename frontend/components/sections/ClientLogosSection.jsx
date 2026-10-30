'use client';

import React from 'react';
import { getStrapiMediaUrl } from '@/lib/strapi';

const defaultLogos = [
  '/asstes/images/icon/mr-footer-logo.png',
  '/asstes/images/icon/msri-logo-img.png',
  '/asstes/images/icon/mr-footer-logo.png',
];

export default function ClientLogosSection({ data = {} }) {
  if (!data) return null;

  const title = data.title || 'Trusted by Global Enterprises';
  const logos = (data.logos && data.logos.length > 0)
    ? data.logos.map((l) => getStrapiMediaUrl(l))
    : defaultLogos;

  return (
    <section className="client-logos-section" style={{ padding: '40px 0', background: 'rgba(0,0,0,0.02)' }}>
      <div className="srcn-container text-center">
        {title && <span className="sub-title-red" style={{ marginBottom: '20px', display: 'block' }}>{title}</span>}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
          {logos.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`Client logo ${idx + 1}`}
              style={{ maxHeight: '45px', objectFit: 'contain', opacity: 0.8 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
