import React from 'react';
import { getStrapiMedia } from '../../../lib/strapi';

const defaultBullets = [
  'What customers truly value when choosing financial services',
  'How expectations differ across customer segments',
  'What drives trust, consideration, and loyalty',
  'How digital experiences influence financial decisions',
  'Where existing customer journeys create friction',
  'Which service improvements could create stronger engagement',
];

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
  const displayKicker = kicker || dynamicSection?.kicker || dynamicSection?.challengeKicker || 'THE CHALLENGE';
  const displayHeading = heading || dynamicSection?.heading || dynamicSection?.title || dynamicSection?.challengeTitle || 'Financial Expectations Were Changing Faster Than Ever';
  const displayDesc = description || dynamicSection?.description || dynamicSection?.challengeDescription;
  const displaySubtitle = subtitle || dynamicSection?.subtitle || dynamicSection?.challengeSubtitle || 'Our client needed to understand:';
  const displayBullets = (bullets && bullets.length > 0)
    ? bullets
    : (dynamicSection?.challengeBullets && dynamicSection.challengeBullets.length > 0)
      ? dynamicSection.challengeBullets.map(b => typeof b === 'string' ? b : b.text || b.title || '')
      : defaultBullets;
  const displaySummary = summary || dynamicSection?.summary || dynamicSection?.challengeSummary || 'The challenge was to move beyond basic satisfaction scores and uncover the real motivations behind customer expectations.';
  const visualImage = getStrapiMedia(image || dynamicSection?.image || dynamicSection?.challengeImage, '/asstes/images/challenge-portrait.png');

  return (
    <section className="cs-detail-challenge-section">
      <div className="srcn-container">
        <div className="cs-challenge-grid">
          {/* Left: Circular Avatar Image */}
          <div className="cs-challenge-visual">
            <div className="cs-challenge-avatar-frame">
              <img src={visualImage} alt={displayHeading} />
            </div>
          </div>

          {/* Right: Content */}
          <div className="cs-challenge-content">
            <span className="cs-kicker-red career-values-kicker">{displayKicker}</span>
            <h2 className="cs-challenge-title section-main-heading">
              {displayHeading}
            </h2>
            {displayDesc ? (
              <p className="cs-challenge-text">{displayDesc}</p>
            ) : (
              <p className="cs-challenge-text">
                As financial services become increasingly digital, customers expect more than competitive products. They want simplicity, transparency, personalization, speed, and seamless experiences across every interaction.
              </p>
            )}

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
