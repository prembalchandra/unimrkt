import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

function getJourneyIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('apply')) return getStrapiMedia('/uploads/clipboard-tick-icon-img.png');
  if (t.includes('connect')) return getStrapiMedia('/uploads/profile-2user.png');
  if (t.includes('interview')) return getStrapiMedia('/uploads/Interview-user-tag-icon-img.png');
  return getStrapiMedia('/uploads/job-icon-img.png');
}

export default function CareerJourney({ dynamicJourney = null }) {
  const kicker = dynamicJourney?.kicker;
  const heading = dynamicJourney?.title || dynamicJourney?.heading;
  const description = dynamicJourney?.subtitle || dynamicJourney?.description;

  const stepsList = (dynamicJourney?.values || []).map((s) => ({
    icon: s.icon ? getStrapiMedia(s.icon) : getJourneyIcon(s.title),
    num: s.title || '',
    desc: s.description || '',
  }));

  if (stepsList.length === 0 && !heading) return null;

  return (
    <section className="career-journey-section">
      <div className="srcn-container">
        {(kicker || heading || description) && (
          <header className="career-journey-header">
            {kicker && <span className="career-journey-kicker career-values-kicker">{kicker}</span>}
            {heading && <h2 className="section-main-heading">{heading}</h2>}
            {description && <p className="section-sub-text">{description}</p>}
          </header>
        )}

        {stepsList.length > 0 && (
          <div className="career-journey-steps">
            {stepsList.map((s, i) => (
              <div key={i} className="career-journey-step">
                {s.icon && (
                  <div className="career-journey-icon">
                    <img src={s.icon} alt={s.desc || s.num} />
                  </div>
                )}
                <div className="career-journey-content">
                  {s.num && <h3>{s.num}</h3>}
                  {s.desc && <p>{s.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
