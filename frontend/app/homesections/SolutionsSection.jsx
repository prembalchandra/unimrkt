'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import LazyVideo from '@/components/LazyVideo';

export default function SolutionsSection() {
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

  const handleCardClick = (cardKey) => {
    setActiveCard((prev) => (prev === cardKey ? null : cardKey));
  };

  const handleCardMouseEnter = (cardKey) => {
    if (activeCard && activeCard !== cardKey) {
      setActiveCard(null);
    }
  };

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
          {/* Card 1: Support */}
          <div
            className={`solution-interactive-card ${activeCard === 'support' ? 'active' : ''}`}
            data-card="support"
            onClick={() => handleCardClick('support')}
            onMouseEnter={() => handleCardMouseEnter('support')}
          >
            <div className="card-inner">
              <h3 className="card-title">Research Support</h3>
              <p className="card-description">
                Analyzing large-scale data to uncover trends, patterns, and opportunities.
              </p>
              <div className="card-action-btn" aria-label="Explore Research Support">
                <span className="icon-default">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </span>
                <span className="icon-hover">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="solution-featured-red-card">
            <div className="featured-card-content">
              <h2 className="featured-heading">
                Research<br />Solutions That<br />Drive Growth
              </h2>
              <p className="featured-paragraph">
                Delivering end-to-end research solutions that transform data into confident business decisions, enabling
                organizations to uncover opportunities, understand markets, and drive sustainable growth.
              </p>
              <Link href="/contact" className="btn-talk-experts">
                <span>TALK TO OUR EXPERTS</span>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </Link>
            </div>
          </div>

          {/* Card 2: Qualitative */}
          <div
            className={`solution-interactive-card ${activeCard === 'qualitative' ? 'active' : ''}`}
            data-card="qualitative"
            onClick={() => handleCardClick('qualitative')}
            onMouseEnter={() => handleCardMouseEnter('qualitative')}
          >
            <div className="card-inner">
              <h3 className="card-title">Qualitative Research</h3>
              <p className="card-description">
                Uncovering deep customer motives, perceptions, and attitudes through focused discussions.
              </p>
              <div className="card-action-btn" aria-label="Explore Qualitative Research">
                <span className="icon-default">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </span>
                <span className="icon-hover">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Quantitative */}
          <div
            className={`solution-interactive-card ${activeCard === 'quantitative' ? 'active' : ''}`}
            data-card="quantitative"
            onClick={() => handleCardClick('quantitative')}
            onMouseEnter={() => handleCardMouseEnter('quantitative')}
          >
            <div className="card-inner">
              <h3 className="card-title">Quantitative Research</h3>
              <p className="card-description">
                Delivering statistically reliable data, market sizing, and structured surveys for evidence-based decisions.
              </p>
              <div className="card-action-btn" aria-label="Explore Quantitative Research">
                <span className="icon-default">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </span>
                <span className="icon-hover">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Business Research */}
          <div
            className={`solution-interactive-card ${activeCard === 'business' ? 'active' : ''}`}
            data-card="business"
            onClick={() => handleCardClick('business')}
            onMouseEnter={() => handleCardMouseEnter('business')}
          >
            <div className="card-inner">
              <h3 className="card-title">Business Research</h3>
              <p className="card-description">
                Empowering strategic growth through competitive intelligence, industry benchmarking, and market analysis.
              </p>
              <div className="card-action-btn" aria-label="Explore Business Research">
                <span className="icon-default">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </span>
                <span className="icon-hover">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
