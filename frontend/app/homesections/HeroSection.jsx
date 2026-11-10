'use client';

import React, { useState, useEffect, useRef } from 'react';

function getServiceBadge(title = '') {
  const t = title.toLowerCase();
  if (t.includes('bulletin')) return 'DIGITAL PLATFORMS';
  if (t.includes('intercept')) return 'ON-SITE FIELDWORK';
  if (t.includes('country')) return 'GLOBAL EXPANSION';
  if (t.includes('structured') || t.includes('clarity')) return 'MARKET INTELLIGENCE';
  if (t.includes('programming') || t.includes('survey')) return 'DATA ENGINE';
  if (t.includes('in-depth') || t.includes('depth')) return 'EXECUTIVE QUALITATIVE';
  if (t.includes('telephonic') || t.includes('cati')) return 'CATI WORKSTATIONS';
  return 'MARKET INTELLIGENCE';
}

function getServiceCta(title = '') {
  const t = title.toLowerCase();
  if (t.includes('bulletin')) return 'EXPLORE BULLETIN BOARDS';
  if (t.includes('intercept')) return 'EXPLORE INTERCEPT RESEARCH';
  if (t.includes('country')) return 'EXPLORE COUNTRY RESEARCH';
  if (t.includes('structured')) return 'DISCOVER THE UNIMRKT';
  if (t.includes('programming')) return 'EXPLORE SURVEY LOGIC';
  if (t.includes('in-depth')) return 'EXPLORE IN-DEPTH INTERVIEWS';
  if (t.includes('telephonic')) return 'EXPLORE TELEPHONIC SURVEYS';
  return 'EXPLORE OUR SOLUTIONS';
}

const serviceIconList = [
  (
    <svg viewBox="0 0 24 24" className="service-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="3.5" width="19" height="13" rx="2.5"></rect>
      <circle cx="7" cy="8.5" r="1.8"></circle>
      <path d="M4.5 14c0-1.5 1.2-2.2 2.5-2.2s2.5.7 2.5 2.2"></path>
      <rect x="13" y="6.5" width="6" height="4.5" rx="1"></rect>
      <path d="M14.5 11l-1 2h2"></path>
      <path d="M9 20.5h6"></path>
      <path d="M12 16.5v4"></path>
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" className="service-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" className="service-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9.5"></circle>
      <path d="M2.5 12h19"></path>
      <path d="M12 2.5a14.5 14.5 0 0 1 4.5 9.5 14.5 14.5 0 0 1-4.5 9.5 14.5 14.5 0 0 1-4.5-9.5 14.5 14.5 0 0 1 4.5-9.5z"></path>
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" className="service-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="8" ry="3"></ellipse>
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"></path>
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"></path>
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" className="service-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" className="service-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14V6a2 2 0 0 0-2-2H6"></path>
      <path d="M17 8H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2v3l3.5-3H17a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"></path>
      <circle cx="10.5" cy="12.5" r="1.6"></circle>
      <path d="M7.5 16.5c0-1.4 1.3-2.1 3-2.1s3 .7 3 2.1"></path>
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" className="service-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  ),
];

