'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const solutionsData = [
  {
    id: 1,
    title: 'Primary Research',
    desc: 'Gather first-hand insights from target audiences through qualitative and quantitative research. Understand customer needs, behaviours, attitudes and experiences to uncover meaningful insights and support confident business decisions.',
    image: '/asstes/images/unimrkt-resarch-our-services-img1.webp',
    icon: '/asstes/images/icon/primary-research-icon-img.png',
    link: '/primary-research',
  },
  {
    id: 2,
    title: 'Qualitative Research',
    desc: 'Uncover deep consumer motivations, perceptions, and emotional drivers through focused group discussions, in-depth interviews, and ethnographic studies that reveal the underlying reasons behind market decisions.',
    image: '/asstes/images/unimrkt-resarch-our-services-img2.webp',
    icon: '/asstes/images/icon/qualitative-research-icon-img.png',
    link: '/telephonic-surveys',
  },
  {
    id: 3,
    title: 'Quantitative Research',
    desc: 'Measure market trends, customer behaviours and opinions at scale through structured surveys and data-driven research, delivering reliable insights that support strategic decisions and business growth.',
    image: '/asstes/images/unimrkt-resarch-our-services-img3.png.webp',
    icon: '/asstes/images/icon/quantitative-research-icon-img.png',
    link: '/telephonic-surveys',
  },
  {
    id: 4,
    title: 'Business Research',
    desc: 'Gain strategic competitive intelligence, market sizing, industry benchmarking, and supply-chain evaluations to inform high-stakes corporate decisions and capitalize on new market opportunities.',
    image: '/asstes/images/unimrkt-resarch-our-services-img4.webp',
    icon: '/asstes/images/icon/business-research-icon-img.png',
    link: '/blog',
  },
  {
    id: 5,
    title: 'Research Support Functions',
    desc: 'Empower your research operations with specialized survey programming, data processing, statistical modeling, advanced translation, and reporting services delivered by experienced specialists.',
    image: '/asstes/images/unimrkt-resarch-our-services-img5.webp',
    icon: '/asstes/images/icon/research-support-functions-img.png',
    link: '/blog',
  },
];

export default function EndToEndSolutions() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="end-to-end-solutions-section">
      <div className="srcn-container">
        <div className="end-to-end-header">
          <span className="end-to-end-eyebrow">OUR SERVICES</span>
          <h2 className="end-to-end-title">End-To-End Market Research Solutions</h2>
          <p className="end-to-end-desc">
            From research design and respondent recruitment to data collection, analysis, and reporting, Unimrkt Research provides comprehensive market research solutions tailored to your business objectives. Our expert team delivers accurate, actionable insights that help organizations make informed decisions, uncover opportunities, and drive sustainable growth.
          </p>
        </div>

        <div
          className="end-to-end-accordion"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {solutionsData.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const isCollapsed = hoveredIndex !== null && !isHovered;

            return (
              <div
                key={item.id}
                className={`end-to-end-card ${isHovered ? 'is-expanded' : ''} ${isCollapsed ? 'is-collapsed' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => setHoveredIndex(index)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="end-to-end-card-bg"
                />
                <div className="end-to-end-card-overlay" />
                <div className="end-to-end-default-view">
                  <div className="end-to-end-default-icon">
                    <img src={item.icon} alt={item.title} />
                  </div>
                  <h3 className="end-to-end-default-title">{item.title}</h3>
                </div>
                <div className="end-to-end-collapsed-view">
                  <span className="end-to-end-vertical-title">{item.title}</span>
                  <div className="end-to-end-collapsed-icon">
                    <img src={item.icon} alt={item.title} />
                  </div>
                </div>
                <div className="end-to-end-expanded-view">
                  <div className="end-to-end-expanded-head">
                    <div className="end-to-end-expanded-icon">
                      <img src={item.icon} alt={item.title} />
                    </div>
                    <h3 className="end-to-end-expanded-title">{item.title}</h3>
                  </div>
                  <p className="end-to-end-expanded-desc ">{item.desc}</p>
                  <Link
                    href={item.link}
                    className="end-to-end-btn btn-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>EXPLORE RESEARCH</span>
                    <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right"/>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
