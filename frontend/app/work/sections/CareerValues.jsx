import React from 'react';

function getValueIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('team')) return '/asstes/images/icon/team-work-icon-img.png';
  if (t.includes('ethic') || t.includes('integrity') || t.includes('business')) return '/asstes/images/icon/business-icon-img.png';
  if (t.includes('diver')) return '/asstes/images/icon/diversity-icon-img.png';
  if (t.includes('transpar')) return '/asstes/images/icon/transparency-icon-img.png';
  return '/asstes/images/icon/communication-icon-img.png';
}

export default function CareerValues({ dynamicValues = null }) {
  const kicker = dynamicValues?.kicker || 'Core Values of Unimrkt';
  const heading = dynamicValues?.heading || dynamicValues?.title || 'What Drives Us';
  const description =
    dynamicValues?.description ||
    dynamicValues?.subtitle ||
    'Our values shape the way we work, collaborate, and create impact every day.';

  const valList = (dynamicValues?.values || []).map((v) => ({
    icon: getValueIcon(v.title),
    title: v.title,
  }));

  if (valList.length === 0) return null;

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
