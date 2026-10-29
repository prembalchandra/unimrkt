'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const processSteps = [
  {
    num: '01',
    icon: '/asstes/images/icon/understand-clipboard-tick-icon-img.png',
    title: 'Understand',
    desc: 'We begin by understanding your business question, objectives and the decisions you need to make. By identifying the core challenge, market context and information gaps, we establish a clear research direction that keeps the study focused, relevant and aligned with your strategic priorities, customer needs and desired business outcomes.',
  },
  {
    num: '02',
    icon: '/asstes/images/icon/design-brush-ion-img.png',
    title: 'Design',
    desc: 'We select the right research methodology and audience based on your objectives, market and business needs. From qualitative and quantitative approaches to specialized research techniques, we identify the most relevant participants, markets and channels to ensure meaningful data, reliable findings and insights that directly address your research questions.',
  },
  {
    num: '03',
    icon: '/asstes/images/icon/research-presention-chart-icon-img.png',
    title: 'Research',
    desc: 'We gather relevant primary and secondary data from credible sources and carefully selected audiences. Through surveys, interviews, discussions, desk research and other appropriate methods, we collect reliable evidence that provides a comprehensive understanding of market conditions, customer behaviors, industry trends and the factors influencing key business decisions.',
  },
  {
    num: '04',
    icon: '/asstes/images/icon/analyze-chart-icon-img.png',
    title: 'Analyze',
    desc: 'We analyze the research to identify meaningful patterns, key drivers, emerging trends and untapped opportunities. By connecting data points across audiences, markets and industries, we uncover what influences decisions, where gaps exist and which opportunities can help businesses strengthen strategies and respond effectively to changing market needs.',
  },
  {
    num: '05',
    icon: '/asstes/images/icon/deliver-icon-img.png',
    title: 'Deliver',
    desc: 'We synthesize findings into clear, executive-ready presentations, data visualizations, and strategic frameworks that enable your leadership team to make confident, informed business decisions.',
  },
  {
    num: '06',
    icon: '/asstes/images/icon/ouality-check-icon-img.png',
    title: 'Empower',
    desc: 'We support your team throughout implementation, providing continued market monitoring, competitive benchmarking, and tailored recommendations that ensure long-term commercial growth.',
  },
];

export default function ResearchProcessImpact() {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    swiperInstanceRef.current = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 16,
      grabCursor: true,
      loop: true,
      speed: 700,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      pagination: {
        el: paginationRef.current,
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className}" role="button" aria-label="Go to slide ${index + 1}"></span>`;
        },
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        540: {
          slidesPerView: 1.25,
          spaceBetween: 18,
        },
        720: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3.5,
          spaceBetween: 22,
        },
      },
    });

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
      }
    };
  }, []);

  return (
    <section className="research-process-section" id="research-process">
      <div className="research-process-container">
        <div className="research-process-header section-header-area">
          <span className="research-process-kicker career-values-kicker">INDUSTRY RESEARCH PROCESS</span>
          <h2 className="research-process-heading section-main-heading">Turning Research Into Impact</h2>
          <p className="research-process-desc section-sub-text">
           Transforming industry questions, market data and customer insights into actionable strategies that help businesses make informed decisions. Our research connects evidence with business objectives, uncovering meaningful opportunities, addressing challenges and enabling organizations to create measurable impact, strengthen strategies and support sustainable growth.
          </p>
        </div>
        <div className='common-swiper-box'>
        <div className="swiper research-process-swiper" ref={sliderRef}>
          <div className="swiper-wrapper">
            {processSteps.map((step) => (
              <div key={step.num} className="swiper-slide research-process-slide">
                <article className="process-impact-card">
                  <span className="process-impact-number">{step.num}</span>
                  <div className="process-impact-icon-wrap">
                    <img src={step.icon} alt={step.title} loading="lazy" />
                  </div>
                  <h3 className="process-impact-title">{step.title}</h3>
                  <p className="process-impact-desc">{step.desc}</p>
                </article>
              </div>
            ))}
          </div>
          <div className="research-process-pagination" ref={paginationRef}></div>
        </div>
        </div>
      </div>
    </section>
  );
}
