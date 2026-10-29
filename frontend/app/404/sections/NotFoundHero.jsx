'use client';

import React from 'react';

export default function NotFoundHero() {
  return (
    <section className="notfound-page-wrapper">
      <div class="hero-common-banner"><img
            src="/asstes/images/404-banner.png"
            alt="404 Page Not Found Background"
            className="notfound-banner-bg hero-common-banner-area"
          /></div>
      <div className="srcn-container">
        <div className="notfound-banner-frame hero-common-content">
          
          <div className="notfound-banner-overlay" aria-hidden="true"></div>
          <div className="notfound-content-layer">
            <div className="notfound-kicker">
              <span className="notfound-kicker-dash" aria-hidden="true"></span>
              <span className="notfound-kicker-text">PAGE NOT FOUND</span>
            </div>
            <div className="notfound-code-wrapper">
              <span className="notfound-code-number">404</span>
              <span className="notfound-code-dot" aria-hidden="true"></span>
            </div>
            <h1 className="notfound-heading hero-commmon-heading-area">
              Wrong turn.<br />Right mindset.
            </h1>
            <p className="notfound-desc hero-common-title">
              The page you are looking for doesn't exist or has been moved. But don't worry, you can always head back to our homepage or get in touch with us.
            </p>
            <div class="hero-btn-area notfound-actions">

              <a href="/" class=" btn-sm"><span>Go to Homepage</span><img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right" /></a>
              <a href="/contact" class="btn-white">Contact Us <i class="fa fa-long-arrow-up" aria-hidden="true"></i></a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
