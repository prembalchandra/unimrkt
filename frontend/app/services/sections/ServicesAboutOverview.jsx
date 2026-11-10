import React from 'react';
import { getStrapiMedia } from '../../../lib/strapi';

export default function ServicesAboutOverview({ dynamicOverview = null }) {
  const kicker = dynamicOverview?.kicker || 'About Our Services';
  const title = dynamicOverview?.title || dynamicOverview?.heading || 'One Research Partner. Multiple Ways to Find the Answer.';
  const desc = dynamicOverview?.description;
  const image = getStrapiMedia(dynamicOverview?.image, '/asstes/images/unimrkt-resarch-services-about-img.png');

  return (
    <section className="telephonic-overview-section">
      <div className="srcn-container">
        <div className="telephonic-overview-grid">
          <div className="telephonic-overview-content">
            <span className="telephonic-overview-kicker sub-title-red">{kicker}</span>
            <h2 className="telephonic-overview-title">{title}</h2>
            {desc ? (
              <p>{desc}</p>
            ) : (
              <>
                <p>
                  At Unimrkt Research, we believe meaningful research starts with understanding the question behind the business challenge. Our services bring together primary research, qualitative and quantitative methodologies, business research and specialized research support to help organizations gain a deeper understanding of their customers, markets and opportunities.
                </p>
                <p>
                  From exploring consumer needs and measuring market behaviour to evaluating new opportunities and understanding competitive landscapes, we design research solutions around your objectives, audience and market. Our experienced team combines the right methodology, structured processes and quality-focused execution to turn complex questions into reliable data and actionable insights.
                </p>
                <p>
                  Whether you need to explore, measure, validate or understand, Unimrkt provides the research expertise and capabilities to help you move from questions to insights and insights to informed decisions.
                </p>
              </>
            )}
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
