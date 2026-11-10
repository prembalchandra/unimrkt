import React from 'react';
import StrapiBlocksRenderer from '@/components/StrapiBlocksRenderer';

export default function CareerJoin({ dynamicSection = null, dynamicJoin = null }) {
  const sectionData = dynamicSection || dynamicJoin;
  const kicker = sectionData?.kicker;
  const heading = sectionData?.heading || sectionData?.title;
  const content = sectionData?.content;
  const description = sectionData?.description;

  if (!sectionData) return null;

  return (
    <section className="career-join-section">
      <div className="srcn-container">
        {kicker && <span className="career-values-kicker sub-title-red">{kicker}</span>}
        {heading && <h2 className="career-fraud-heading">{heading}</h2>}
        {content ? (
          <div className="career-join-blocks">
            <StrapiBlocksRenderer content={content} />
          </div>
        ) : description ? (
          <p>{description}</p>
        ) : null}
      </div>
    </section>
  );
}
