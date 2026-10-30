import React from 'react';
import Link from 'next/link';
import { getStrapiMediaUrl } from '@/lib/strapi';

export default function ContactHero({ dynamicHero = null }) {
  const kicker = dynamicHero?.kicker || 'Contact Us';
  const title =
    dynamicHero?.title || 'Let’s Turn Your Business Questions Into Clear Answers';
  const description =
    dynamicHero?.description ||
    'Tell us what you’re trying to understand. Our research experts will help you find the right path forward.';
  const primaryBtnLabel = dynamicHero?.primaryButton?.label || 'Start a Conversation';
  const primaryBtnUrl = dynamicHero?.primaryButton?.url || '#contact-form';
  const bannerImage = getStrapiMediaUrl(
    dynamicHero?.bannerImage,
    '/asstes/images/contac-banner-img.webp'
  );

  return (
    <>
      <section className="hero-common-area">
        <div className="hero-common-banner">
          <img
            src={bannerImage}
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
            <span aria-current="page">Contact</span>
          </nav>
        </div>
      </div>
    </>
  );
}
