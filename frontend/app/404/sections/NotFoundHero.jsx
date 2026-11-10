'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFoundHero({ dynamicHero = null }) {
  const kicker = dynamicHero?.kicker || 'PAGE NOT FOUND';
  const heading = dynamicHero?.heading || dynamicHero?.title || 'Wrong turn. Right mindset.';
  const desc = dynamicHero?.description || "The page you are looking for doesn't exist or has been moved. But don't worry, you can always head back to our homepage or get in touch with us.";

  return (
    <section className="notfound-page-wrapper">
      <div className="hero-common-banner">
        <img
          src="/asstes/images/404-banner.png"
          alt="404 Page Not Found Background"
          className="notfound-banner-bg hero-common-banner-area"
        />
      </div>
      <div className="srcn-container">
        <div className="notfound-banner-frame hero-common-content">
          <div className="notfound-banner-overlay" aria-hidden="true"></div>
          <div className="notfound-content-layer">
            <div className="notfound-kicker">
              <span className="notfound-kicker-dash" aria-hidden="true"></span>
              <span className="notfound-kicker-text">{kicker}</span>
            </div>
            <div className="notfound-code-wrapper">
              <span className="notfound-code-number">404</span>
              <span className="notfound-code-dot" aria-hidden="true"></span>
            </div>
            <h1 className="notfound-heading hero-commmon-heading-area">
              {heading}
            </h1>
            <p className="notfound-desc hero-common-title">
              {desc}
            </p>
            <div className="hero-btn-area notfound-actions">
              <Link href="/" className="btn-sm">
                <span>Go to Homepage</span>
                <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right" />
              </Link>
              <Link href="/contact" className="btn-white">
                Contact Us <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
