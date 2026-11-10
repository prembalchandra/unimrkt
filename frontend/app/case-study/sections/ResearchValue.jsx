import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

function getValueIcon(idx = 0) {
  const icons = [
    getStrapiMedia('/uploads/connection-icon-img.png'),
    getStrapiMedia('/uploads/analysis-research-icon-img.png'),
    getStrapiMedia('/uploads/insight-icon-img.png'),
    getStrapiMedia('/uploads/growth-impact-icon-img.png')
  ];
  return icons[idx % icons.length];
}

export default function ResearchValue({ dynamicValues = null }) {
  const kicker = dynamicValues?.kicker;
  const heading = dynamicValues?.heading || dynamicValues?.title;
  const rawCards = dynamicValues?.values || [];

  const cards = rawCards.map((v, i) => ({
    icon: v.icon ? getStrapiMedia(v.icon) : getValueIcon(i),
    title: v.title || '',
    desc: v.description || '',
  }));

  if (cards.length === 0 && !heading) return null;

  return (
    <section className="research-value-section">
      <div className="srcn-container">
        <div className="research-value-wrap">
          {(kicker || heading) && (
            <div className="research-value-header">
              {kicker && <span className="research-value-kicker career-values-kicker">{kicker}</span>}
              {heading && (
                <h2 className="research-value-title section-main-heading">
                  {heading}
                </h2>
              )}
            </div>
          )}

          {cards.length > 0 && (
            <div className="research-value-grid">
              {cards.map((card, idx) => (
                <article key={idx} className="research-value-card">
                  {card.icon && (
                    <div className="value-icon-wrap">
                      <img src={card.icon} alt={card.title} />
                    </div>
                  )}
                  {card.title && <h3>{card.title}</h3>}
                  {card.desc && <p>{card.desc}</p>}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
