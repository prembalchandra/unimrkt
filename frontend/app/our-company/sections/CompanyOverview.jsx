import React from 'react';
import Link from 'next/link';

const companyPillars = [
  {
    icon: '/asstes/images/icon/global-reach-icon-img.png',
    title: 'Global Reach',
    desc: 'Access diverse markets across continents.',
  },
  {
    icon: '/asstes/images/icon/deep-expertise-profile-2user-iocn-img.png',
    title: 'Deep Expertise',
    desc: 'Experienced researchers across industries.',
  },
  {
    icon: '/asstes/images/icon/faster-decisions-timer-icon-img.png',
    title: 'Faster Decisions',
    desc: 'Clear insights delivered when they matter.',
  },
  {
    icon: '/asstes/images/icon/shield-tick-reliable-quality.png',
    title: 'Reliable Quality',
    desc: 'Research built on rigorous standards.',
  },
];

export default function CompanyOverview() {
  return (
    <>
      <section className="research-value-section">
        <div className="srcn-container">
          <div className="research-value-wrap">
            <div className="research-value-header">
              <span className="research-value-kicker career-values-kicker">Why Businesses Choose Unimrkt</span>
              <h2 className="research-value-title section-main-heading">
                Insights That Move Businesses Forward
              </h2>
              <p>Transforming complex data into clear, actionable insights that help businesses make smarter decisions and unlock new opportunities.</p>
            </div>
            <div className="research-value-grid">
              {companyPillars.map((pillar, idx) => (
                <article key={idx} className="research-value-card">
                  <div className="value-icon-wrap">
                    <img src={pillar.icon} alt={pillar.title} />
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
