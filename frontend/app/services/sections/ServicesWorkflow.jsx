
'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';


const processSteps = [
  {
    num: '01',
    icon: '/asstes/images/icon/understand-clipboard-tick-icon-img.png',
    title: 'Discover Your Objectives',
    desc: ' Every successful research project starts with a clear understanding of the business challenge. We work closely with you to identify your goals, target audience, key questions and desired outcomes, creating a focused foundation for the right research approach and ensuring every insight contributes meaningfully to your business decisions.',
  },
  {
    num: '02',
    icon: '/asstes/images/icon/design-brush-ion-img.png',
    title: 'Design the Research',
    desc: 'Once objectives are clear, we develop the right research framework around your business needs. From methodology and audience definition to sample design, questionnaires and research tools, we carefully structure every element to ensure the study captures relevant information and delivers reliable, meaningful insights for confident decision-making.',
  },
  {
    num: '03',
    icon: '/asstes/images/icon/research-presention-chart-icon-img.png',
    title: 'Collect Quality Data',
    desc: 'We use structured fieldwork processes, trained researchers and robust quality checks to collect accurate, reliable data from the right audiences. From respondent validation and interview monitoring to data consistency and verification, every stage is carefully managed to maintain research quality and provide a dependable foundation for meaningful analysis and insights.',
  },
  {
    num: '04',
    icon: '/asstes/images/icon/analyze-chart-icon-img.png',
    title: 'Analyze & Validate',
    desc: 'Once data is collected, we carefully analyze and validate the findings to identify meaningful patterns, trends and relationships. Our structured review process helps ensure data accuracy, consistency and relevance, allowing us to separate reliable signals from noise and build a strong foundation for actionable research insights.',
  },
   {
    num: '05',
    icon: '/asstes/images/icon/analyze-chart-icon-img.png',
    title: 'Analyze & Validate',
    desc: 'Once data is collected, we carefully analyze and validate the findings to identify meaningful patterns, trends and relationships. Our structured review process helps ensure data accuracy, consistency and relevance, allowing us to separate reliable signals from noise and build a strong foundation for actionable research insights.',
  },
];

export default function ResearchProcessImpact() {
  const slidersRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (!slidersRef.current || !paginationRef.current) return;

    const swiper = new Swiper(slidersRef.current, {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 16,
      speed: 700,
      grabCursor: true,
      loop: true,
      watchOverflow: true,

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },

      pagination: {
        el: paginationRef.current,
        clickable: true,
        dynamicBullets: false,
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        540: {
          slidesPerView: 1.5,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 2.5,
          spaceBetween: 18,
        },
        991: {
          slidesPerView: 3.5,
          spaceBetween: 18,
        },

        1400: {
          slidesPerView: 3.5,
          spaceBetween: 10,
        },
      },
    });

    swiperInstanceRef.current = swiper;

    return () => {
      swiper.destroy(true, true);
      swiperInstanceRef.current = null;
    };
  }, []);

  return (
    <section
      className="research-process-section"
      id="research-process"
    >
      <div className="research-process-container">
        <header className="research-process-header section-header-area">
          <span className="research-process-kicker career-values-kicker">
            WORKFLOW
          </span>
          <h2 className="research-process-heading section-main-heading">
          Research Process
          </h2>
          <p className="research-process-desc section-sub-text">
          Our proven research process combines strategic planning, precise data collection, rigorous analysis, and actionable reporting to deliver reliable insights that support confident business decisions and measurable growth.
          </p>
        </header>

        <div className='common-swiper-box'>
          <div
          className="research-process-swiper swiper"
          ref={slidersRef}
        >
          <div className="swiper-wrapper">
            {processSteps.map((step) => (
              <div
                className="swiper-slide research-process-slide"
                key={step.num}
              >
                <article className="process-impact-card">
                  <span className="process-impact-number">
                    {step.num}
                  </span>

                  <div className="process-impact-icon-wrap">
                    <img
                      src={step.icon}
                      alt={step.title}
                      loading="lazy"
                    />
                  </div>

                  <h3 className="process-impact-title">
                    {step.title}
                  </h3>

                  <p className="process-impact-desc">
                    {step.desc}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div
          className="research-process-pagination"
          ref={paginationRef}
        />
        </div>
      </div>
    </section>
  );
}
