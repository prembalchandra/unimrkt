'use client';

import React, { useState, useEffect, useRef } from 'react';

const heroServicesData = [
  {
    badge: 'DIGITAL PLATFORMS',
    heading: 'Online Bulletin Board For Longitudinal Insights',
    desc: 'Connect with verified consumers in interactive, multi-day digital discussion rooms to capture evolving habits, perceptions, and rich multimedia feedback.',
    cta: 'EXPLORE BULLETIN BOARDS',
  },
  {
    badge: 'ON-SITE FIELDWORK',
    heading: 'Intercept Interviews Real-Time In-The-Moment',
    desc: 'Gather authentic, unprompted buyer reactions and retail customer feedback directly at physical storefronts, venues, transit hubs, and events globally.',
    cta: 'EXPLORE INTERCEPT RESEARCH',
  },
  {
    badge: 'GLOBAL EXPANSION',
    heading: 'In-Depth Country Research Local Market Landscapes',
    desc: 'De-risk foreign market entry with end-to-end intelligence on local regulatory frameworks, consumer habits, pricing dynamics, and competitor strengths.',
    cta: 'EXPLORE COUNTRY RESEARCH',
  },
  {
    badge: 'MARKET INTELLIGENCE',
    heading: 'Structured Market Data For Unprecedented Clarity',
    desc: 'Delivering structured market data enabling organizations to gain complete clarity into market dynamics, minimize risks, and uncover new opportunities.',
    cta: 'DISCOVER THE UNIMRKT',
  },
  {
    badge: 'DATA ENGINE',
    heading: 'Survey Programming Flawless Complex Logic',
    desc: 'Robust scripting of complex multi-branching questionnaires, mobile-optimized UI, data validation safeguards, and real-time analytical dashboards.',
    cta: 'EXPLORE SURVEY LOGIC',
  },
  {
    badge: 'EXECUTIVE QUALITATIVE',
    heading: 'In-Depth Interviews Executive & B2B Depth',
    desc: 'Conduct high-caliber one-on-one qualitative dialogues with C-suite decision-makers, Key Opinion Leaders (KOLs), and niche industry experts worldwide.',
    cta: 'EXPLORE IN-DEPTH INTERVIEWS',
  },
  {
    badge: 'CATI WORKSTATIONS',
    heading: 'Telephonic Interviews Nationwide CATI Power',
    desc: 'Powered by 500+ advanced CATI telephone interviewing workstations delivering high-volume, verified, and quality-audited quantitative reach nationwide.',
    cta: 'EXPLORE TELEPHONIC SURVEYS',
  },
];

