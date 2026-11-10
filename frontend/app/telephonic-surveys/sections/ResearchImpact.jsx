import React from 'react';

const defaultMetrics = [
  { icon: '/asstes/images/icon/group-cati-interviws-icon-img.png', stat: '100K+', label: 'CATI Interviews' },
  { icon: '/asstes/images/icon/research-markets-icon-img.png', stat: '50+', label: 'Research Markets' },
  { icon: '/asstes/images/icon/interview-capabilities-icon-img.png', stat: 'Multi-Lingual', label: 'Interviewer Capabilities' },
  { icon: '/asstes/images/icon/every-stage-icon-img.png', stat: 'Quality-Controlled', label: 'Every Stage' },
];

export default function ResearchImpact({ dynamicMetrics = null }) {
  const displayHeading = dynamicMetrics?.heading || dynamicMetrics?.title || 'Research Built Around Every Conversation';
  const metrics = (dynamicMetrics?.metrics && dynamicMetrics.metrics.length > 0)
    ? dynamicMetrics.metrics
    : (dynamicMetrics?.cards && dynamicMetrics.cards.length > 0)
      ? dynamicMetrics.cards
      : defaultMetrics;

  return (
    <section className="research-impact-section">
      <div className="srcn-container">
        <div className="section-header-area research-impact-header">
          {dynamicMetrics?.kicker && (
            <span className="sub-title-red" style={{ display: 'block', marginBottom: '8px' }}>
              {dynamicMetrics.kicker}
            </span>
          )}
          <h2 className="section-main-heading research-impact-title">{displayHeading}</h2>
        </div>

        <div className="research-impact-grid">
          {metrics.map((item, index) => {
            const icon = item.icon || item.iconClass || defaultMetrics[index % defaultMetrics.length].icon;
            const number = item.stat || item.number || item.title;
            const label = item.label || item.desc || item.description;

            return (
              <article className="research-impact-col" key={item.id || index}>
                <div className="research-impact-card">
                  <div className="research-impact-icon">
                    <img src={icon} alt={label || 'Research Metric'} />
                  </div>
                  <div className="research-impact-content-area">
                    <h3 className="research-impact-number">{number}</h3>
                    <p className="research-impact-label">{label}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
