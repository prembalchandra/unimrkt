import React from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';

export default function QuestionCtaSection({
  dynamicCta = null,
  title,
  description,
  button,
  visualImageUrl,
} = {}) {
  const displayTitle = dynamicCta?.title || dynamicCta?.heading || title;
  const displayDesc = dynamicCta?.description || description;
  const buttonLabel = dynamicCta?.buttonText || button?.label || 'Get in Touch With Us';
  const buttonUrl = dynamicCta?.buttonUrl || button?.url || '/contact';
  const visualImage = getStrapiMedia(dynamicCta?.image || visualImageUrl, getStrapiMedia('/uploads/question-img.png'));

  if (!displayTitle && !displayDesc) return null;

  return (
    <section className="question-cta-section">
      <div className="srcn-container">
        <div className="question-cta-card">
          <div className="question-cta-content">
            {displayTitle && (
              <h2 className="question-cta-title" style={{ whiteSpace: 'pre-line' }}>
                {displayTitle}
              </h2>
            )}
            {displayDesc && <p className="question-cta-desc">{displayDesc}</p>}
            <Link href={buttonUrl} className="question-cta-btn">
              <span>{buttonLabel}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          {visualImage && (
            <div className="question-cta-visual">
              <img src={visualImage} alt={displayTitle || 'Question CTA'} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
