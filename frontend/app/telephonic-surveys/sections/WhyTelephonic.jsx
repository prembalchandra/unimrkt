import React from 'react';

const reasons = [
  {
    icon: '/asstes/images/icon/Define-icon-img.png',
    title: 'Wider Respondent Reach',
    desc: 'Connect with respondents across geographies, demographics and hard-to-reach segments.',
  },
  {
    icon: '/asstes/images/icon/hosting-server-icon-img.png',
    title: 'Faster Data Collection',
    desc: 'Collect structured feedback efficiently without the logistical complexity of face-to-face fieldwork.',
  },
  {
    icon: '/asstes/images/icon/Human-Interaction-icon-img.png',
    title: 'Human Interaction',
    desc: 'Interviewers can clarify questions, manage responses and maintain a natural flow throughout the conversation.',
  },
  {
    icon: '/asstes/images/icon/multi-language-capability-icon-img.png',
    title: 'Multi-Language Capability',
    desc: 'Conduct interviews in languages respondents are most comfortable speaking.',
  },
  {
    icon: '/asstes/images/icon/better-respondent-engagement-icon-img.png',
    title: 'Better Respondent Engagement',
    desc: 'Personal interaction can help improve participation and response quality for suitable research audiences.',
  },
  {
    icon: '/asstes/images/icon/Scalable-Research-icon-img.png',
    title: 'Scalable Research',
    desc: 'Scale interviews up or down according to sample size, geography and research objectives.',
  },
];

export default function WhyTelephonic() {
  return (
    <section className="why-telephonic-section approach-section">
      <div className="srcn-container">
        <div className="why-telephonic-container">
          <div className="why-telephonic-header career-journey-header">
            <span className="why-telephonic-kicker career-values-kicker career-journey-kicker">
              WHY TELEPHONIC SURVEYS?
            </span>
            <h2 className="why-telephonic-title approach-title section-main-heading">
              When the Right Questions<br />Need a Real Conversation
            </h2>
          </div>

          <div className="why-telephonic-grid approach-grid">
            {reasons.map((r, i) => (
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
