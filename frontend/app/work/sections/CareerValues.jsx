import React from 'react';

const defaultValues = [
  { icon: '/asstes/images/icon/communication-icon-img.png', title: 'Clear Communication' },
  { icon: '/asstes/images/icon/communication-icon-img.png', title: 'Innovation' },
  { icon: '/asstes/images/icon/communication-icon-img.png', title: 'Wisdom' },
  { icon: '/asstes/images/icon/communication-icon-img.png', title: 'Integrity' },
  { icon: '/asstes/images/icon/team-work-icon-img.png', title: 'Team Work' },
  { icon: '/asstes/images/icon/business-icon-img.png', title: 'Business Ethics' },
  { icon: '/asstes/images/icon/diversity-icon-img.png', title: 'Diversity' },
  { icon: '/asstes/images/icon/transparency-icon-img.png', title: 'Transparency' },
];

export default function CareerValues({ dynamicValues = null }) {
  const kicker = dynamicValues?.kicker || 'Core Values of Unimrkt';
  const heading = dynamicValues?.heading || 'What Drives Us';
  const description =
    dynamicValues?.description ||
    'Our values shape the way we work, collaborate, and create impact every day.';

  const valList =
    dynamicValues?.values && dynamicValues.values.length > 0
      ? dynamicValues.values.map((v, i) => ({
          icon: defaultValues[i % defaultValues.length].icon,
          title: v.title,
        }))
      : defaultValues;

  return (
    <section className="career-values-section">
      <div className="srcn-container">
        <header className="career-values-header">
          <span className="career-values-kicker">{kicker}</span>
          <h2 className="section-main-heading">{heading}</h2>
          <p className="section-sub-text">{description}</p>
        </header>
        <div className="career-values-grid">
          {valList.map((v, i) => (
            <div key={i} className="career-value-col">
              <div className="career-value-card">
                <div className="career-value-icon">
                  <img src={v.icon} alt={v.title} />
                </div>
                <h3>{v.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
