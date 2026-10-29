import React from 'react';

const steps = [
  { icon: '/asstes/images/icon/clipboard-tick-icon-img.png', num: '1. Apply', desc: 'Find a role that fits your skills and submit your application.' },
  { icon: '/asstes/images/icon/profile-2user.png', num: '2. Connect', desc: 'Our team will review your profile and get in touch about next steps.' },
  { icon: '/asstes/images/icon/Interview-user-tag-icon-img.png', num: '3. Interview', desc: 'Meet the team and discuss your experience, strengths, and goals.' },
  { icon: '/asstes/images/icon/job-icon-img.png', num: '4. Join', desc: 'Take the next step and grow your career with Unimrkt.' },
];

export default function CareerJourney() {
  return (
    <section className="career-journey-section">
      <div className="srcn-container">
        <header className="career-journey-header">
          <span className="career-journey-kicker career-values-kicker">Your Career Journey</span>
          <h2 className="section-main-heading">Grow With Purpose</h2>
          <p className="section-sub-text">
            Explore opportunities, meet our team, and take the next step toward a meaningful career at Unimrkt.
          </p>
        </header>

        <div className="career-journey-steps">
          {steps.map((s, i) => (
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
