import React from 'react';

const defaultIcons = [
  '/asstes/images/icon/cup-research excellence-icon-img.png',
  '/asstes/images/icon/global-icon-img.png',
  '/asstes/images/icon/language-square.png',
  '/asstes/images/icon/profile-2user.png',
  '/asstes/images/icon/3d-cube-scan.png',
  '/asstes/images/icon/trust-shield-tick-icon-img.png',
];

export default function WhyChooseUs({ items = [], title, description }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="why-choose-unimrkt-section">
      <div className="srcn-container">
        <div className="why-choose-header">
          <h2 className="why-choose-title">
            {title || 'Why Choose Unimrkt?'}
          </h2>

          <p className="why-choose-desc">
            {description || 'With 16+ years of expertise, global research capabilities, advanced methodologies, and trusted data quality, Unimrkt delivers accurate insights that empower smarter business decisions.'}
          </p>
        </div>

        <div className="why-choose-grid">
          {items.map((item, index) => (
            <article className="why-choose-card" key={item.id || index}>
              <div className="why-choose-icon-box">
                <img
                  src={item.icon || item.iconClass || defaultIcons[index % defaultIcons.length]}
                  alt={item.label || item.title || 'feature icon'}
                  width={40}
                  height={40}
                  className="why-choose-icon"
                />
              </div>

              <div className="why-choose-content">
                <span className="why-choose-stat">{item.number || item.stat || item.title}</span>
                <span className="why-choose-label">{item.label || item.desc || item.description}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
