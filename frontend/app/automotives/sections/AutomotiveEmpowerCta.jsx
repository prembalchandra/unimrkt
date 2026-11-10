import React from 'react';
import { getStrapiMedia } from '../../../lib/strapi';

export default function AutomotiveEmpowerCta({ dynamicCta = null }) {
  const kicker = dynamicCta?.kicker || 'Automotive Research';
  const title = dynamicCta?.title || dynamicCta?.heading || 'Empower Your Automotive Business with Unimrkt Research';
  const desc = dynamicCta?.description;
  const image = getStrapiMedia(dynamicCta?.image, '/asstes/images/automotive-research-img.png');

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
                    Unimrkt Research empowers automotive businesses with accurate market intelligence and actionable insights to support informed decision-making. Leveraging advanced research methodologies, experienced professionals, and access to niche automotive audiences, we deliver reliable data that helps organizations understand customer behavior, market trends, competitive landscapes, and emerging opportunities.
                  </p>
                  <p>
                    From product development and brand positioning to customer satisfaction and market expansion, our customized research solutions are designed to address the unique challenges of the automotive industry. Partner with Unimrkt Research to gain data-driven insights that fuel innovation, strengthen your competitive advantage, and accelerate sustainable business growth.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="telephonic-overview-visual-wrap">
            <div className="telephonic-overview-figure">
              <img src={image} alt={title} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
