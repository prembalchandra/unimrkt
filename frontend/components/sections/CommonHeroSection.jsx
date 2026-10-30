'use client';

import React from 'react';
import Link from 'next/link';
import { getStrapiMediaUrl } from '@/lib/strapi';

export default function CommonHeroSection({ data = {} }) {
  if (!data) return null;

  const kicker = data.kicker || 'UNIMRKT RESEARCH';
  const title = data.title || '';
  const description = data.description || '';
  const primaryButton = data.primaryButton;
  const secondaryButton = data.secondaryButton;

  const bannerImage = getStrapiMediaUrl(
    data.bannerImage,
    '/asstes/images/unimrkt-resarch-our-team-banner.webp'
  );

  return (
    <section className="hero-common-area">
      <div className="hero-common-banner">
        <img
          src={bannerImage}
          className="hero-common-banner-area"
          alt={title || 'Unimrkt Research'}
        />
      </div>
      <div className="srcn-container">
        <div className="hero-common-row">
          <div className="hero-common-content">
            <div className="hero-common-contnet-area">
              {kicker && (
                <span className="-hero-common-sub-tille-area">
                  <i className="fa-solid fa-bolt" style={{ fontSize: '0.75rem', color: '#ff526b' }}></i>
                  {' '}{kicker}
                </span>
              )}
              {title && <h1 className="hero-commmon-heading-area">{title}</h1>}
              {description && <p className="hero-common-title">{description}</p>}
            </div>

            {(primaryButton || secondaryButton) && (
              <div className="hero-btn-area">
                {primaryButton && (
                  <Link
                    href={primaryButton.url || '/contact'}
                    className="hero-common-btn-area btn-sm"
                  >
                    <span>{primaryButton.label || 'Learn More'}</span>
                    {primaryButton.showArrow !== false && (
                      <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right" />
                    )}
                  </Link>
                )}
                {secondaryButton && (
                  <Link
                    href={secondaryButton.url || '/contact'}
                    className="hero-common-btn-area btn-border-sm"
                  >
                    <span>{secondaryButton.label || 'Contact Us'}</span>
                    {secondaryButton.showArrow && (
                      <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right" />
                    )}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