const canonicalServices = [
  {
    key: 'bulletin',
    title: 'Online Bulletin Board',
    icon: (
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
  },
  {
    key: 'intercept',
    title: 'Intercept Interview',
    icon: (
      <svg viewBox="0 0 24 24" className="service-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 9V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1v3.5l3.5-3.5H9"></path>
        <path d="M7 6.8a1.2 1.2 0 0 1 2 1c0 .7-.8.9-1 1.4"></path>
        <circle cx="8" cy="10.8" r="0.5" fill="currentColor"></circle>
        <path d="M13 11h6a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v3l-3-3h-2a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2z"></path>
      </svg>
    ),
  },
  {
    key: 'country',
    title: 'Country Research',
    icon: (
      <svg viewBox="0 0 24 24" className="service-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9.5"></circle>
        <ellipse cx="12" cy="12" rx="4.5" ry="9.5"></ellipse>
        <line x1="2.5" y1="12" x2="21.5" y2="12"></line>
        <circle cx="7.5" cy="8.5" r="1" fill="currentColor"></circle>
        <circle cx="16.5" cy="15.5" r="1" fill="currentColor"></circle>
        <circle cx="12" cy="6" r="1" fill="currentColor"></circle>
      </svg>
    ),
  },
  {
    key: 'competitive',
    title: 'Competitive Intelligence',
    icon: (
      <svg viewBox="0 0 32 32" className="service-svg-icon brain-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4.5c-2.8 0-5 1.8-5 4 0 .6.1 1.2.4 1.7C9.3 10.6 7.5 12.2 7.5 14.5c0 1 .4 1.9 1 2.6-1.5 1-2.5 2.7-2.5 4.7 0 2.6 1.8 4.7 4.2 5.3.4 2.1 2.2 3.8 4.6 4.1.4.5 1 .8 1.8.8"></path>
        <path d="M11 9.5c0 1.8-1 3-2.2 3.6"></path>
        <path d="M12 16c-1.8.6-3 1.8-3 3.6"></path>
        <path d="M12.5 22.5c-.6 1.2-1.8 2.2-3 2.5"></path>
        <line x1="16" y1="4.5" x2="16" y2="28.5"></line>
        <path d="M16 8h5.5a2 2 0 0 1 2 2v1"></path>
        <circle cx="23.5" cy="11" r="1.5" fill="currentColor"></circle>
        <path d="M16 13.5h7.5"></path>
        <circle cx="25" cy="13.5" r="1.5" fill="currentColor"></circle>
        <path d="M16 19h5l2.5 2.5h3.5"></path>
        <circle cx="28.5" cy="21.5" r="1.5" fill="currentColor"></circle>
        <path d="M16 24.5h4a2 2 0 0 0 2-2v-1"></path>
        <circle cx="22" cy="21.5" r="1.5" fill="currentColor"></circle>
        <path d="M16 27.5h5"></path>
        <circle cx="22.5" cy="27.5" r="1.5" fill="currentColor"></circle>
      </svg>
    ),
  },
  {
    key: 'programming',
    title: 'Survey Programming',
    icon: (
      <svg viewBox="0 0 24 24" className="service-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        <polygon points="7.5,11.5 8.2,13 9.8,13.2 8.6,14.3 9,15.9 7.5,15.1 6,15.9 6.4,14.3 5.2,13.2 6.8,13" fill="currentColor"></polygon>
        <polygon points="12,11.5 12.7,13 14.3,13.2 13.1,14.3 13.5,15.9 12,15.1 10.5,15.9 10.9,14.3 9.7,13.2 11.3,13" fill="currentColor"></polygon>
        <polygon points="16.5,11.5 17.2,13 18.8,13.2 17.6,14.3 18,15.9 16.5,15.1 15,15.9 15.4,14.3 14.2,13.2 15.8,13" fill="currentColor"></polygon>
      </svg>
    ),
  },
  {
    key: 'indepth',
    title: 'In-Depth Interview',
    icon: (
      <svg viewBox="0 0 24 24" className="service-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 14V6a2 2 0 0 0-2-2H6"></path>
        <path d="M17 8H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2v3l3.5-3H17a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"></path>
        <circle cx="10.5" cy="12.5" r="1.6"></circle>
        <path d="M7.5 16.5c0-1.4 1.3-2.1 3-2.1s3 .7 3 2.1"></path>
      </svg>
    ),
  },
  {
    key: 'telephonic',
    title: 'Telephonic Interview',
    icon: (
      <svg viewBox="0 0 24 24" className="service-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
  },
];

export default function HeroSection() {
  const [activeServiceIdx, setActiveServiceIdx] = useState(3);
  const [isFading, setIsFading] = useState(false);

  const heroWheelViewportRef = useRef(null);
  const heroWheelTrackRef = useRef(null);
  const heroVideoRef = useRef(null);
  const currentSlotRef = useRef(10); // Start at Item 3 in Set 1 (7 + 3 = 10)
  const autoSlideTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const fadeTimeoutRef = useRef(null);
  const numServices = canonicalServices.length; // 7

  // Triple set (21 items) for seamless looping
  const items = [];
  for (let s = 0; s < 3; s++) {
    canonicalServices.forEach((service, i) => {
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
        void track.offsetHeight; // Force reflow to commit instant jump
      } else if (currentSlotRef.current < 7) {
        const resetSlot = currentSlotRef.current + numServices;
        scrollToSlot(resetSlot, false);
        void track.offsetHeight; // Force reflow to commit instant jump
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

    let hoverResumeTimer = null;
    const handleMouseEnter = () => {
      clearTimeout(hoverResumeTimer);
      hoverResumeTimer = setTimeout(() => {
        startAutoSlide();
      }, 3500);
    };
    const handleMouseLeave = () => {
      clearTimeout(hoverResumeTimer);
      startAutoSlide();
    };
    viewport.addEventListener('mouseenter', handleMouseEnter);
    viewport.addEventListener('mouseleave', handleMouseLeave);

    let wheelCooldown = false;
    const handleWheel = (e) => {
      e.preventDefault();
      if (wheelCooldown) return;
      wheelCooldown = true;
      setTimeout(() => {
        wheelCooldown = false;
      }, 350);

      if (e.deltaY > 0) {
        triggerUserScroll(currentSlotRef.current + 1);
      } else if (e.deltaY < 0) {
        triggerUserScroll(currentSlotRef.current - 1);
      }
    };
    viewport.addEventListener('wheel', handleWheel, { passive: false });

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      stopAutoSlide();
    };
    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;
      if (Math.abs(diffY) > 30) {
        if (diffY > 0) {
          triggerUserScroll(currentSlotRef.current + 1);
        } else {
          triggerUserScroll(currentSlotRef.current - 1);
        }
      } else {
        startAutoSlide();
      }
    };
    viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
    viewport.addEventListener('touchend', handleTouchEnd, { passive: true });

    const handleResize = () => {
      scrollToSlot(currentSlotRef.current, false);
    };
    window.addEventListener('resize', handleResize);

    // Background video autoplay assurance
    const heroVid = heroVideoRef.current;
    if (heroVid) {
      heroVid.muted = true;
      heroVid.defaultMuted = true;
      const playPromise = heroVid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const unlock = () => {
            heroVid.play().catch(() => { });
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

    // Initial render setup: center on slot 10 (Competitive Intelligence)
    scrollToSlot(10, false);
    startAutoSlide();

    return () => {
      stopAutoSlide();
      clearTimeout(hoverResumeTimer);
      clearTimeout(resumeTimerRef.current);
      clearTimeout(fadeTimeoutRef.current);
      track.removeEventListener('transitionend', handleTransitionEnd);
      viewport.removeEventListener('mouseenter', handleMouseEnter);
      viewport.removeEventListener('mouseleave', handleMouseLeave);
      viewport.removeEventListener('wheel', handleWheel);
      viewport.removeEventListener('touchstart', handleTouchStart);
      viewport.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, [numServices]);

  const currentContent = heroServicesData[activeServiceIdx] || heroServicesData[3];

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
          <source src="/asstes/images/home-banner-video.mp4" type="video/mp4" />
          <source src="/img/home-banner-video.mp4" type="video/mp4" />
        </video>
        <div className="hero-vignette-overlay mi-hero__shade"></div>
      </div>

      <div className="srcn-container">
        <div className="hero-container">
          <div className="hero-two-col-grid">
            <div className={`hero-content-col ${isFading ? 'content-fade-out' : ''}`} id="heroContentCol">
              <div className="hero-badge-pill -hero-common-sub-tille-area">
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
              <div class="hero-btn-area hero-actions-wrap"><a class="hero-common-btn-area btn-sm btn-discover-unimrkt" href="#cta"> <span id="heroCtaText">{currentContent.cta}</span>
              <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right"/></a>
             
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
