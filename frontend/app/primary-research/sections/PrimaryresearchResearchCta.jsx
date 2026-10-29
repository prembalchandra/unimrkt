import React from 'react';
import Link from 'next/link';

export default function PrimaryresearchResearchCta({ dynamicCta = null }) {
  const title = dynamicCta?.title || 'Start Your Research Journey';
  const desc =
    dynamicCta?.description ||
    'Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business decisions.';
  const btnLabel = dynamicCta?.button?.label || 'Talk to our experts';
  const btnUrl = dynamicCta?.button?.url || '/contact';

  return (
    <section className="research-cta-section" id="cta">
      <div className="srcn-container">
        <div className="research-cta-banner-wrapper">
          <video
            className="research-cta-bg-image"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/asstes/images/commonvideo-banner.mp4" type="video/mp4" />
          </video>

          <div className="research-cta-overlay"></div>
          <div className="srcn-container research-cta-content">
            <h2 className="section-main-heading research-cta-title">{title}</h2>
            <p className="research-cta-desc hero-common-title">{desc}</p>
            <Link href={btnUrl} className="btn-white">
              {btnLabel} <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
