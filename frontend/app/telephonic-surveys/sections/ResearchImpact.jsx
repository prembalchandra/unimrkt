import React from 'react';

export default function ResearchImpact() {
  return (
    <section className="research-impact-section">
      <div className="srcn-container">
        <div className="section-header-area research-impact-header">
          <h2 className="section-main-heading research-impact-title">Research Built Around Every Conversation</h2>
        </div>

        <div className="research-impact-grid">
          <article className="research-impact-col">
            <div className="research-impact-card">
              <div className="research-impact-icon">
                <img src="/asstes/images/icon/group-cati-interviws-icon-img.png" alt="CATI Interviews" />
              </div>
              <div className="research-impact-contnet-area">
                <h3 className="research-impact-number">100K+</h3>
                <p className="research-impact-label">CATI Interviews</p>
              </div>
            </div>
          </article>
          <article className="research-impact-col">
            <div className="research-impact-card">
              <div className="research-impact-icon">
                <img src="/asstes/images/icon/research-markets-icon-img.png" alt="Research Markets" />
              </div>
              <div className="research-impact-contnet-area">
                <h3 className="research-impact-number">50+</h3>
                <p className="research-impact-label">Research Markets</p>
              </div>
            </div>
          </article>
          <article className="research-impact-col">
            <div className="research-impact-card">
              <div className="research-impact-icon">
                <img src="/asstes/images/icon/interview-capabilities-icon-img.png" alt="Interviewer Capabilities" />
              </div>
              <div className="research-impact-contnet-area">
                <h3 className="research-impact-number">Multi-Lingual</h3>
                <p className="research-impact-label">Interviewer Capabilities</p>
              </div>
            </div>
          </article>
          <article className="research-impact-col">
            <div className="research-impact-card">
              <div className="research-impact-icon">
                <img src="/asstes/images/icon/every-stage-icon-img.png" alt="Quality Controlled" />
              </div>
              <div className="research-impact-contnet-area">
                <h3 className="research-impact-number">Quality-Controlled</h3>
                <p className="research-impact-label">Every Stage</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
