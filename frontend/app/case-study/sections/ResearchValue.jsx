import React from 'react';

export default function ResearchValue() {
  return (
    <section className="research-value-section">
      <div className="srcn-container">
        <div className="research-value-wrap">
          <div className="research-value-header">
            <span className="research-value-kicker career-values-kicker">Our Approach</span>
            <h2 className="research-value-title section-main-heading">
              Every Case Study Starts<br />With the Right Question
            </h2>
          </div>

          <div className="research-value-grid">
            <article className="research-value-card">
              <div className="value-icon-wrap">
                <img src="/asstes/images/icon/connection-icon-img.png" alt="Business Challenge Icon" />
              </div>
              <h3>1. The Challenge</h3>
              <p>What business problem needed solving?</p>
            </article>

            <article className="research-value-card">
              <div className="value-icon-wrap">
                <img src="/asstes/images/icon/analysis-research-icon-img.png" alt="Research Methodology Icon" />
              </div>
              <h3>2. The Research</h3>
              <p>Which methodology was used?</p>
            </article>

            <article className="research-value-card">
              <div className="value-icon-wrap">
                <img src="/asstes/images/icon/insight-icon-img.png" alt="Actionable Insight Icon" />
              </div>
              <h3>3. The Insight</h3>
              <p>What did the research reveal?</p>
            </article>

            <article className="research-value-card">
              <div className="value-icon-wrap">
                <img src="/asstes/images/icon/growth-impact-icon-img.png" alt="Business Growth Impact Icon" />
              </div>
              <h3>4. The Impact</h3>
              <p>How did the insight support the business?</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
