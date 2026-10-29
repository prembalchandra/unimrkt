'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function CapabilitiesSection() {
  const sectionRef = useRef(null);
  const videoRefs = useRef([]);
  const playTimersRef = useRef({});
  const [hoveredRow, setHoveredRow] = useState(null);

  // Counter displays
  const [counts, setCounts] = useState({
    surveys: '0+',
    workstations: '0+',
    experience: '0+ YEARS',
  });
  const hasCountedRef = useRef(false);

  useEffect(() => {
    const statsSection = sectionRef.current;
    if (!statsSection) return;

    const animateCounters = () => {
      const duration = 2000;
      const startTime = performance.now();

      const targets = [
        { key: 'surveys', target: 250000, suffix: '' },
        { key: 'workstations', target: 450, suffix: '' },
        { key: 'experience', target: 16, suffix: ' YEARS' },
      ];

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        const newCounts = {};
        targets.forEach(({ key, target, suffix }) => {
          const currentVal = Math.floor(easeOut * target);
          if (progress < 1) {
            newCounts[key] = `${currentVal.toLocaleString()}+${suffix}`;
          } else {
            newCounts[key] = `${target.toLocaleString()}+${suffix}`;
          }
        });

        setCounts(newCounts);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCountedRef.current) {
            hasCountedRef.current = true;
            animateCounters();
          }
        });
      },
      { threshold: 0.15 }
    );

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0 && !hasCountedRef.current) {
      hasCountedRef.current = true;
      animateCounters();
    }

    observer.observe(statsSection);

    // Outside click for mobile tap collapse
    const handleDocClick = (e) => {
      if (window.innerWidth <= 900 && !e.target.closest('.stat-interactive-row')) {
        setHoveredRow(null);
        videoRefs.current.forEach((vid) => {
          if (vid) vid.pause();
        });
      }
    };
    document.addEventListener('click', handleDocClick);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleDocClick);
    };
  }, []);

  const handleRowMouseEnter = (index) => {
    setHoveredRow(index);
    const video = videoRefs.current[index];
    if (video) {
      clearTimeout(playTimersRef.current[index]);
      playTimersRef.current[index] = setTimeout(() => {
        try {
          video.currentTime = 0;
          const p = video.play();
          if (p !== undefined) p.catch(() => { });
        } catch (err) { }
      }, 50);
    }
  };

  const handleRowMouseLeave = (index) => {
    clearTimeout(playTimersRef.current[index]);
    setHoveredRow(null);
    const video = videoRefs.current[index];
    if (video) {
      try {
        video.pause();
      } catch (err) { }
    }
  };

  const handleRowClick = (index) => {
    if (window.innerWidth <= 900) {
      const isAlready = hoveredRow === index;
      videoRefs.current.forEach((v) => {
        if (v) v.pause();
      });

      if (isAlready) {
        setHoveredRow(null);
      } else {
        setHoveredRow(index);
        const video = videoRefs.current[index];
        if (video) video.play().catch(() => { });
      }
    }
  };

  return (
    <section className="capabilities-section" id="capabilities" ref={sectionRef}>
      <div className="srcn-container">
        <div className="capabilities-wrapper">
          <div className="stats-interactive-container" id="statsInteractiveContainer">
            {/* Row 1: 250000+ Surveys */}
            <div
              className={`stat-interactive-row ${hoveredRow === 0 ? 'is-hovered' : ''}`}
              data-stat="surveys"
              onMouseEnter={() => handleRowMouseEnter(0)}
              onMouseLeave={() => handleRowMouseLeave(0)}
              onClick={() => handleRowClick(0)}
            >
              <div className="stat-card-video-bg">
                <video
                  ref={(el) => (videoRefs.current[0] = el)}
                  className="stat-video-player"
                  loop
                  muted
                  playsInline
                  preload="none"
                >
                  <source src="/asstes/images/video-banner2.mp4" type="video/mp4" />
                </video>
                <div className="stat-video-overlay"></div>
              </div>
              <div className="stat-row-layout">
                <div className="stat-col-left">
                  <span className="stat-number-display stat-counter-num" data-target="250000">
                    {counts.surveys}
                  </span>
                  <span className="stat-hover-label">CATI Surveys Completed Every Year</span>
                </div>
                <div className="stat-col-middle">
                  <p className="stat-hover-desc">
                    Delivering reliable insights through 250,000+ CATI surveys conducted annually across global markets.
                  </p>
                </div>
                <div className="stat-col-right">
                  <Link href="/telephonic-surveys" className="stat-explore-cta">
                    <span>Explore Fieldwork</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="stat-row-divider"></div>

            <div
              className={`stat-interactive-row ${hoveredRow === 1 ? 'is-hovered' : ''}`}
              data-stat="workstations"
              onMouseEnter={() => handleRowMouseEnter(1)}
              onMouseLeave={() => handleRowMouseLeave(1)}
              onClick={() => handleRowClick(1)}
            >
              <div className="stat-card-video-bg">
                <video
                  ref={(el) => (videoRefs.current[1] = el)}
                  className="stat-video-player"
                  loop
                  muted
                  playsInline
                  preload="none"
                >
                  <source src="/asstes/images/video-banner2.mp4" type="video/mp4" />
                </video>
                <div className="stat-video-overlay"></div>
              </div>
              <div className="stat-row-layout">
                <div className="stat-col-left">
                  <span className="stat-number-display stat-counter-num" data-target="450">
                    {counts.workstations}
                  </span>
                  <span className="stat-hover-label">Advanced CATI Workstations</span>
                </div>
                <div className="stat-col-middle">
                  <p className="stat-hover-desc">
                    Equipped with state-of-the-art predictive dialing and skilled native interviewers nationwide.
                  </p>
                </div>
                <div className="stat-col-right">
                  <Link href="/telephonic-surveys" className="stat-explore-cta">
                    <span>Explore Infrastructure</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="stat-row-divider"></div>

            {/* Row 3: 16+ YEARS Research Excellence */}
            <div
              className={`stat-interactive-row ${hoveredRow === 2 ? 'is-hovered' : ''}`}
              data-stat="experience"
              onMouseEnter={() => handleRowMouseEnter(2)}
              onMouseLeave={() => handleRowMouseLeave(2)}
              onClick={() => handleRowClick(2)}
            >
              <div className="stat-card-video-bg">
                <video
                  ref={(el) => (videoRefs.current[2] = el)}
                  className="stat-video-player"
                  loop
                  muted
                  playsInline
                  preload="none"
                >
                  <source src="/asstes/images/video-banner2.mp4" type="video/mp4" />
                </video>
                <div className="stat-video-overlay"></div>
              </div>
              <div className="stat-row-layout">
                <div className="stat-col-left">
                  <span className="stat-number-display stat-counter-num" data-target="16" data-suffix=" YEARS">
                    {counts.experience}
                  </span>
                  <span className="stat-hover-label">Years Of Research Excellence</span>
                </div>
                <div className="stat-col-middle">
                  <p className="stat-hover-desc">
                    Over 16 years empowering Fortune 500 brands and global consultancies with precision intelligence.
                  </p>
                </div>
                <div className="stat-col-right">
                  <Link href="/about" className="stat-explore-cta">
                    <span>Explore Our Legacy</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
