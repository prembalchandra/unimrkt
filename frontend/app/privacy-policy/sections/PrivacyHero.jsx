import React from 'react';
import Link from 'next/link';

export default function PrivacyHero({ dynamicHero = null }) {
  const kicker = dynamicHero?.kicker || 'Privacy Policy';
  const title = dynamicHero?.title || 'Built on Trust. Protected by Privacy.';
  const description =
    dynamicHero?.description ||
    'Your data deserves transparency, security and responsible handling. Explore how we protect your information and respect your privacy.';

  return (
    <>
      <section className="hero-common-area">
        <div className="hero-common-banner">
          <img
            src="/asstes/images/unimrkt-research-privacy-policy-banner-img.png"
            className="hero-common-banner-area"
            alt={title}
          />
        </div>
        <div className="srcn-container">
          <div className="hero-common-row">
            <div className="hero-common-content">
              <div className="hero-common-contnet-area">
                <span className="-hero-common-sub-tille-area">
                  <i className="fa-solid fa-bolt" style={{ fontSize: '0.75rem', color: '#ff526b' }}></i> {kicker}
                </span>
                <h1 className="hero-commmon-heading-area">{title}</h1>
                <p className="hero-common-title">{description}</p>
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
            <span aria-current="page">Privacy Policy</span>
          </nav>
        </div>
      </div>
    </>
  );
}
