'use client';

import React from 'react';

const defaultIcons = [
  '/asstes/images/icon/clear-communication-icon-img.png',
  '/asstes/images/icon/innovation-icon-img.png',
  '/asstes/images/icon/team-work-icon-img2.png',
  '/asstes/images/icon/integrity-icon-img.png',
  '/asstes/images/icon/business-ethics-icon-img.png',
  '/asstes/images/icon/transparency-icon-img2.png',
  '/asstes/images/icon/wisdom-icon-img.png',
  '/asstes/images/icon/diversity-icon-img2.png',
];

export default function UnimrktResearchArea({ values = [], kicker, heading, description }) {
  if (!values || values.length === 0) return null;

  return (
    <section className="our-unimrkt-research-area">
      <div
        className="our-unimrkt-research-banner"
        aria-hidden="true"
      />

      <div className="srcn-container">
        <div className="our-unimrkt-research-wrapper-inner">
          <div className="our-unimrkt-research-top-content primary-services-header">
            <span className="our-unimrkt-research-sub-title">{kicker || 'OUR VALUES'}</span>
            <h2 className="our-unimrkt-research-main-heading section-main-heading">
              {heading || 'The Principles Behind Our Work'}
            </h2>
            <p className="our-unimrkt-research-title">
              {description || 'We believe that our values not only make us a reliable business partner and consumer research agency, but also a thoughtful one.'}
            </p>
          </div>
          <div className="our-values-grid">
            {values.map((item, index) => (
              <div
                className="our-unimrkt-research-card-col"
                key={item.id || `${item.title}-${index}`}
              >
                <div className="our-unimrkt-research-card">
                  <div className="our-unimrkt-research-icon-box">
                    <img
                      src={item.icon || item.iconClass || defaultIcons[index % defaultIcons.length]}
                      alt={item.title}
                      loading="lazy"
                    />
                  </div>

                  <div className="our-unimrkt-research-content">
                    <h3>{item.title}</h3>
                    <p>{item.desc || item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
