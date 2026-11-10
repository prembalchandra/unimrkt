import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function CaseDetailChallenge({
  dynamicSection = null,
  kicker = null,
  heading = null,
  description = null,
  subtitle = null,
  bullets = [],
  summary = null,
  image = null,
}) {
  const displayKicker = kicker || dynamicSection?.kicker || dynamicSection?.challengeKicker;
  const displayHeading = heading || dynamicSection?.heading || dynamicSection?.title || dynamicSection?.challengeTitle;
  const displayDesc = description || dynamicSection?.description || dynamicSection?.challengeDescription;
  const displaySubtitle = subtitle || dynamicSection?.subtitle || dynamicSection?.challengeSubtitle;
  const displayBullets = (bullets && bullets.length > 0)
    ? bullets
    : (dynamicSection?.challengeBullets && dynamicSection.challengeBullets.length > 0)
      ? dynamicSection.challengeBullets.map(b => typeof b === 'string' ? b : b.text || b.title || '')
      : [];
  const displaySummary = summary || dynamicSection?.summary || dynamicSection?.challengeSummary;
  const visualImage = getStrapiMedia(image || dynamicSection?.image || dynamicSection?.challengeImage, getStrapiMedia('/uploads/challenge-portrait.png'));

  if (!displayHeading && !displayDesc && displayBullets.length === 0) return null;

  return (
    <section className="cs-detail-challenge-section">
      <div className="srcn-container">
        <div className="cs-challenge-grid">
          {/* Left: Circular Avatar Image */}
          {visualImage && (
            <div className="cs-challenge-visual">
              <div className="cs-challenge-avatar-frame">
                <img src={visualImage} alt={displayHeading || 'Challenge'} />
              </div>
            </div>
          )}

          {/* Right: Content */}
          <div className="cs-challenge-content">
            {displayKicker && <span className="cs-kicker-red career-values-kicker">{displayKicker}</span>}
            {displayHeading && <h2 className="cs-challenge-title section-main-heading">{displayHeading}</h2>}
            {displayDesc && <p className="cs-challenge-text">{displayDesc}</p>}

            {displaySubtitle && <p className="cs-challenge-subtitle">{displaySubtitle}</p>}
            {displayBullets.length > 0 && (
              <ul className="cs-challenge-bullets">
                {displayBullets.map((b, idx) => (
                  <li key={idx}>{typeof b === 'string' ? b : b.text || b.title}</li>
                ))}
              </ul>
            )}

            {displaySummary && <p className="cs-challenge-summary">{displaySummary}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
