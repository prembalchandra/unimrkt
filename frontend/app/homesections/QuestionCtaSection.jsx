import React from 'react';
import Link from 'next/link';

export default function QuestionCtaSection({
  title = "Have A Question?\nLet's Find The Answer.",
  description = 'Reach out to our experts to get answers to your questions and explore tailored research solutions that accelerate your business growth.',
  button = { label: 'Get in Touch With Us', url: '/contact' },
  visualImageUrl = '/asstes/images/question-img.png',
} = {}) {
  return (
    <section className="question-cta-section">
      <div className="srcn-container">
        <div className="question-cta-card">
          <div className="question-cta-content">
            <h2 className="question-cta-title" style={{ whiteSpace: 'pre-line' }}>
              {title}
            </h2>
            <p className="question-cta-desc">{description}</p>
            <Link href={button?.url || '/contact'} className="question-cta-btn">
              <span>{button?.label || 'Get in Touch With Us'}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="question-cta-visual">
            <img src={visualImageUrl || '/asstes/images/question-img.png'} alt="Unimrkt Research Consultation Team" />
          </div>
        </div>
      </div>
    </section>
  );
}
