import React from 'react';

const values = [
  {
    icon: '/asstes/images/icon/Research-icon-img.png',
    title: 'Deep Research Expertise',
    desc: 'Experienced researchers who understand complex business problems and deliver clear, informed answers.',
  },
  {
    icon: '/asstes/images/icon/Research-icon-img.png',
    title: 'Global Reach',
    desc: 'Research capable across markets, audiences, and geographies with localized expertise and scalable execution.',
  },
  {
    icon: '/asstes/images/icon/Research-icon-img.png',
    title: 'Quality-First Approach',
    desc: 'Rigorous processes designed to ensure reliable data, trusted insights, and consistent reporting standards.',
  },
  {
    icon: '/asstes/images/icon/Research-icon-img.png',
    title: 'Business-Focused Insights',
    desc: 'We turn research findings into strategic direction that supports smarter, faster business decisions.',
  },
];

export default function ResearchValue() {
  return (
    <section className="research-value-section">
      <div className="srcn-container">
        <div className="research-value-wrap">
          <div className="research-value-header">
            <span className="research-value-kicker career-values-kicker">Why work with Unimrkt</span>
            <h2 className="research-value-title section-main-heading">
              More Than Research.<br />A Partner For Better Decisions.
            </h2>
            <p className="research-value-subtitle section-sub-text">
              From defining the research question to delivering actionable insights, our team helps businesses build
              confidence through accurate data, sharper strategy, and measurable outcomes.
            </p>
          </div>

          <div className="research-value-grid">
            {values.map((val, idx) => (
              <article key={idx} className="research-value-card">
                <div className="value-icon-wrap">
                  <img src={val.icon} alt={val.title} />
                </div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
