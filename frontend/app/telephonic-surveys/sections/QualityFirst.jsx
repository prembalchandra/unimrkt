import React from 'react';

const qualityPoints = [
  { icon: '/asstes/images/icon/interviewer-icon-img.png', title: 'Interviewer Training', desc: 'Interviewers are trained on research goals and questionnaire flow.' },
  { icon: '/asstes/images/icon/sample-validation-icon-img.png', title: 'Sample Validation', desc: 'Respondents are screened against agreed research criteria.' },
  { icon: '/asstes/images/icon/call-monitoring-icon-img.png', title: 'Call Monitoring', desc: 'Fieldwork is monitored to maintain interviewing standards.' },
  { icon: '/asstes/images/icon/response-validation-icon-img.png', title: 'Response Validation', desc: 'Responses are reviewed for completeness and consistency.' },
  { icon: '/asstes/images/icon/data-quality-checks-icon-img.png', title: 'Data Quality Checks', desc: 'Structured checks identify anomalies and quality issues.' },
  { icon: '/asstes/images/icon/secure-data-handling-icon-img.png', title: 'Secure Data Handling', desc: 'Research data is securely managed to protect respondent privacy.' },
];

export default function QualityFirst() {
  return (
    <section className="quality-first-section">
      <div className="srcn-container quality-first-inner">
        <div className="quality-first-copy">
          <div className="quality-first-content-box">
            <span className="quality-first-kicker">QUALITY FIRST</span>
            <h2 className="quality-first-title section-main-heading">
              Every Conversation Counts.<br />Every Response Matters.
            </h2>
            <p className="quality-first-text">
              Reliable research starts with reliable data. Our quality framework is designed to maintain accuracy, consistency and respondent authenticity throughout the telephonic research process.
            </p>
          </div>
          <div className="quality-first-grid">
            {qualityPoints.map((item, index) => (
              <article key={index} className="quality-first-card">
                <div className="quality-first-icon">
                  <img src={item.icon} alt={item.title} />
                </div>
                <div className="quality-first-card-copy">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
