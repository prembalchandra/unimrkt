'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '../../../lib/strapi';

function getServiceVisuals(title = '', idx = 0) {
  const t = title.toLowerCase();
  let imgNum = (idx % 5) + 1;
  let iconName = 'primary-research-icon-img.png';

  if (t.includes('primary')) {
    imgNum = 1;
    iconName = 'primary-research-icon-img.png';
  } else if (t.includes('qualitative') || t.includes('telephonic') || t.includes('cati')) {
    imgNum = 2;
    iconName = 'qualitative-research-icon-img.png';
  } else if (t.includes('quantitative') || t.includes('survey')) {
    imgNum = 3;
    iconName = 'quantitative-research-icon-img.png';
  } else if (t.includes('business') || t.includes('desk') || t.includes('secondary')) {
    imgNum = 4;
    iconName = 'business-research-icon-img.png';
  } else {
    imgNum = 5;
    iconName = 'research-support-functions-img.png';
  }

  return {
    image: `/asstes/images/unimrkt-resarch-our-services-img${imgNum}${imgNum === 3 ? '.png.png' : '.png'}`,
    icon: `/asstes/images/icon/${iconName}`,
  };
}

function formatService(s, idx) {
  if (!s) return null;
  const title = s.title || '';
  const visuals = getServiceVisuals(title, idx);
  const slug = s.slug || '';
  let link = '/services';
  if (slug === 'primary-research') link = '/primary-research';
  else if (slug === 'telephonic-surveys') link = '/telephonic-surveys';
  else if (slug) link = `/services`;

  return {
    id: s.id || s.documentId || idx + 1,
    title,
    desc: s.shortDescription || s.description || 'Comprehensive data collection, analysis, and strategic intelligence tailored for global organizations.',
    image: visuals.image,
    icon: visuals.icon,
    link,
  };
}

export default function EndToEndSolutions({ initialServices = [], dynamicSection = null }) {
  const [solutions, setSolutions] = useState(() => (initialServices || []).map(formatService).filter(Boolean));
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const displayKicker = dynamicSection?.kicker || 'OUR SERVICES';
  const displayTitle = dynamicSection?.heading || dynamicSection?.title || 'End-To-End Market Research Solutions';
  const displayDesc = dynamicSection?.description || 'From research design and respondent recruitment to data collection, analysis, and reporting, Unimrkt Research provides comprehensive market research solutions tailored to your business objectives. Our expert team delivers accurate, actionable insights that help organizations make informed decisions, uncover opportunities, and drive sustainable growth.';

  useEffect(() => {
    if (initialServices && initialServices.length > 0) {
      setSolutions(initialServices.map(formatService).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/services?populate=*&pagination[limit]=6`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setSolutions(d.data.map(formatService).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [initialServices]);

  if (solutions.length === 0) return null;

  return (
    <section className="end-to-end-solutions-section">
      <div className="srcn-container">
        <div className="end-to-end-header">
          <span className="end-to-end-eyebrow">{displayKicker}</span>
          <h2 className="end-to-end-title">{displayTitle}</h2>
          <p className="end-to-end-desc">
            {displayDesc}
          </p>
        </div>

        <div
          className="end-to-end-accordion"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {solutions.slice(0, 5).map((item, index) => {
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
                    <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right" />
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
