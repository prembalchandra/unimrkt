import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function AutomotiveAboutOverview({ dynamicOverview = null }) {
  const kicker = dynamicOverview?.kicker;
  const title = dynamicOverview?.title || dynamicOverview?.heading;
  const desc = dynamicOverview?.description;
  const image = getStrapiMedia(dynamicOverview?.image, getStrapiMedia('/uploads/automotives-about-img.png'));

  if (!title && !desc) return null;

  return (
    <section className="telephonic-overview-section">
      <div className="srcn-container">
        <div className="telephonic-overview-grid">
          <div className="telephonic-overview-content">
            {kicker && <span className="telephonic-overview-kicker sub-title-red">{kicker}</span>}
            {title && <h2 className="telephonic-overview-title">{title}</h2>}
            <div className="abou-Primary-overview">
              {desc && <p>{desc}</p>}
            </div>
          </div>

          {image && (
            <div className="telephonic-overview-visual-wrap">
              <div className="telephonic-overview-figure abou-Primary-img">
                <img src={image} alt={title || 'Automotive Overview'} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
