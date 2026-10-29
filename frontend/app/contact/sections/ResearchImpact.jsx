import React from 'react';

const stats = [
  {
    icon: '/asstes/images/icon/countries-icon-img.png',
    number: '90+',
    label: 'Countries',
  },
  {
    icon: '/asstes/images/icon/every-stage-icon-img.png',
    number: '22+',
    label: 'Languages',
  },
  {
    icon: '/asstes/images/icon/phone-icon-img.png',
    number: '450+',
    label: 'CATI Stations',
  },
  {
    icon: '/asstes/images/icon/experience-icon-img.png',
    number: '16+',
    label: 'Years of Experience',
  },
];

export default function ResearchImpact() {
  return (
    <section className="research-impact-section">
      <div className="srcn-container">
        <div className="section-header-area research-impact-header">
          <h2 className="section-main-heading research-impact-title">Research at a Global Scale</h2>
        </div>

        <div className="research-impact-grid">
          {stats.map((stat, idx) => (
            <article key={idx} className="research-impact-col">
              <div className="research-impact-card">
                <div className="research-impact-icon">
                  <img src={stat.icon} alt={stat.label} />
                </div>
                <div className="research-impact-contnet-area">
                  <h3 className="research-impact-number">{stat.number}</h3>
                  <p className="research-impact-label">{stat.label}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
