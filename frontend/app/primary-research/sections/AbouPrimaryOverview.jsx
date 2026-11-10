import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function AbouPrimaryOverview({ dynamicOverview = null }) {
  if (!dynamicOverview) return null;

  const kicker = dynamicOverview.kicker;
  const title = dynamicOverview.title || dynamicOverview.heading;
  const desc = dynamicOverview.description;
  const image = getStrapiMedia(dynamicOverview.image);

  if (!title && !desc) return null;

  return (
    <section className="telephonic-overview-section">
      <div className="srcn-container">
        <div className="telephonic-overview-grid">
          <div className="telephonic-overview-content">
            {kicker && <span className="telephonic-overview-kicker sub-title-red">{kicker}</span>}
            {title && <h2 className="telephonic-overview-title">{title}</h2>}
            {desc && (
              <div className="abou-Primary-overview">
                <p>{desc}</p>
              </div>
            )}
            <div className="primary-overview-badges">
              <div className="primary-overview-badge-item">
                <div className="badge-text-box">
                  Customized<br/>
                  Research Solutions
                </div>
              </div>
              <div className="primary-overview-badge-item">
                <div className="badge-text-box">
                  Experienced<br/>
                  Research Team
                </div>
              </div>
              <div className="primary-overview-badge-item">
                <div className="badge-text-box">
                  Accurate &amp;<br/>
                  Reliable Insights
                </div>
              </div>
            </div>
          </div>

          {image && (
            <div className="telephonic-overview-visual-wrap">
              <div className="telephonic-overview-figure">
                <img src={image} alt={title || ''} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