export default function HeroSection({ dynamicData = null, initialServices = [] }) {
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const heroWheelViewportRef = useRef(null);
  const heroWheelTrackRef = useRef(null);
  const heroVideoRef = useRef(null);
  const currentSlotRef = useRef(10);
  const autoSlideTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const fadeTimeoutRef = useRef(null);

  const rawList = (initialServices && initialServices.length > 0)
    ? initialServices
    : (dynamicData?.servicePills || []);

  const activeServices = rawList.slice(0, 7).map((s, idx) => ({
    key: `service-${s.id || idx}`,
    title: s.title || '',
    desc: s.description || s.shortDescription || 'Delivering structured market data enabling organizations to gain complete clarity into market dynamics.',
    badge: getServiceBadge(s.title),
    cta: getServiceCta(s.title),
    icon: serviceIconList[idx % serviceIconList.length]
  }));

  const numServices = activeServices.length > 0 ? activeServices.length : 1;
  const heroServices = activeServices.map((p) => ({
    badge: p.badge,
    heading: p.title,
    desc: p.desc,
    cta: p.cta,
  }));

  const items = [];
  for (let s = 0; s < 3; s++) {
    activeServices.forEach((service, i) => {
      items.push({
        ...service,
        globalIndex: s * numServices + i,
        serviceIndex: i,
        set: s,
      });
    });
  }

  useEffect(() => {
    const viewport = heroWheelViewportRef.current;
    const track = heroWheelTrackRef.current;
    if (!viewport || !track) return;

    const allDomItems = Array.from(track.children);

    const getSlotHeight = () => (window.innerWidth > 991 ? 70 : 60);
    const getViewportHeight = () => (window.innerWidth > 991 ? 490 : 420);

    const updateHeroContent = (serviceIdx) => {
      clearTimeout(fadeTimeoutRef.current);
      setIsFading(true);
      fadeTimeoutRef.current = setTimeout(() => {
        setActiveServiceIdx(serviceIdx);
        setIsFading(false);
      }, 180);
    };

    const scrollToSlot = (targetSlot, animate = true) => {
      currentSlotRef.current = targetSlot;
      const slotHeight = getSlotHeight();
      const viewportHeight = getViewportHeight();
      const centerY = viewportHeight / 2;
      const targetCenterY = targetSlot * slotHeight + slotHeight / 2;
      const translateY = centerY - targetCenterY;

      if (!animate) {
        track.style.transition = 'none';
        allDomItems.forEach((item) => {
          item.style.transition = 'none';
        });
      } else {
        track.style.transition = 'transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)';
        allDomItems.forEach((item) => {
          item.style.transition = 'transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease';
        });
      }

      track.style.transform = `translate3d(0, ${translateY}px, 0)`;

      const isDesktop = window.innerWidth > 991;
      const isTablet = window.innerWidth > 640;

      allDomItems.forEach((item, idx) => {
        const dist = Math.abs(idx - targetSlot);
        let offsetX = 0;
        let opacity = 1;

        if (dist === 0) {
          offsetX = 0;
          opacity = 1;
          item.classList.add('is-active');
        } else if (dist === 1) {
          offsetX = isDesktop ? 22 : isTablet ? 16 : 10;
          opacity = 0.85;
          item.classList.remove('is-active');
        } else if (dist === 2) {
          offsetX = isDesktop ? 46 : isTablet ? 32 : 20;
          opacity = 0.68;
          item.classList.remove('is-active');
        } else if (dist === 3) {
          offsetX = isDesktop ? 70 : isTablet ? 48 : 30;
          opacity = 0.50;
          item.classList.remove('is-active');
        } else {
          offsetX = isDesktop ? 94 : isTablet ? 64 : 40;
          opacity = 0.35;
          item.classList.remove('is-active');
        }

        item.style.transform = `translate3d(${offsetX}px, 0, 0)`;
        item.style.opacity = opacity;
      });

      const sIdx = ((targetSlot % numServices) + numServices) % numServices;
      if (animate) {
        updateHeroContent(sIdx);
      } else {
        setActiveServiceIdx(sIdx);
        setIsFading(false);
      }
    };

    const handleTransitionEnd = (e) => {
      if (e.target !== track || e.propertyName !== 'transform') return;
      if (currentSlotRef.current >= 14) {
        const resetSlot = currentSlotRef.current - numServices;
        scrollToSlot(resetSlot, false);
        void track.offsetHeight;
      } else if (currentSlotRef.current < 7) {
        const resetSlot = currentSlotRef.current + numServices;
        scrollToSlot(resetSlot, false);
        void track.offsetHeight;
      }
    };

    track.addEventListener('transitionend', handleTransitionEnd);

    const advanceNextSlot = () => {
      scrollToSlot(currentSlotRef.current + 1, true);
    };

    const startAutoSlide = () => {
      stopAutoSlide();
      autoSlideTimerRef.current = setInterval(advanceNextSlot, 3800);
    };

    const stopAutoSlide = () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
        autoSlideTimerRef.current = null;
      }
    };

    const triggerUserScroll = (targetIdx) => {
      stopAutoSlide();
      scrollToSlot(targetIdx, true);
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        startAutoSlide();
      }, 3800);
    };

    const handleItemClick = (idx) => {
      triggerUserScroll(idx);
    };

    allDomItems.forEach((item, idx) => {
      item.addEventListener('click', () => handleItemClick(idx));
    });

    let wheelDebounceTimer = null;
    const handleWheel = (e) => {
      e.preventDefault();
      clearTimeout(wheelDebounceTimer);
      wheelDebounceTimer = setTimeout(() => {
        if (e.deltaY > 20) {
          triggerUserScroll(currentSlotRef.current + 1);
        } else if (e.deltaY < -20) {
          triggerUserScroll(currentSlotRef.current - 1);
        }
      }, 40);
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > 30) {
        if (deltaY > 0) {
          triggerUserScroll(currentSlotRef.current + 1);
        } else {
          triggerUserScroll(currentSlotRef.current - 1);
        }
      }
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });
    viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
    viewport.addEventListener('touchend', handleTouchEnd, { passive: true });

    viewport.addEventListener('mouseenter', stopAutoSlide);
    viewport.addEventListener('mouseleave', startAutoSlide);

    scrollToSlot(10, false);
    startAutoSlide();

    const handleResize = () => {
      scrollToSlot(currentSlotRef.current, false);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      stopAutoSlide();
      clearTimeout(resumeTimerRef.current);
      clearTimeout(fadeTimeoutRef.current);
      clearTimeout(wheelDebounceTimer);
      track.removeEventListener('transitionend', handleTransitionEnd);
      viewport.removeEventListener('wheel', handleWheel);
      viewport.removeEventListener('mouseenter', stopAutoSlide);
      viewport.removeEventListener('mouseleave', startAutoSlide);
      viewport.removeEventListener('touchstart', handleTouchStart);
      viewport.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, [numServices]);

  const currentContent = heroServices[activeServiceIdx] || heroServices[3] || {
    badge: 'MARKET INTELLIGENCE',
    heading: 'Structured Market Data For Unprecedented Clarity',
    desc: 'Delivering structured market data enabling organizations to gain complete clarity into market dynamics, minimize risks, and uncover new opportunities.',
    cta: 'DISCOVER THE UNIMRKT',
  };

  const videoSource = dynamicData?.videoUrl || '/asstes/images/home-banner-video.mp4';

  return (
    <section className="hero-section" id="about">
      <div className="hero-backdrop-layer">
        <video
          ref={heroVideoRef}
          className="hero-video-bg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={videoSource} type="video/mp4" />
        </video>
        <div className="hero-vignette-overlay mi-hero__shade"></div>
      </div>

      <div className="srcn-container">
        <div className="hero-container">
          <div className="hero-two-col-grid">
            <div className={`hero-content-col ${isFading ? 'content-fade-out' : ''}`} id="heroContentCol">
              <div className="hero-badge-pill hero-common-sub-title-area">
                <span className="badge-red-dot"></span>
                <span className="badge-text" id="heroBadgeText">
                  {currentContent.badge}
                </span>
              </div>

              <h1
                className="hero-main-heading hero-commmon-heading-area"
                id="heroHeading"
                dangerouslySetInnerHTML={{ __html: currentContent.heading }}
              />

              <p className="hero-sub-paragraph hero-common-title" id="heroSubParagraph">
                {currentContent.desc}
              </p>
              <div className="hero-btn-area hero-actions-wrap">
                <a className="hero-common-btn-area btn-sm btn-discover-unimrkt" href="#cta">
                  <span id="heroCtaText">{currentContent.cta}</span>
                  <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right" />
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Services Wheel */}
            <div className="hero-services-col">
              <div className="hero-wheel-viewport" id="heroWheelViewport" ref={heroWheelViewportRef}>
                <div className="hero-wheel-track" id="heroWheelTrack" ref={heroWheelTrackRef}>
                  {items.map((service, index) => (
                    <div
                      key={`${service.key}-${index}`}
                      className={`service-stack-item ${index === 10 ? 'is-active' : ''}`}
                      data-global-index={index}
                      data-service-index={service.serviceIndex}
                      data-service={service.key}
                    >
                      <div className="service-item-icon">{service.icon}</div>
                      <span className="service-item-title">{service.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
