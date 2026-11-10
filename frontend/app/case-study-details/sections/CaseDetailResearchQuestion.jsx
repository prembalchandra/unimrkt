import React from 'react';

export default function CaseDetailResearchQuestion({ dynamicSection = null }) {
  const displayKicker = dynamicSection?.kicker || 'THE RESEARCH QUESTION';
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || 'What Do Customers Really Expect From Their Financial Providers?';
  const displayDesc = dynamicSection?.description || 'We explored the complete customer perspective — from awareness and consideration to selection, usage, and ongoing engagement.';

  return (
    <section className="cs-detail-research-question-section">
      <div className="srcn-container">
        <div className="cs-question-card">
          <div className="cs-question-header">
            <span className="cs-kicker-red career-values-kicker">{displayKicker}</span>
            <h2 className="cs-question-title section-main-heading">
              {displayHeading}
            </h2>
            <p className="cs-question-desc section-sub-text">
              {displayDesc}
            </p>
          </div>

          {/* 5 Overlapping Pillars Diagram Component */}
          <div className="cs-diagram-container">
            <div className="cs-diagram-row">
              {/* 1. Trust */}
              <div className="cs-diagram-item cs-step-1">
                <div className="cs-circle-wrap">
                  <div className="cs-diagram-circle">
                    <img src="/asstes/images/icon/trust-shield-tick-icon-img.png" alt="trust" />
                  </div>
                </div>
                <div className="cs-diagram-stem"></div>
                <div className="cs-diagram-info">
                  <h4 className="cs-diagram-name">1. Trust</h4>
                  <p className="cs-diagram-text">What makes customers feel confident about a financial provider?</p>
                </div>
              </div>

              {/* 2. Convenience */}
              <div className="cs-diagram-item cs-step-2">
                <div className="cs-circle-wrap">
                  <div className="cs-diagram-circle">
                    <img src="/asstes/images/icon/convenience-iocn-img.png" alt="Convenience" />
                  </div>
                </div>
                <div className="cs-diagram-stem"></div>
                <div className="cs-diagram-info">
                  <h4 className="cs-diagram-name">2. Convenience</h4>
                  <p className="cs-diagram-text">How important are speed, accessibility, and ease of use?</p>
                </div>
              </div>

              {/* 3. Digital Experience */}
              <div className="cs-diagram-item cs-step-3">
                <div className="cs-circle-wrap">
                  <div className="cs-diagram-circle">
                    <img src="/asstes/images/icon/review-icon-img.png" alt="Digital Experience" />
                  </div>
                </div>
                <div className="cs-diagram-stem"></div>
                <div className="cs-diagram-info">
                  <h4 className="cs-diagram-name">3. Digital Experience</h4>
                  <p className="cs-diagram-text">What do customers expect from websites, apps, and digital services?</p>
                </div>
              </div>

              {/* 4. Relationship */}
              <div className="cs-diagram-item cs-step-4">
                <div className="cs-circle-wrap">
                  <div className="cs-diagram-circle">
                    <img src="/asstes/images/icon/handshake-partnership-icon-img.png" alt="Relationship" />
                  </div>
                </div>
                <div className="cs-diagram-stem"></div>
                <div className="cs-diagram-info">
                  <h4 className="cs-diagram-name">4. Relationship</h4>
                  <p className="cs-diagram-text">How do human interactions and advisory support impact perceptions?</p>
                </div>
              </div>

              {/* 5. Value */}
              <div className="cs-diagram-item cs-step-5">
                <div className="cs-circle-wrap">
                  <div className="cs-diagram-circle">
                    <img src="/asstes/images/icon/cup-research excellence-icon-img.png" alt="Value" />
                  </div>
                </div>
                <div className="cs-diagram-stem"></div>
                <div className="cs-diagram-info">
                  <h4 className="cs-diagram-name">5. Value</h4>
                  <p className="cs-diagram-text">What creates long-term differentiation beyond price?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
