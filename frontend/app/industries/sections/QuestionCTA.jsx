"use client";
import React from 'react';

export default function QuestionCTA({ dynamicCta = null }) {
  const title = dynamicCta?.title || "Have A Question? Let's Find The Answer.";
  const description =
    dynamicCta?.description ||
    'Research solutions designed around your business objectives, audience and market.';
  const btnLabel = dynamicCta?.button?.label || 'Start A Conversation';
  const btnUrl = dynamicCta?.button?.url || '/contact';

  return (
    <section className="question-cta-section">
      <div className="srcn-container">
        <div className="question-cta-container">
          <div className="question-cta-banner">
            <div className="question-cta-content">
              <h2 className="question-cta-title section-main-heading">
                {title}
              </h2>
              <p className="question-cta-description section-sub-text">
                {description}
              </p>

              <a href={btnUrl} className="question-cta-button btn-sm">
                {btnLabel}
                <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right" />
              </a>
            </div>

            <div className="question-cta-image">
              <img
                src="/asstes/images/question-img2.webp"
                alt="People thinking and asking questions"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
