import React from 'react';
import Link from 'next/link';
import LazyVideo from '@/components/LazyVideo';
import { getStrapiMediaUrl } from '@/lib/strapi';

export default function HomeresearchCta({ dynamicCta = null }) {
  const title = dynamicCta?.title || 'Global Research Panel';
  const desc =
    dynamicCta?.description ||
    'Access a diverse network of verified respondents across multiple countries, demographics, and industries, enabling reliable market research, faster data collection, and meaningful insights at a global scale.';
  const btnLabel = dynamicCta?.button?.label || 'Explore Our Global Panel';
  const btnUrl = dynamicCta?.button?.url || '/contact';
  const posterImg = getStrapiMediaUrl(dynamicCta?.visualImage, '/asstes/images/the-impact-banner-img.webp');

  return (
    <section className="research-cta-sections" id="cta">
      <div className="srcn-containers">
        <div className="research-cta-banner-wrapper research-home-banner-wrapper">
          <LazyVideo
            className="research-cta-bg-image"
            src="/asstes/images/commonvideo-banner.mp4"
            poster={posterImg}
          />

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
