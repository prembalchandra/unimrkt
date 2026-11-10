import React from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '../../../lib/strapi';

export default function CaseDetailHero({
  dynamicHero = null,
  title = null,
  kicker = null,
  description = null,
  heroImage = null,
  clientName = null,
}) {
  const displayKicker = kicker || dynamicHero?.kicker || dynamicHero?.industry?.title;
  const displayTitle = title || dynamicHero?.title;
  const displayDesc = description || dynamicHero?.description || dynamicHero?.excerpt;
  const imgSrc = getStrapiMedia(heroImage || dynamicHero?.heroImage, getStrapiMedia('/uploads/case-study-banking.jpg'));
  const displayClient = clientName || dynamicHero?.clientName;

  return (
    <section className="cs-detail-hero-section">
      <div className="abnner-arae">
        <div className="srcn-container">
          <div className="team-breadcrumb team-breadcrumb-area">
            <nav aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/case-study">Case Study</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{displayTitle}</span>
            </nav>
          </div>
          <div className="cs-detail-hero-content">
            <div className="cs-hero-badge-wrap">
              <span className="cs-hero-badge">{displayKicker}</span>
              {displayClient && (
                <span className="cs-hero-badge cs-hero-client-badge" style={{ marginLeft: '10px', background: 'rgba(255,255,255,0.2)' }}>
                  {displayClient}
                </span>
              )}
            </div>
            <h1 className="cs-hero-title hero-commmon-heading-area">
              {displayTitle}
            </h1>
            <p className="cs-hero-desc hero-common-title">
              {displayDesc}
            </p>

            <div className="cs-hero-img-box">
              <img
                src={imgSrc}
                alt={displayTitle}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
