import React from 'react';

export default function AbouPrimaryOverview() {
  return (
    <section className="telephonic-overview-section">
      <div className="srcn-container">
        <div className="telephonic-overview-grid">
          <div className="telephonic-overview-content">
            <span className="telephonic-overview-kicker sub-title-red">About Primary Research</span>
            <h2 className="telephonic-overview-title">First-Hand Insights That Power Better Business Decisions</h2>
            <div className='abou-Primary-overview'>
              <p>
                Primary research enables organizations to collect reliable information directly from customers, businesses, and stakeholders. At Unimrkt Research, we design customized research programs using qualitative and quantitative methodologies to help businesses understand markets, validate ideas, measure customer experience, and uncover new opportunities.
              </p>
              <p>
                Our experienced research professionals combine global reach, advanced technology, and proven methodologies to deliver accurate, high-quality data tailored to every project.
              </p>
            </div>
            <div className="primary-overview-badges">
              <div className="primary-overview-badge-item">
                <div className="badge-icon-box">
                  <img src="/asstes/images/icon/customized-icon-img.png" alt="Customized Research Solutions" />
                </div>
                <div className="badge-text-box">
                  Customized<br/>
                  Research Solutions
                </div>
              </div>
              <div className="primary-overview-badge-item">
                <div className="badge-icon-box">
                  <img src="/asstes/images/icon/diverse-audiences-icon-img.png" alt="Experienced Research Team" />
                </div>
                <div className="badge-text-box">
                  Experienced<br/>
                  Research Team
                </div>
              </div>
              <div className="primary-overview-badge-item">
                <div className="badge-icon-box">
                  <img src="/asstes/images/icon/reliable-insights-icon-img.png" alt="Accurate & Reliable Insights" />
                </div>
                <div className="badge-text-box">
                  Accurate &amp;<br/>
                  Reliable Insights
                </div>
              </div>
            </div>
          </div>

          <div className="telephonic-overview-visual-wrap">
            <div className="telephonic-overview-figure abou-Primary-img">
              <img src="/asstes/images/primary-research-about-img.png" alt="First-Hand Insights That Power Better Business Decisions" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
