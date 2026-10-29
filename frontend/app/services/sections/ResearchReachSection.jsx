
import React from 'react';

const defaultCards = [
  {
    icon: '/asstes/images/icon/global-regional-markets-icon-img.png',
    title: 'Global & Regional Markets',
    description:
      'Our research capabilities extend across international, national, local and regional markets, helping businesses understand diverse market dynamics and customer behaviours. We combine local market knowledge with structured research methodologies to uncover relevant insights, identify emerging opportunities and support informed decisions across different geographies, audiences and business environments.',
  },
  {
    icon: '/asstes/images/icon/diverse-audiences-icon-img.png',
    title: 'Diverse Audiences',
    description:
      'We connect research with the people who matter most to your business. From consumers and B2B decision-makers to professionals, healthcare audiences and specialised respondent groups, our capabilities help you gather relevant perspectives across audience segments. We use targeted recruitment and structured research approaches to understand attitudes, behaviours, needs and experiences, providing insights that support more informed business and marketing decisions.',
  },
  {
    icon: '/asstes/images/icon/multiple-industries-icon-img.png',
    title: 'Multiple Industries',
    description:
      'Our research expertise spans diverse industries, enabling us to understand the unique challenges, audiences and market dynamics within each sector. From Banking & Finance and Healthcare to Consumer & Retail, Technology, Automotive, Media and B2B & Industrial markets, we develop research approaches that align with industry-specific objectives and help organizations uncover relevant insights and identify meaningful business opportunities.',
  },
  {
    icon: '/asstes/images/icon/multiple-research-methods-icon.png',
    title: 'Multiple Research Methods',
    description:
      'We bring together a broad range of research methodologies to address different business questions and research objectives. Our capabilities include qualitative, quantitative, primary and business research, supported by specialised research functions. By selecting and combining the right methods, we create focused research programs that generate reliable data, deeper understanding and actionable insights aligned with your specific requirements.',
  },
];

export default function ResearchReachSection({
  kicker = 'Our Coverage',
  title = 'Research Reach That Goes Beyond Markets',
  description = 'Our research capabilities span markets, industries, audiences and geographies, helping businesses build a deeper understanding of the people, trends and opportunities that matter most. From local and regional studies to complex multi-country research programs, Unimrkt Research delivers insights across diverse markets and business environments. We combine proven research methodologies, industry expertise, advanced technology and strong on-ground capabilities to design and execute research programs tailored to each business challenge. Whether you need to understand customer behaviour, evaluate market opportunities, assess brand perceptions or explore emerging trends, our teams provide reliable, actionable insights that support confident decisions and help organizations navigate changing markets with clarity.',
  cards = defaultCards,
} = {}) {
  const activeCards =
    cards && cards.length > 0 ? cards : defaultCards;

  return (
    <section className="research-reach-section">
      <div className="srcn-container">

        <div className="section-center-header section-header-area">
          <span className="section-kicker-red career-values-kicker">
            {kicker}
          </span>

          <h2 className="section-main-heading">
            {title}
          </h2>

          <p className="section-sub-desc section-sub-text">
            {description}
          </p>
        </div>

        <div className="research-reach-grid">
          {activeCards.map((card, idx) => (
            <article key={idx} className="research-reach-card">

              <div className="reach-card-icon-box">
                <img
                  src={card.icon}
                  alt={card.title}
                  className="reach-card-icon"
                  loading="lazy"
                />
              </div>

              <div className="reach-card-content">
                <h3 className="reach-card-title">
                  {card.title}
                </h3>

                <p className="reach-card-desc">
                  {card.description}
                </p>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
