import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function AutomotiveEmpowerCta({ dynamicCta = null }) {
  const kicker = dynamicCta?.kicker;
  const title = dynamicCta?.title || dynamicCta?.heading;
  const desc = dynamicCta?.description;
  const image = getStrapiMedia(dynamicCta?.image, getStrapiMedia('/uploads/automotive-research-img.png'));

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
              <div className="telephonic-overview-figure">
                <img src={image} alt={title || 'Automotive Research'} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
