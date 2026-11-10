'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function SolutionsSection({ dynamicServices = [], dynamicSolutions = null }) {
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

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

  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.muted = true;
      vid.defaultMuted = true;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const unlock = () => {
            vid.play().catch(() => {});
            ['click', 'touchstart', 'scroll'].forEach((evt) => {
              window.removeEventListener(evt, unlock);
            });
          };
          ['click', 'touchstart', 'scroll'].forEach((evt) => {
            window.addEventListener(evt, unlock, { once: true, passive: true });
          });
        });
      }
    }
  }, []);

  const handleCardClick = (cardKey) => {
    setActiveCard((prev) => (prev === cardKey ? null : cardKey));
  };

  const handleCardMouseEnter = (cardKey) => {
    if (activeCard && activeCard !== cardKey) {
      setActiveCard(null);
    }
  };

  const list = dynamicServices.length > 0 ? dynamicServices : (dynamicSolutions?.items || []);
  const card1 = list[0] || null;
  const card2 = list[1] || null;
  const card3 = list[2] || null;

  const featuredHeading = dynamicSolutions?.heading || dynamicSolutions?.title;
  const featuredDesc = dynamicSolutions?.description;

  return (
    <section className="solutions-banner-section" id="solutions" ref={sectionRef}>
      <div className="solutions-space-bg">
        <video
          ref={videoRef}
          className="solutions-video-bg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/asstes/images/research-solutions-video-banner.mp4" type="video/mp4" />
        </video>
        <div className="solutions-shade-overlay"></div>
        <div className="space-earth-layer"></div>
      </div>

      <div className="srcn-container solutions-banner-container">
        <div className="solutions-interactive-grid">
          {/* Card 1 */}
          {card1 && (
            <div
              className={`solution-interactive-card ${activeCard === 'support' ? 'active' : ''}`}
              data-card="support"
              onClick={() => handleCardClick('support')}
              onMouseEnter={() => handleCardMouseEnter('support')}
            >
              <div className="card-inner">
                <h3 className="card-title">{card1.title}</h3>
                <p className="card-description">{card1.description || card1.shortDescription}</p>
                <div className="card-action-btn" aria-label={`Explore ${card1.title}`}>
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

          {/* Center Featured Red Card */}
          <div className="solution-featured-red-card">
            <div className="featured-card-content">
              {featuredHeading && (
                <h2 className="featured-heading">
                  {featuredHeading}
                </h2>
              )}
              {featuredDesc && (
                <p className="featured-paragraph">
                  {featuredDesc}
                </p>
              )}
              <Link href="/contact" className="btn-talk-experts">
                <span>TALK TO OUR EXPERTS</span>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          {card2 && (
            <div
              className={`solution-interactive-card ${activeCard === 'qualitative' ? 'active' : ''}`}
              data-card="qualitative"
              onClick={() => handleCardClick('qualitative')}
              onMouseEnter={() => handleCardMouseEnter('qualitative')}
            >
              <div className="card-inner">
                <h3 className="card-title">{card2.title}</h3>
                <p className="card-description">{card2.description || card2.shortDescription}</p>
                <div className="card-action-btn" aria-label={`Explore ${card2.title}`}>
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

          {/* Card 3 */}
          {card3 && (
            <div
              className={`solution-interactive-card ${activeCard === 'quantitative' ? 'active' : ''}`}
              data-card="quantitative"
              onClick={() => handleCardClick('quantitative')}
              onMouseEnter={() => handleCardMouseEnter('quantitative')}
            >
              <div className="card-inner">
                <h3 className="card-title">{card3.title}</h3>
                <p className="card-description">{card3.description || card3.shortDescription}</p>
                <div className="card-action-btn" aria-label={`Explore ${card3.title}`}>
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
        </div>
      </div>
    </section>
  );
}
