import React from 'react';
import Link from 'next/link';

export default function PrimaryHero({ dynamicHero = null }) {
  const kicker = dynamicHero?.kicker || 'PRIMARY RESEARCH';
  const title =
    dynamicHero?.title || 'Real Conversations.\nReliable Data. Better Decisions.';
  const description =
    dynamicHero?.description ||
    'Collect first-hand market intelligence through customized primary research solutions that uncover customer opinions, validate business decisions, and fuel strategic growth.';
  const primaryBtnLabel = dynamicHero?.primaryButton?.label || 'Get a Free Quote';
  const primaryBtnUrl = dynamicHero?.primaryButton?.url || '#cta';
  const secondaryBtnLabel = dynamicHero?.secondaryButton?.label || 'Talk to Our Experts';
  const secondaryBtnUrl = dynamicHero?.secondaryButton?.url || '/contact';

  return (
    <section className="hero-common-area">
      <div className="hero-common-banner">
        <img
          src="/asstes/images/unimrkt-reseach-primary-research-banner-img.webp"
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
              <Link href={secondaryBtnUrl} className="hero-common-btn-area btn-border-sm">
                <span>{secondaryBtnLabel}</span>
                <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
