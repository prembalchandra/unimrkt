import React from 'react';

function getReachIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('global') || t.includes('market') || t.includes('hub') || t.includes('india')) return '/asstes/images/icon/global-regional-markets-icon-img.png';
  if (t.includes('audienc') || t.includes('uk')) return '/asstes/images/icon/diverse-audiences-icon-img.png';
  if (t.includes('industr') || t.includes('usa')) return '/asstes/images/icon/multiple-industries-icon-img.png';
  return '/asstes/images/icon/multiple-research-methods-icon.png';
}

export default function ResearchReachSection({
  dynamicReach = null,
  kicker = 'Our Coverage',
  title = 'Research Reach That Goes Beyond Markets',
  description = 'Our research capabilities span markets, industries, audiences and geographies, helping businesses build a deeper understanding of the people, trends and opportunities that matter most.',
  cards = [],
} = {}) {
  const activeKicker = dynamicReach?.kicker || kicker;
  const activeTitle = dynamicReach?.heading || dynamicReach?.title || title;
  const activeDescription = dynamicReach?.description || description;

  const activeCards = (dynamicReach?.cards || cards || []).map((c) => ({
    icon: getReachIcon(c.title),
    title: c.title || '',
    description: c.description || '',
  }));

  if (activeCards.length === 0) return null;

  return (
    <section className="research-reach-section">
      <div className="srcn-container">
        <div className="section-center-header section-header-area">
          <span className="section-kicker-red career-values-kicker">
            {activeKicker}
          </span>
          <h2 className="section-main-heading">
            {activeTitle}
          </h2>
          <p className="section-sub-text">
            {activeDescription}
          </p>
        </div>

        <div className="research-reach-cards-grid">
          {activeCards.map((card, index) => (
            <article key={index} className="research-reach-card">
              <div className="reach-icon-wrap">
                <img src={card.icon} alt={card.title} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
