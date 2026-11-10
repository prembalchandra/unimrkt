'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

const defaultPartnerFeatures = [
  {
    id: 1,
    icon: '/uploads/deep-industry-understanding-icon-img.png',
    title: 'Deep Industry Understanding',
    desc: 'Specialized domain knowledge across key verticals, ensuring questionnaires, sampling frames, and analytical frameworks reflect real-world market dynamics.',
  },
  {
    id: 2,
    icon: '/uploads/cross-Industry-perspective-icon-img.png',
    title: 'Cross-Industry Perspective',
    desc: 'Drawing analogies and best practices across intersecting sectors to help businesses anticipate shifts, unlock adjacent opportunities, and navigate disruption.',
  },
  {
    id: 3,
    icon: '/uploads/human-interaction-icon-img.png',
    title: 'Specialized Research Expertise',
    desc: 'Tailored quantitative and qualitative methodologies engineered for high-stake decisions, from regulatory-compliant healthcare to fast-paced FMCG markets.',
  },
  {
    id: 4,
    icon: '/uploads/multi-industry-icon-img.png',
    title: 'Consumer & Market Insights',
    desc: 'Seamlessly blending rigorous survey data, CATI/CAWI fieldwork, executive depth interviews, and focus groups across 90+ countries with localized expertise.',
  },
  {
    id: 5,
    icon: '/uploads/Manufacturing-icon-img.png',
    title: 'Actionable Business Intelligence',
    desc: 'Moving beyond raw numbers to deliver strategic narratives, benchmarks, and actionable recommendations that empower leadership teams to act with confidence.',
  },
  {
    id: 6,
    icon: '/uploads/multiple-industries-icon-img.png',
    title: 'Better Decisions, Stronger Growth',
    desc: 'No one-size-fits-all approach. Every research instrument is custom-crafted to your specific objectives, audience profile, and geographic scope.',
  },
];

const fallbackPartnerIcons = [
  '/uploads/industries_icon_beyond_infrastructure_7740e0e270.svg',
  '/uploads/industries_icon_beyond_repair_e8fe083fb0.svg',
  '/uploads/industries_icon_beyond_research_db455e8c5f.svg',
  '/uploads/industries_icon_beyond_dashboard_29b30be305.svg',
  '/uploads/industries_icon_beyond_configuration_edea846bc9.svg',
  '/uploads/industries_icon_beyond_growth_c2885d0bdc.svg',
];

export default function PartnerIndustriesSection({
  features = [],
  kicker = null,
  heading = null,
  description = null,
  dynamicSection = null,
}) {
  const displayKicker = dynamicSection?.kicker || kicker || 'Beyond Industries';
  const displayHeading =
    dynamicSection?.heading || dynamicSection?.title || heading || 'One Research Partner. Multiple Industries.';
  const displayDesc =
    dynamicSection?.description ||
    description ||
    'Combining cross-industry experience with specialized research expertise, we uncover market opportunities, understand evolving customer behaviors and identify emerging trends.';

  const rawList =
    dynamicSection?.values || dynamicSection?.cards || (features && features.length > 0 ? features : []);
  const list = rawList.length > 0 ? rawList : defaultPartnerFeatures;

  return (
    <section className="partner-industries-section" id="partner-industries">
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <div className="section-header-area text-center" style={{ maxWidth: 1020, margin: '0 auto 45px' }}>
            {displayKicker && (
              <span className="career-values-kicker">
                {displayKicker}
              </span>
            )}
            {displayHeading && (
              <h2 className="section-main-heading">
                {displayHeading}
              </h2>
            )}
            {displayDesc && (
              <p className="section-sub-text" style={{ margin: '0 auto' }}>
                {displayDesc}
              </p>
            )}
          </div>
        )}

        {list.length > 0 && (
          <div className="partner-industries-grid">
            {list.map((item, index) => {
              const iconSrc =
                getStrapiMedia(item.icon || item.image || item.icon_class || item.iconClass) ||
                fallbackPartnerIcons[index % fallbackPartnerIcons.length];
              const isFeatured = index === 2; // 3rd card is the red highlighted card matching the design!
              return (
                <article
                  key={item.id || index}
                  className={`partner-card ${isFeatured ? 'partner-card-featured' : ''}`}
                >
                  {iconSrc && (
                    <div className="partner-card-icon-wrap">
                      <img src={iconSrc} alt={item.title || ''} loading="lazy" />
                    </div>
                  )}
                  {item.title && <h3 className="partner-card-title">{item.title}</h3>}
                  {(item.desc || item.description) && (
                    <p className="partner-card-desc">{item.desc || item.description}</p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
