import React from 'react';

function getImpactIcon(label = '') {
  const l = (label || '').toLowerCase();
  if (l.includes('countr')) return '/asstes/images/icon/countries-icon-img.png';
  if (l.includes('lang')) return '/asstes/images/icon/every-stage-icon-img.png';
  if (l.includes('cati') || l.includes('phone') || l.includes('station')) return '/asstes/images/icon/phone-icon-img.png';
  return '/asstes/images/icon/experience-icon-img.png';
}

export default function ResearchImpact({ dynamicMetrics = null }) {
  const metrics = (dynamicMetrics?.metrics || []).map((m) => ({
    number: m.number || '',
    label: m.label || '',
    icon: getImpactIcon(m.label),
  }));

  if (metrics.length === 0) return null;

  return (
    <section className="research-impact-section">
      <div className="srcn-container">
        <div className="section-header-area research-impact-header">
          <h2 className="section-main-heading research-impact-title">
            {dynamicMetrics?.title || 'Research at a Global Scale'}
          </h2>
        </div>

        <div className="research-impact-grid">
          {metrics.map((stat, idx) => (
            <article key={idx} className="research-impact-col">
              <div className="research-impact-card">
                <div className="research-impact-icon">
                  <img src={stat.icon} alt={stat.label} />
                </div>
                <div className="research-impact-content-area">
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
