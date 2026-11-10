const fs = require('fs');
const path = require('path');

const heroConfigs = [
  {
    file: 'app/about/sections/AboutHero.jsx',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: null },
    ],
  },
  {
    file: 'app/automotives/sections/AutomotiveHero.jsx',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Industries', href: '/industries' },
      { label: 'Automotive', href: null },
    ],
  },
  {
    file: 'app/blog/sections/BlogHero.jsx',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: null },
    ],
  },
  {
    file: 'app/case-study/sections/CaseStudyHero.jsx',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Case Studies', href: null },
    ],
  },
  {
    file: 'app/contact/sections/ContactHero.jsx',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Contact', href: null },
    ],
  },
  {
    file: 'app/faq/sections/FaqHero.jsx',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'FAQ', href: null },
    ],
  },
  {
    file: 'app/gallery/sections/GalleryHero.jsx',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Gallery', href: null },
    ],
  },
  {
    file: 'app/our-company/sections/CompanyHero.jsx',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Our Company', href: null },
    ],
  },
  {
    file: 'app/primary-research/sections/PrimaryHero.jsx',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Primary Research', href: null },
    ],
  },
  {
    file: 'app/privacy-policy/sections/PrivacyHero.jsx',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Privacy Policy', href: null },
    ],
  },
  {
    file: 'app/services/sections/ServicesHero.jsx',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: null },
    ],
  },
  {
    file: 'app/team/sections/TeamHero.jsx',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Team', href: null },
    ],
  },
  {
    file: 'app/telephonic-surveys/sections/TelephonicHero.jsx',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Telephonic Surveys', href: null },
    ],
  },
  {
    file: 'app/work/sections/WorkHero.jsx',
    breadcrumb: [
      { label: 'Home', href: '/' },
      { label: 'Careers', href: null },
    ],
  },
];

heroConfigs.forEach(({ file, breadcrumb }) => {
  const fullPath = path.join(__dirname, '..', file);
  const componentName = path.basename(file, '.jsx');

  const breadcrumbJSX = breadcrumb
    .map((item, idx) => {
      if (item.href) {
        return `<Link href="${item.href}">${item.label}</Link><span aria-hidden="true">›</span>`;
      }
      return `<span aria-current="page">${item.label}</span>`;
    })
    .join('');

  const code = `'use client';

import React from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';

export default function ${componentName}({ dynamicHero = null }) {
  if (!dynamicHero) return null;

  const kicker = dynamicHero.kicker;
  const title = dynamicHero.title || dynamicHero.heading;
  const description = dynamicHero.description;
  const primaryBtnLabel = dynamicHero.primaryButton?.label || dynamicHero.button?.label;
  const primaryBtnUrl = dynamicHero.primaryButton?.url || dynamicHero.button?.url || '/contact';
  const secondaryBtnLabel = dynamicHero.secondaryButton?.label;
  const secondaryBtnUrl = dynamicHero.secondaryButton?.url || '/contact';
  const bannerSrc = getStrapiMedia(dynamicHero.bannerImage);

  if (!title && !description && !bannerSrc) return null;

  return (
    <>
      <section className="hero-common-area">
        {bannerSrc && (
          <div className="hero-common-banner">
            <img
              src={bannerSrc}
              className="hero-common-banner-area"
              alt={title || ''}
            />
          </div>
        )}
        <div className="srcn-container">
          <div className="hero-common-row">
            <div className="hero-common-content">
              <div className="hero-common-content-area">
                {kicker && (
                  <span className="hero-common-sub-title-area">
                    <i className="fa-solid fa-bolt" style={{ fontSize: '0.75rem', color: '#ff526b', marginRight: '6px' }}></i>
                    {kicker}
                  </span>
                )}
                {title && <h1 className="hero-commmon-heading-area">{title}</h1>}
                {description && <p className="hero-common-title">{description}</p>}
              </div>
              {(primaryBtnLabel || secondaryBtnLabel) && (
                <div className="hero-btn-area">
                  {primaryBtnLabel && (
                    <Link href={primaryBtnUrl} className="hero-common-btn-area btn-sm">
                      <span>{primaryBtnLabel}</span>
                      <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                    </Link>
                  )}
                  {secondaryBtnLabel && (
                    <Link href={secondaryBtnUrl} className="hero-common-btn-area btn-border-sm">
                      <span>{secondaryBtnLabel}</span>
                      <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="team-breadcrumb">
        <div className="srcn-container">
          <nav aria-label="Breadcrumb">
            ${breadcrumbJSX}
          </nav>
        </div>
      </div>
    </>
  );
}
`;

  fs.writeFileSync(fullPath, code, 'utf8');
  console.log(`Cleaned ${file}`);
});

console.log('All 14 Hero components cleaned successfully!');
