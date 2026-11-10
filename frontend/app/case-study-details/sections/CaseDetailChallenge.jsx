import React from 'react';
import { getStrapiMedia } from '../../../lib/strapi';

export default function CaseDetailChallenge({ dynamicSection = null }) {
  const displayKicker = dynamicSection?.kicker || 'THE CHALLENGE';
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || 'Financial Expectations Were Changing Faster Than Ever';
  const displayDesc = dynamicSection?.description;
  const image = getStrapiMedia(dynamicSection?.image, '/asstes/images/challenge-portrait.png');

  return (
    <section className="cs-detail-challenge-section">
      <div className="srcn-container">
        <div className="cs-challenge-grid">
          {/* Left: Circular Avatar Image */}
          <div className="cs-challenge-visual">
            <div className="cs-challenge-avatar-frame">
              <img src={image} alt={displayHeading} />
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
              <>
                <p className="cs-challenge-text">
                  As financial services become increasingly digital, customers expect more than competitive products. They want simplicity, transparency, personalization, speed, and seamless experiences across every interaction.
                </p>

                <p className="cs-challenge-subtitle">Our client needed to understand:</p>
                <ul className="cs-challenge-bullets">
                  <li>What customers truly value when choosing financial services</li>
                  <li>How expectations differ across customer segments</li>
                  <li>What drives trust, consideration, and loyalty</li>
                  <li>How digital experiences influence financial decisions</li>
                  <li>Where existing customer journeys create friction</li>
                  <li>Which service improvements could create stronger engagement</li>
                </ul>

                <p className="cs-challenge-summary">
                  The challenge was to move beyond basic satisfaction scores and uncover the real motivations behind customer expectations.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
