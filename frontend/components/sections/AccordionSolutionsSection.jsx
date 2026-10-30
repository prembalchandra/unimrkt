'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import LazyVideo from '@/components/LazyVideo';

export default function AccordionSolutionsSection({ data = {} }) {
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sectionRef.current && !e.target.closest('.solution-interactive-card')) {
        setActiveCard(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleCardClick = (idx) => {
    setActiveCard((prev) => (prev === idx ? null : idx));
  };

  const handleCardMouseEnter = (idx) => {
    if (activeCard !== null && activeCard !== idx) {
      setActiveCard(null);
    }
  };

  const heading = data.heading || 'Research Solutions That Drive Growth';
  const description =
    data.description ||
    'Delivering end-to-end research solutions that transform data into confident business decisions, enabling organizations to uncover opportunities, understand markets, and drive sustainable growth.';
  const cards = data.cards && data.cards.length > 0
    ? data.cards
    : [
        { title: 'Research Support', description: 'Analyzing large-scale data to uncover trends, patterns, and opportunities.' },
        { title: 'Qualitative Research', description: 'Uncovering deep customer motives, perceptions, and attitudes through focused discussions.' },
        { title: 'Quantitative Research', description: 'Delivering statistically reliable data, market sizing, and structured surveys for evidence-based decisions.' },
        { title: 'Business Research', description: 'Empowering strategic growth through competitive intelligence, industry benchmarking, and market analysis.' },
      ];

  const firstCard = cards[0];
  const remainingCards = cards.slice(1);

  return (
    <section className="solutions-banner-section" id="solutions" ref={sectionRef}>
      <div className="solutions-space-bg">
        <LazyVideo
          className="solutions-video-bg"
          src="/asstes/images/research-solutions-video-banner.mp4"
          poster="/asstes/images/services-banner-img.webp"
        />
        <div className="solutions-shade-overlay"></div>
        <div className="space-earth-layer"></div>
      </div>

      <div className="srcn-container solutions-banner-container">
        <div className="solutions-interactive-grid">
          {firstCard && (
            <div
              className={`solution-interactive-card ${activeCard === 0 ? 'active' : ''}`}
              onClick={() => handleCardClick(0)}
              onMouseEnter={() => handleCardMouseEnter(0)}
            >
              <div className="card-inner">
                <h3 className="card-title">{firstCard.title}</h3>
                <p className="card-description">{firstCard.description}</p>
                <div className="card-action-btn" aria-label={firstCard.title}>
                  <span className="icon-default">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </span>
                  <span className="icon-hover">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="solution-featured-red-card">
            <div className="featured-card-content">
              <h2 className="featured-heading" dangerouslySetInnerHTML={{ __html: heading.replace(/\n/g, '<br/>') }} />
              <p className="featured-paragraph">{description}</p>
              <Link href="/contact" className="btn-talk-experts">
                <span>TALK TO OUR EXPERTS</span>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </Link>
            </div>
          </div>

          {remainingCards.map((card, idx) => {
            const cardIdx = idx + 1;
            return (
              <div
                key={cardIdx}
                className={`solution-interactive-card ${activeCard === cardIdx ? 'active' : ''}`}
                onClick={() => handleCardClick(cardIdx)}
                onMouseEnter={() => handleCardMouseEnter(cardIdx)}
              >
                <div className="card-inner">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                  <div className="card-action-btn" aria-label={card.title}>
                    <span className="icon-default">
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </span>
                    <span className="icon-hover">
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
