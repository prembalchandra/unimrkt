import React from 'react';

const defaultCards = [
  { icon: '/asstes/images/icon/connection-icon-img.png', title: '1. The Challenge', desc: 'What business problem needed solving?' },
  { icon: '/asstes/images/icon/analysis-research-icon-img.png', title: '2. The Research', desc: 'Which methodology was used?' },
  { icon: '/asstes/images/icon/insight-icon-img.png', title: '3. The Insight', desc: 'What did the research reveal?' },
  { icon: '/asstes/images/icon/growth-impact-icon-img.png', title: '4. The Impact', desc: 'How did the insight support the business?' }
];

export default function ResearchValue({ dynamicValues = null }) {
  const kicker = dynamicValues?.kicker || 'Our Approach';
  const heading = dynamicValues?.heading || dynamicValues?.title || 'Every Case Study Starts With the Right Question';
  const cards = Array.isArray(dynamicValues?.values) && dynamicValues.values.length > 0
    ? dynamicValues.values.map((v, i) => ({
        icon: defaultCards[i % defaultCards.length].icon,
        title: v.title || defaultCards[i % defaultCards.length].title,
        desc: v.description || defaultCards[i % defaultCards.length].desc
      }))
    : defaultCards;

  return (
    <section className="research-value-section">
      <div className="srcn-container">
        <div className="research-value-wrap">
          <div className="research-value-header">
            <span className="research-value-kicker career-values-kicker">{kicker}</span>
            <h2 className="research-value-title section-main-heading">
              {heading}
            </h2>
          </div>

          <div className="research-value-grid">
            {cards.map((card, idx) => (
              <article key={idx} className="research-value-card">
                <div className="value-icon-wrap">
                  <img src={card.icon} alt={card.title} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
