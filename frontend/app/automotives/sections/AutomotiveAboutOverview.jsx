import React from 'react';
import { getStrapiMedia } from '../../../lib/strapi';

export default function AutomotiveAboutOverview({ dynamicOverview = null }) {
  const kicker = dynamicOverview?.kicker || 'What We Do';
  const title = dynamicOverview?.title || dynamicOverview?.heading || 'Our Automotive Research Services';
  const desc = dynamicOverview?.description;
  const image = getStrapiMedia(dynamicOverview?.image, '/asstes/images/automotives-about-img.png');

  return (
    <section className="telephonic-overview-section">
      <div className="srcn-container">
        <div className="telephonic-overview-grid">
          <div className="telephonic-overview-content">
            <span className="telephonic-overview-kicker sub-title-red">{kicker}</span>
            <h2 className="telephonic-overview-title">{title}</h2>
            <div className="abou-Primary-overview">
              {desc ? (
                <p>{desc}</p>
              ) : (
                <>
                  <p>
                    Unimrkt Research is a trusted automotive market research partner, delivering reliable data and actionable insights to help manufacturers, OEMs, suppliers, dealerships, EV companies, and mobility providers make informed business decisions. Our expertise spans consumer behavior, market trends, competitive intelligence, product validation, and emerging opportunities across the automotive ecosystem.
                  </p>
                  <p>
                    Using advanced research methodologies such as CATI, Online Surveys, In-Depth Interviews (IDIs), Focus Group Discussions (FGDs), and Telephonic Surveys, we provide high-quality, accurate data tailored to your business objectives. From tracking regulatory changes and understanding customer preferences to evaluating new market opportunities, our research empowers organizations to reduce risk, drive innovation, and achieve sustainable growth in the evolving automotive industry.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="telephonic-overview-visual-wrap">
            <div className="telephonic-overview-figure abou-Primary-img">
              <img src={image} alt={title} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
