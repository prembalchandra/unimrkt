import React from 'react';

const partnerFeatures = [
  {
    id: 1,
    icon: '/asstes/images/icon/deep-industry-understanding-icon-img.png',
    title: 'Deep Industry Understanding',
    desc: 'Specialized domain knowledge across key verticals, ensuring questionnaires, sampling frames, and analytical frameworks reflect real-world market dynamics.',
  },
  {
    id: 2,
    icon: '/asstes/images/icon/cross-Industry-perspective-icon-img.png',
    title: 'Cross-Industry Perspective',
    desc: 'Drawing analogies and best practices across intersecting sectors to help businesses anticipate shifts, unlock adjacent opportunities, and navigate disruption.',
  },
  {
    id: 3,
    icon: '/asstes/images/icon/scalable-research-icon-img.png',
    title: 'Specialised Research Expertise',
    desc: 'Tailored quantitative and qualitative methodologies engineered for high-stake decisions, from regulatory-compliant healthcare to fast-paced FMCG markets.',
  },
  {
    id: 4,
    icon: '/asstes/images/icon/wider-respondent-reach-icon-img.png',
    title: 'Multi-Market & Global Breadth',
    desc: 'Seamlessly blending rigorous survey data, CATI/CAWI fieldwork, executive depth interviews, and focus groups across 90+ countries with localized expertise.',
  },
  {
    id: 5,
    icon: '/asstes/images/icon/actionable-business-intelligence-icon-img.png',
    title: 'Actionable Business Intelligence',
    desc: 'Moving beyond raw numbers to deliver strategic narratives, benchmarks, and actionable recommendations that empower leadership teams to act with confidence.',
  },
  {
    id: 6,
    icon: '/asstes/images/icon/stronger-growth-icon-img.png',
    title: 'Custom Research Methodologies',
    desc: 'No one-size-fits-all approach. Every research instrument is custom-crafted to your specific objectives, audience profile, and geographic scope.',
  },
];

export default function PartnerIndustriesSection() {
  return (
    <section className="partner-industries-section" id="partner-industries">

      <div className="srcn-container">
        <div className="industries-showcase-header section-header-area">
          <span className="industries-showcase-kicker career-values-kicker">WHY UNIMRKT RESEARCH</span>
          <h2 className="industries-showcase-heading section-main-heading">One Research Partner. Multiple Industries.</h2>
          <p className="industries-showcase-desc industries-expertise-desc">
            From discovering market opportunities and evaluating customer preferences to predicting category shifts, we
            design robust methodologies that deliver high-precision intelligence across sectors.
          </p>
        </div>

        <div className="partner-industries-grid">
          {partnerFeatures.map((item) => (
            <article key={item.id} className="partner-card">
              <div className="partner-card-icon-wrap">
                <img src={item.icon} alt={item.title} loading="lazy" />
              </div>
              <h3 className="partner-card-title">{item.title}</h3>
              <p className="partner-card-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
