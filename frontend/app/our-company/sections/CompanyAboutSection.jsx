import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function CompanyAboutSection({ dynamicRichText = null }) {
  const kicker = dynamicRichText?.kicker;
  const title = dynamicRichText?.title;
  const image = getStrapiMedia('/uploads/company-about-img.png');

  const renderContent = () => {
    if (dynamicRichText?.content && Array.isArray(dynamicRichText.content)) {
      return dynamicRichText.content.map((block, idx) => {
        const text = block.children?.map((c) => c.text).join('') || '';
        return <p key={idx}>{text}</p>;
      });
    }
    if (dynamicRichText?.description) {
      return <p>{dynamicRichText.description}</p>;
    }
    return null;
  };

  if (!title && !dynamicRichText?.content && !dynamicRichText?.description) return null;

  return (
    <section className="telephonic-overview-section">
      <div className="srcn-container">
        <div className="telephonic-overview-grid">
          <div className="telephonic-overview-content">
            {kicker && <span className="telephonic-overview-kicker sub-title-red">{kicker}</span>}
            {title && <h2 className="telephonic-overview-title">{title}</h2>}
            {renderContent()}
          </div>

          {image && (
            <div className="telephonic-overview-visual-wrap">
              <div className="telephonic-overview-figure abou-Primary-img">
                <img src={image} alt={title || 'About Unimrkt'} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
