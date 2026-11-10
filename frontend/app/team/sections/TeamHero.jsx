'use client';

import React from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';

export default function TeamHero({ dynamicHero = null }) {
  if (!dynamicHero) return null;

  const kicker = dynamicHero.kicker;
  const title = dynamicHero.title || dynamicHero.heading;
  const description = dynamicHero.description;
  const primaryBtnLabel = dynamicHero.primaryButton?.label || dynamicHero.button?.label;
  const primaryBtnUrl = dynamicHero.primaryButton?.url || dynamicHero.button?.url || '/contact';
  const secondaryBtnLabel = dynamicHero.secondaryButton?.label;
  const secondaryBtnUrl = dynamicHero.secondaryButton?.url || '/contact';
  const bannerSrc = getStrapiMedia(dynamicHero.bannerImage);

  if (!title && !description && !bannerSrc) return null;

  return (
    <>
      <section className="hero-common-area">
        {bannerSrc && (
          <div className="hero-common-banner">
            <img
              src={bannerSrc}
              className="hero-common-banner-area"
              alt={title || ''}
            />
          </div>
        )}
        <div className="srcn-container">
          <div className="hero-common-row">
            <div className="hero-common-content">
              <div className="hero-common-content-area">
                {kicker && (
                  <span className="hero-common-sub-title-area">
                    <i className="fa-solid fa-bolt" style={{ fontSize: '0.75rem', color: '#ff526b', marginRight: '6px' }}></i>
                    {kicker}
                  </span>
                )}
                {title && <h1 className="hero-commmon-heading-area">{title}</h1>}
                {description && <p className="hero-common-title">{description}</p>}
              </div>
              {(primaryBtnLabel || secondaryBtnLabel) && (
                <div className="hero-btn-area">
                  {primaryBtnLabel && (
                    <Link href={primaryBtnUrl} className="hero-common-btn-area btn-sm">
                      <span>{primaryBtnLabel}</span>
                      <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                    </Link>
                  )}
                  {secondaryBtnLabel && (
                    <Link href={secondaryBtnUrl} className="hero-common-btn-area btn-border-sm">
                      <span>{secondaryBtnLabel}</span>
                      <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="team-breadcrumb">
        <div className="srcn-container">
          <nav aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">›</span><span aria-current="page">Team</span>
          </nav>
        </div>
      </div>
    </>
  );
}
