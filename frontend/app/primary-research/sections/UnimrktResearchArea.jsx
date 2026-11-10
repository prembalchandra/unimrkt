'use client';

import React from 'react';

const defaultIcons = [
  '/asstes/images/icon/team-members-icon-img.png',
  '/asstes/images/icon/on-time-icon-img.png',
  '/asstes/images/icon/repeat-business-icon-img.png',
  '/asstes/images/icon/surveys-complet-year-icon-img.png',
  '/asstes/images/icon/State-of-the-art-icon-img.png',
  '/asstes/images/icon/average-cost-savings-icon-img.png',
  '/asstes/images/icon/moderators-icon-img.png',
  '/asstes/images/icon/certified-icon-img.png',
  '/asstes/images/icon/projects-of-combined-icon-img.png',
  '/asstes/images/icon/scalability-icon-img.png',
  '/asstes/images/icon/support-icon-img.png',
];

export default function UnimrktResearchArea({ metrics = [], kicker, heading, description }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="our-unimrkt-research-area">
      <div className="our-unimrkt-research-banner" aria-hidden="true" />
      <div className="srcn-container">
        <div className="our-unimrkt-research-wrapper-inner">
          <div className="our-unimrkt-research-top-content primary-services-header">
            <span className="our-unimrkt-research-sub-title">
              {kicker || 'OUR CAPABILITIES'}
            </span>
            <h2 className="our-unimrkt-research-main-heading section-main-heading">
              {heading || 'The Unimrkt Edge'}
            </h2>
            <p className="our-unimrkt-research-title">
              {description || 'We combine robust research infrastructure with skilled interviewers, strict quality control, and international reach.'}
            </p>
          </div>
          <div className="our-unimrkt-research-grid">
            {metrics.map((item, index) => (
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
