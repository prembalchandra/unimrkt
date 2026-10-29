import React from 'react';
import Link from 'next/link';

export default function CaseStudyHero({ dynamicHero = null }) {
  const kicker = dynamicHero?.kicker || 'CASE STUDIES';
  const title = dynamicHero?.title || 'Case Studies That Deliver Real Impact';
  const description =
    dynamicHero?.description ||
    'Discover how our tailored market research solutions help businesses solve critical challenges, uncover growth opportunities, and make confident decisions.';
  const primaryBtnLabel = dynamicHero?.primaryButton?.label || 'Explore Case Studies';
  const primaryBtnUrl = dynamicHero?.primaryButton?.url || '#blogs-grid';

  return (
    <>
      <section className="hero-common-area">
        <div className="hero-common-banner">
          <img
            src="/asstes/images/case-study-banner-img.png"
            className="hero-common-banner-area"
            alt={title}
          />
        </div>
        <div className="srcn-container">
          <div className="hero-common-row">
            <div className="hero-common-content">
              <div className="hero-common-contnet-area">
                <span className="-hero-common-sub-tille-area">
                  <i className="fa-solid fa-bolt" style={{ fontSize: '0.75rem', color: '#ff526b' }}></i>
                  {kicker}
                </span>
                <h1 className="hero-commmon-heading-area">{title}</h1>
                <p className="hero-common-title">{description}</p>
              </div>
              <div className="hero-btn-area">
                <a href={primaryBtnUrl} className="hero-common-btn-area btn-sm">
                  <span>{primaryBtnLabel}</span>
                  <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="team-breadcrumb">
        <div className="srcn-container">
          <nav aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <Link href="/about">About Us</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">Case Studies</span>
          </nav>
        </div>
      </div>
    </>
  );
}
