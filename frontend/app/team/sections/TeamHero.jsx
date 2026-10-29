import React from 'react';
import Link from 'next/link';

export default function TeamHero({ dynamicHero = null }) {
  const kicker = dynamicHero?.kicker || 'Unimrkt Team';
  const title = dynamicHero?.title || 'Meet the Minds Behind Unimrkt';
  const description =
    dynamicHero?.description ||
    'A diverse team of research experts bringing experience, insight, and strategic thinking to every project.';
  const primaryBtnLabel = dynamicHero?.primaryButton?.label;
  const primaryBtnUrl = dynamicHero?.primaryButton?.url || '#teamProfileGrid';

  return (
    <>
      <section className="hero-common-area">
        <div className="hero-common-banner">
          <img
            src="/asstes/images/unimrkt-resarch-our-team-banner.png"
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
              {primaryBtnLabel && (
                <div className="hero-btn-area">
                  <Link href={primaryBtnUrl} className="hero-common-btn-area btn-sm">
                    <span>{primaryBtnLabel}</span>
                    <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right" />
                  </Link>
                </div>
              )}
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
            <span aria-current="page">Our Team</span>
          </nav>
        </div>
      </div>
    </>
  );
}
