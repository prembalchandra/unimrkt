import React from 'react';

function getJourneyIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('apply')) return '/asstes/images/icon/clipboard-tick-icon-img.png';
  if (t.includes('connect')) return '/asstes/images/icon/profile-2user.png';
  if (t.includes('interview')) return '/asstes/images/icon/Interview-user-tag-icon-img.png';
  return '/asstes/images/icon/job-icon-img.png';
}

export default function CareerJourney({ dynamicJourney = null }) {
  const stepsList = (dynamicJourney?.values || []).map((s) => ({
    icon: getJourneyIcon(s.title),
    num: s.title || '',
    desc: s.description || '',
  }));

  if (stepsList.length === 0) return null;

  return (
    <section className="career-journey-section">
      <div className="srcn-container">
        <header className="career-journey-header">
          <span className="career-journey-kicker career-values-kicker">
            {dynamicJourney?.kicker || 'Your Career Journey'}
          </span>
          <h2 className="section-main-heading">
            {dynamicJourney?.title || 'Grow With Purpose'}
          </h2>
          <p className="section-sub-text">
            {dynamicJourney?.subtitle ||
              'Explore opportunities, meet our team, and take the next step toward a meaningful career at Unimrkt.'}
          </p>
        </header>

        <div className="career-journey-steps">
          {stepsList.map((s, i) => (
            <div key={i} className="career-journey-step">
              <div className="career-journey-icon">
                <img src={s.icon} alt={s.desc} />
              </div>
              <div className="career-journey-content">
                <h3>{s.num}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
