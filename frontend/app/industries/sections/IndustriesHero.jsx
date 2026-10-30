import React from 'react';
import Link from 'next/link';

export default function IndustriesHero({ dynamicHero = null }) {
  const kicker = dynamicHero?.kicker || 'OUR VERTICALS';
  const title =
    dynamicHero?.title ||
    'Specialized Market Research Across Global Industries';
  const description =
    dynamicHero?.description ||
    'Leveraging deep domain knowledge, vetted B2B panels, and rigorous data collection methodologies across 10+ major sectors worldwide.';
  const primaryBtnLabel = dynamicHero?.primaryButton?.label || 'Speak With An Industry Specialist';
  const primaryBtnUrl = dynamicHero?.primaryButton?.url || '/contact';

  return (
    <>
      <section className="hero-common-area">
        <div className="hero-common-banner">
          <img
            src="/asstes/images/industries-banner-img.webp"
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
                <Link href={primaryBtnUrl} className="hero-common-btn-area btn-sm">
                  <span>{primaryBtnLabel}</span>
                  <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right" />
                </Link>
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
            <span aria-current="page">Industries</span>
          </nav>
        </div>
      </div>
    </>
  );
}
