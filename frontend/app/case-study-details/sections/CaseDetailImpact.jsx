import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function CaseDetailImpact({ impacts = [], kicker, heading, description }) {
  const impactsToRender = impacts || [];

  if (impactsToRender.length === 0 && !heading) return null;

  const cardIcon = getStrapiMedia('/uploads/identified-icon-img.png');

  return (
    <section className="impact-section">
      <div className="srcn-container">
        <div className="impact-container">
          {(kicker || heading || description) && (
            <div className="impact-header career-journey-header">
              {kicker && <span className="impact-subtitle career-values-kicker">{kicker}</span>}
              {heading && <h2 className="impact-title section-main-heading">{heading}</h2>}
              {description && <p className="impact-description section-sub-text">{description}</p>}
            </div>
          )}

          {impactsToRender.length > 0 && (
            <div className="impact-cards-wrapper-area">
              <div className="impact-cards-grid">
                {impactsToRender.map((item, index) => {
                  const title = typeof item === 'string' ? item : item.title || item.heading || '';
                  return (
                    <article key={item.id || index} className="impact-card">
                      <div className="impact-card-area">
                        {cardIcon && (
                          <div className="impact-icon">
                            <img src={cardIcon} alt={title.replace(/\n/g, ' ')} />
                          </div>
                        )}
                        <div className="impact-card-content-area">
                          <h3>
                            {title.split('\n').map((line, i) => (
                              <React.Fragment key={i}>
                                {line}
                                {i < title.split('\n').length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </h3>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
