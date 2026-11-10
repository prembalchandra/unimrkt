import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

function getValueIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('team')) return getStrapiMedia('/uploads/team-work-icon-img.png');
  if (t.includes('ethic') || t.includes('integrity') || t.includes('business')) return getStrapiMedia('/uploads/business-icon-img.png');
  if (t.includes('diver')) return getStrapiMedia('/uploads/diversity-icon-img.png');
  if (t.includes('transpar')) return getStrapiMedia('/uploads/transparency-icon-img.png');
  return getStrapiMedia('/uploads/communication-icon-img.png');
}

export default function CareerValues({ dynamicValues = null }) {
  const kicker = dynamicValues?.kicker;
  const heading = dynamicValues?.heading || dynamicValues?.title;
  const description = dynamicValues?.description || dynamicValues?.subtitle;

  const valList = (dynamicValues?.values || []).map((v) => ({
    icon: v.icon ? getStrapiMedia(v.icon) : getValueIcon(v.title),
    title: v.title || '',
  }));

  if (valList.length === 0 && !heading) return null;

  return (
    <section className="career-values-section">
      <div className="srcn-container">
        {(kicker || heading || description) && (
          <header className="career-values-header">
            {kicker && <span className="career-values-kicker">{kicker}</span>}
            {heading && <h2 className="section-main-heading">{heading}</h2>}
            {description && <p className="section-sub-text">{description}</p>}
          </header>
        )}
        {valList.length > 0 && (
          <div className="career-values-grid">
            {valList.map((v, i) => (
              <div key={i} className="career-value-col">
                <div className="career-value-card">
                  {v.icon && (
                    <div className="career-value-icon">
                      <img src={v.icon} alt={v.title} />
                    </div>
                  )}
                  {v.title && <h3>{v.title}</h3>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
