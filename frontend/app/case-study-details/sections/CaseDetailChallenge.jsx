import React from 'react';

export default function CaseDetailChallenge() {
  return (
    <section className="cs-detail-challenge-section">
      <div className="srcn-container">
        <div className="cs-challenge-grid">
          {/* Left: Circular Avatar Image */}
          <div className="cs-challenge-visual">
            <div className="cs-challenge-avatar-frame">
              <img src="/asstes/images/challenge-portrait.png" alt="Financial Expectations Challenge" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="cs-challenge-content">
            <span className="cs-kicker-red career-values-kicker">THE CHALLENGE</span>
            <h2 className="cs-challenge-title section-main-heading">
              Financial Expectations Were Changing Faster Than Ever
            </h2>
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
          </div>
        </div>
      </div>
    </section>
  );
}
