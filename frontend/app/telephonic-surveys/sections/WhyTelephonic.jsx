import React from 'react';

function getReasonIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('reach') || t.includes('define')) return '/asstes/images/icon/Define-icon-img.png';
  if (t.includes('fast') || t.includes('server')) return '/asstes/images/icon/hosting-server-icon-img.png';
  if (t.includes('human') || t.includes('interaction')) return '/asstes/images/icon/Human-Interaction-icon-img.png';
  if (t.includes('language')) return '/asstes/images/icon/multi-language-capability-icon-img.png';
  if (t.includes('engagement') || t.includes('better')) return '/asstes/images/icon/better-respondent-engagement-icon-img.png';
  return '/asstes/images/icon/Scalable-Research-icon-img.png';
}

export default function WhyTelephonic({ dynamicValues = null }) {
  const reasonsList = (dynamicValues?.values || []).map((v) => ({
    icon: getReasonIcon(v.title),
    title: v.title || '',
    desc: v.description || '',
  }));

  if (reasonsList.length === 0) return null;

  return (
    <section className="why-telephonic-section approach-section">
      <div className="srcn-container">
        <div className="why-telephonic-container">
          <div className="why-telephonic-header career-journey-header">
            <span className="why-telephonic-kicker career-values-kicker career-journey-kicker">
              {dynamicValues?.kicker || 'WHY TELEPHONIC SURVEYS?'}
            </span>
            <h2 className="why-telephonic-title approach-title section-main-heading">
              {dynamicValues?.title || 'When the Right Questions Need a Real Conversation'}
            </h2>
          </div>

          <div className="why-telephonic-grid approach-grid">
            {reasonsList.map((r, i) => (
              <article key={i} className="why-telephonic-card approach-card career-journey-step">
                <div className="why-telephonic-card-area">
                  <div className="why-telephonic-icon approach-icon career-journey-icon">
                    <img src={r.icon} alt={r.title} />
                  </div>
                  <div className="why-telephonic-card-content">
                    <h3>{r.title}</h3>
                    <p>{r.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
