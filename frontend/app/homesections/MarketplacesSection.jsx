'use client';

import React, { useState, useEffect } from 'react';
import { getStrapiMedia } from '@/lib/strapi';

function getOfficeImage(office) {
  if (office.image) return getStrapiMedia(office.image);
  const name = (office.officeName || office.country || '').toLowerCase();
  if (name.includes('india')) return getStrapiMedia('/uploads/office-india.png');
  if (name.includes('uk') || name.includes('united kingdom') || name.includes('oxford')) return getStrapiMedia('/uploads/office-uk.png');
  if (name.includes('usa') || name.includes('united states') || name.includes('york')) return getStrapiMedia('/uploads/office-usa.png');
  return getStrapiMedia('/uploads/office-india.png');
}

export default function MarketplacesSection({ initialOffices = [], dynamicSection = null }) {
  const [offices, setOffices] = useState(() => initialOffices || []);

  const heading = dynamicSection?.heading || dynamicSection?.title;
  const subtitle = dynamicSection?.description || dynamicSection?.subtitle;

  useEffect(() => {
    if (initialOffices && initialOffices.length > 0) {
      setOffices(initialOffices);
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/office-locations?sort=order:asc`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setOffices(d.data);
          }
        })
        .catch(() => {});
    }
  }, [initialOffices]);

  return (
    <section className="global-marketplaces-section" id="marketplaces">
      <div className="moments-pattern-backdrop"></div>
      <div className="srcn-container">
        {(heading || subtitle) && (
          <div className="marketplaces-header text-center">
            {heading && <h2 className="marketplaces-title">{heading}</h2>}
            {subtitle && <p className="marketplaces-subtitle">{subtitle}</p>}
          </div>
        )}

        {offices.length > 0 && (
          <div className="office-cards-grid">
            {offices.map((office, idx) => {
              const img = getOfficeImage(office);
              return (
                <div key={office.id || idx} className="office-hub-card">
                  {img && (
                    <div className="office-image-box">
                      <img src={img} alt={office.officeName || office.country} />
                    </div>
                  )}
                  <div className="office-content">
                    <h3 className="office-name">{office.officeName || office.country}</h3>

                    {office.address && (
                      <div className="office-info-item">
                        <div className="office-icon">
                          <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div className="office-details">
                          <span className="office-info-label">LOCATION</span>
                          <p className="office-info-text">{office.address}</p>
                        </div>
                      </div>
                    )}

                    {office.email && (
                      <div className="office-info-item">
                        <div className="office-icon">
                          <i className="fa-regular fa-envelope"></i>
                        </div>
                        <div className="office-details">
                          <span className="office-info-label">EMAIL</span>
                          <p className="office-info-text">
                            <a href={`mailto:${office.email}`}>{office.email}</a>
                          </p>
                        </div>
                      </div>
                    )}

                    {office.phoneNumbers && (
                      <div className="office-info-item">
                        <div className="office-icon">
                          <i className="fa-solid fa-phone"></i>
                        </div>
                        <div className="office-details">
                          <span className="office-info-label">CONTACT NUMBER</span>
                          <p className="office-info-text">{office.phoneNumbers}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="marketplaces-bottom-bar text-center">
          <span className="marketplaces-coverage-text">To know more about our global coverage, please email us at</span>
          <a href="mailto:sales@unimrkt.com" className="marketplaces-email-pill">
            SALES@UNIMRKT.COM
          </a>
        </div>
      </div>
    </section>
  );
}
