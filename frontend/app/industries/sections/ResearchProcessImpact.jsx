'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

const defaultProcessSteps = [
  {
    num: '01',
    title: 'Understand',
    desc: 'We begin by understanding your business question, objectives and the decisions you need to make. By identifying the core challenge, market context and information gaps, we establish a clear research roadmap.',
    icon: '/uploads/industries_icon_process_clipboard_774213b063.svg',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Designing customized qualitative or quantitative methodologies, sample frames, screening criteria, and interview guides aligned with your specific industry audience.',
    icon: '/uploads/industries_icon_process_brush_b535199055.svg',
  },
  {
    num: '03',
    title: 'Research',
    desc: 'Executing rigorous fieldwork, CATI/CAWI interviews, and secondary data synthesis adhering to ISO 20252 global quality standards.',
    icon: '/uploads/industries_icon_process_chart_9e15f700a8.svg',
  },
  {
    num: '04',
    title: 'Analyze',
    desc: 'Transforming raw findings into strategic narratives, competitive benchmarks, and executive recommendations that drive decisive business impact.',
    icon: '/uploads/industries_icon_process_presentation_3cf42d3bc4.svg',
  },
];

export default function ResearchProcessImpact({
  steps = [],
  kicker = null,
  heading = null,
  description = null,
  dynamicSection = null,
}) {
  const displayKicker =
    dynamicSection?.kicker || kicker || 'Industry Research Process';
  const displayHeading =
    dynamicSection?.heading ||
    dynamicSection?.title ||
    heading ||
    'Turning Research Into Impact';
  const displayDesc =
    dynamicSection?.description ||
    description ||
    'Transforming industry questions, market data and customer insights into actionable strategies that help businesses make informed decisions.';

  const rawList =
    dynamicSection?.cards ||
    dynamicSection?.values ||
    (steps && steps.length > 0 ? steps : []);
  const list = rawList.length > 0 ? rawList : defaultProcessSteps;

  return (
    <section
      className="research-process-impact-section"
      id="research-process-impact"
    >
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <div
            className="section-header-area text-center"
            style={{ maxWidth: 940, margin: '0 auto 45px' }}
          >
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
          <div className="process-cards-grid">
            {list.map((step, index) => {
              const iconSrc =
                getStrapiMedia(step.icon || step.image) ||
                (defaultProcessSteps[index] && defaultProcessSteps[index].icon);

              const numStr =
                step.num || (index < 9 ? `0${index + 1}` : `${index + 1}`);

              return (
                <article key={step.id || index} className="process-impact-card">
                  <div className="process-step-num">{numStr}</div>
                  {iconSrc && (
                    <div className="process-step-icon">
                      <img
                        src={iconSrc}
                        alt={step.title || ''}
                        loading="lazy"
                      />
                    </div>
                  )}
                  {step.title && (
                    <h3 className="process-step-title">{step.title}</h3>
                  )}
                  {(step.desc || step.description) && (
                    <p className="process-step-desc">
                      {step.desc || step.description}
                    </p>
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
