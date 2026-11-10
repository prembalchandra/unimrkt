const fs = require('fs');
const path = require('path');

console.log('Cleaning Home sections...');

// 1. HeroSection.jsx
const heroPath = path.join(__dirname, '../app/homesections/HeroSection.jsx');
let heroCode = fs.readFileSync(heroPath, 'utf8');
heroCode = heroCode
  .replace(
    "desc: s.description || s.shortDescription || 'Delivering structured market data enabling organizations to gain complete clarity into market dynamics.',",
    "desc: s.description || s.shortDescription || '',"
  )
  .replace(
    '<img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right" />',
    '<img src={getStrapiMedia("/uploads/arrow-right-icon-img.png")} alt="Arrow Right" />'
  );
if (!heroCode.includes("import { getStrapiMedia }")) {
  heroCode = heroCode.replace("import React, { useState, useEffect, useRef } from 'react';", "import React, { useState, useEffect, useRef } from 'react';\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(heroPath, heroCode, 'utf8');
console.log('✓ HeroSection.jsx updated');

// 2. GlobalResearchSection.jsx
const globalPath = path.join(__dirname, '../app/homesections/GlobalResearchSection.jsx');
let globalCode = fs.readFileSync(globalPath, 'utf8');
globalCode = globalCode
  .replace("const kicker = dynamicData?.kicker || 'About Us';", "const kicker = dynamicData?.kicker;")
  .replace("const heading = dynamicData?.heading || (\n    <>\n      Global Research,<br />Local Understanding\n    </>\n  );", "const heading = dynamicData?.heading || dynamicData?.title;")
  .replace("const description =\n    dynamicData?.description ||\n    'With 16+ years of expertise delivering structured research data, empowering organizations across 90+ countries to gain complete clarity into market dynamics, minimize risks, and uncover new opportunities.';", "const description = dynamicData?.description;")
  .replace("const statNumber = dynamicData?.metrics?.[1]?.number || '16';", "const statNumber = dynamicData?.metrics?.[1]?.number || dynamicData?.metrics?.[0]?.number || '';")
  .replace("const statLabel = dynamicData?.metrics?.[1]?.label || 'YEARS OF EXCELLENCE';", "const statLabel = dynamicData?.metrics?.[1]?.label || dynamicData?.metrics?.[0]?.label || '';");
fs.writeFileSync(globalPath, globalCode, 'utf8');
console.log('✓ GlobalResearchSection.jsx updated');

// 3. SolutionsSection.jsx
const solutionsPath = path.join(__dirname, '../app/homesections/SolutionsSection.jsx');
const solutionsCode = `'use client';

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
              className={\`solution-interactive-card \${activeCard === 'support' ? 'active' : ''}\`}
              data-card="support"
              onClick={() => handleCardClick('support')}
              onMouseEnter={() => handleCardMouseEnter('support')}
            >
              <div className="card-inner">
                <h3 className="card-title">{card1.title}</h3>
                <p className="card-description">{card1.description || card1.shortDescription}</p>
                <div className="card-action-btn" aria-label={\`Explore \${card1.title}\`}>
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
              className={\`solution-interactive-card \${activeCard === 'qualitative' ? 'active' : ''}\`}
              data-card="qualitative"
              onClick={() => handleCardClick('qualitative')}
              onMouseEnter={() => handleCardMouseEnter('qualitative')}
            >
              <div className="card-inner">
                <h3 className="card-title">{card2.title}</h3>
                <p className="card-description">{card2.description || card2.shortDescription}</p>
                <div className="card-action-btn" aria-label={\`Explore \${card2.title}\`}>
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
              className={\`solution-interactive-card \${activeCard === 'quantitative' ? 'active' : ''}\`}
              data-card="quantitative"
              onClick={() => handleCardClick('quantitative')}
              onMouseEnter={() => handleCardMouseEnter('quantitative')}
            >
              <div className="card-inner">
                <h3 className="card-title">{card3.title}</h3>
                <p className="card-description">{card3.description || card3.shortDescription}</p>
                <div className="card-action-btn" aria-label={\`Explore \${card3.title}\`}>
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
`;
fs.writeFileSync(solutionsPath, solutionsCode, 'utf8');
console.log('✓ SolutionsSection.jsx updated');

// 4. CapabilitiesSection.jsx
const capPath = path.join(__dirname, '../app/homesections/CapabilitiesSection.jsx');
let capCode = fs.readFileSync(capPath, 'utf8');
capCode = capCode
  .replace(
    "const targetSurveys = dynamicMetrics?.surveys || 250000;",
    "const targetSurveys = dynamicMetrics?.surveys || (dynamicMetrics?.metrics?.[0]?.number ? parseInt(dynamicMetrics.metrics[0].number.replace(/[^0-9]/g, '')) : 250000);"
  )
  .replace(
    "const targetStations = dynamicMetrics?.stations || 450;",
    "const targetStations = dynamicMetrics?.stations || (dynamicMetrics?.metrics?.[1]?.number ? parseInt(dynamicMetrics.metrics[1].number.replace(/[^0-9]/g, '')) : 450);"
  )
  .replace(
    "const targetExp = dynamicMetrics?.experience || 16;",
    "const targetExp = dynamicMetrics?.experience || (dynamicMetrics?.metrics?.[2]?.number ? parseInt(dynamicMetrics.metrics[2].number.replace(/[^0-9]/g, '')) : 16);"
  );
fs.writeFileSync(capPath, capCode, 'utf8');
console.log('✓ CapabilitiesSection.jsx updated');

// 5. AdvancedAreaSection.jsx
const advPath = path.join(__dirname, '../app/homesections/AdvancedAreaSection.jsx');
const advCode = `'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';

export default function AdvancedAreaSection({ dynamicCallout = null }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.defaultMuted = true;
    vid.playbackRate = 0.5;

    const handlePlay = () => {
      vid.playbackRate = 0.5;
    };
    vid.addEventListener('play', handlePlay);
    vid.addEventListener('loadedmetadata', handlePlay);

    const playVid = () => {
      const p = vid.play();
      if (p !== undefined) {
        p.catch(() => {
          const trigger = () => {
            vid.play().catch(() => {});
            ['click', 'touchstart', 'scroll', 'keydown'].forEach((evt) => {
              window.removeEventListener(evt, trigger);
            });
          };
          ['click', 'touchstart', 'scroll', 'keydown'].forEach((evt) => {
            window.addEventListener(evt, trigger, { once: true, passive: true });
          });
        });
      }
    };

    playVid();

    const handleVisibility = () => {
      if (!document.hidden && vid.paused) {
        vid.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      vid.removeEventListener('play', handlePlay);
      vid.removeEventListener('loadedmetadata', handlePlay);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const heading = dynamicCallout?.heading || dynamicCallout?.title;
  const desc = dynamicCallout?.description;
  const image = dynamicCallout?.image ? getStrapiMedia(dynamicCallout.image) : getStrapiMedia('/uploads/advanced-banner-img.png');

  return (
    <section className="advanced-area">
      <div className="cati-showcase-box-area">
        <div className="cati-video-backdrop-wrap">
          <video
            ref={videoRef}
            className="cati-wave-video"
            id="catiWaveVideo"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/asstes/images/advanced-banner-video2.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="srcn-container">
          <div className="cati-showcase-row">
            {image && (
              <div className="cati-image-col">
                <div className="cati-cutout-wrap">
                  <img
                    src={image}
                    alt={heading || 'CATI Workstations'}
                    className="cati-cutout-img"
                  />
                </div>
              </div>
            )}
            <div className="cati-text-col">
              {heading && <h2 className="cati-heading">{heading}</h2>}
              {desc && <p className="cati-desc">{desc}</p>}
              <Link href="/contact" className="btn-burgundy">
                <span>GET STARTED TODAY</span>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(advPath, advCode, 'utf8');
console.log('✓ AdvancedAreaSection.jsx updated');

// 6. IndustriesSection.jsx (homesections)
const indSecPath = path.join(__dirname, '../app/homesections/IndustriesSection.jsx');
let indSecCode = fs.readFileSync(indSecPath, 'utf8');
indSecCode = indSecCode
  .replace("return '/asstes/images/case-study-healthcare.jpg';", "return getStrapiMedia('/uploads/case-study-healthcare.jpg');")
  .replace("return '/asstes/images/case-study-banking.jpg';", "return getStrapiMedia('/uploads/case-study-banking.jpg');")
  .replace("return '/asstes/images/case-study-fmcg.jpg';", "return getStrapiMedia('/uploads/case-study-fmcg.jpg');")
  .replace("return '/asstes/images/case-study-automotive.jpg';", "return getStrapiMedia('/uploads/case-study-automotive.jpg');")
  .replace("return '/asstes/images/case-study-telecom.jpg';", "return getStrapiMedia('/uploads/case-study-telecom.jpg');")
  .replace("return '/asstes/images/case-study-energy.jpg';", "return getStrapiMedia('/uploads/case-study-energy.jpg');")
  .replace("return '/asstes/images/case-study-banking.jpg';", "return getStrapiMedia('/uploads/case-study-banking.jpg');");
fs.writeFileSync(indSecPath, indSecCode, 'utf8');
console.log('✓ IndustriesSection.jsx updated');

// 7. MarketplacesSection.jsx
const marketPath = path.join(__dirname, '../app/homesections/MarketplacesSection.jsx');
const marketCode = `'use client';

import React, { useState, useEffect } from 'react';
import { getStrapiMedia } from '@/lib/strapi';

function getOfficeImage(office) {
  if (office.image) return getStrapiMedia(office.image);
  const name = (office.officeName || office.country || '').toLowerCase();
  if (name.includes('india')) return getStrapiMedia('/uploads/office-india.png');
  if (name.includes('uk') || name.includes('united kingdom') || name.includes('oxford')) return getStrapiMedia('/uploads/office-uk.png');
  if (name.includes('usa') || name.includes('united states') || name.includes('york')) return getStrapiMedia('/uploads/office-usa.png');
  return getStrapiMedia('/uploads/office-india.png');
}

export default function MarketplacesSection({ initialOffices = [], dynamicSection = null }) {
  const [offices, setOffices] = useState(() => initialOffices || []);

  const heading = dynamicSection?.heading || dynamicSection?.title;
  const subtitle = dynamicSection?.description || dynamicSection?.subtitle;

  useEffect(() => {
    if (initialOffices && initialOffices.length > 0) {
      setOffices(initialOffices);
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(\`\${STRAPI_URL}/api/office-locations?sort=order:asc\`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setOffices(d.data);
          }
        })
        .catch(() => {});
    }
  }, [initialOffices]);

  return (
    <section className="global-marketplaces-section" id="marketplaces">
      <div className="moments-pattern-backdrop"></div>
      <div className="srcn-container">
        {(heading || subtitle) && (
          <div className="marketplaces-header text-center">
            {heading && <h2 className="marketplaces-title">{heading}</h2>}
            {subtitle && <p className="marketplaces-subtitle">{subtitle}</p>}
          </div>
        )}

        {offices.length > 0 && (
          <div className="office-cards-grid">
            {offices.map((office, idx) => {
              const img = getOfficeImage(office);
              return (
                <div key={office.id || idx} className="office-hub-card">
                  {img && (
                    <div className="office-image-box">
                      <img src={img} alt={office.officeName || office.country} />
                    </div>
                  )}
                  <div className="office-content">
                    <h3 className="office-name">{office.officeName || office.country}</h3>

                    {office.address && (
                      <div className="office-info-item">
                        <div className="office-icon">
                          <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div className="office-details">
                          <span className="office-info-label">LOCATION</span>
                          <p className="office-info-text">{office.address}</p>
                        </div>
                      </div>
                    )}

                    {office.email && (
                      <div className="office-info-item">
                        <div className="office-icon">
                          <i className="fa-regular fa-envelope"></i>
                        </div>
                        <div className="office-details">
                          <span className="office-info-label">EMAIL</span>
                          <p className="office-info-text">
                            <a href={\`mailto:\${office.email}\`}>{office.email}</a>
                          </p>
                        </div>
                      </div>
                    )}

                    {office.phoneNumbers && (
                      <div className="office-info-item">
                        <div className="office-icon">
                          <i className="fa-solid fa-phone"></i>
                        </div>
                        <div className="office-details">
                          <span className="office-info-label">CONTACT NUMBER</span>
                          <p className="office-info-text">{office.phoneNumbers}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="marketplaces-bottom-bar text-center">
          <span className="marketplaces-coverage-text">To know more about our global coverage, please email us at</span>
          <a href="mailto:sales@unimrkt.com" className="marketplaces-email-pill">
            SALES@UNIMRKT.COM
          </a>
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(marketPath, marketCode, 'utf8');
console.log('✓ MarketplacesSection.jsx updated');

// 8. MomentsSection.jsx
const momentsPath = path.join(__dirname, '../app/homesections/MomentsSection.jsx');
let momentsCode = fs.readFileSync(momentsPath, 'utf8');
momentsCode = momentsCode
  .replace(
    "`/asstes/images/gallery/gallery_item_0${(idx % 8) + 1}.webp`",
    "getStrapiMedia(`/uploads/gallery_item_0${(idx % 8) + 1}.webp`)"
  )
  .replace(
    "poster: item.poster || '/asstes/images/gallery-banner-img.png',",
    "poster: item.poster ? getStrapiMedia(item.poster) : getStrapiMedia('/uploads/gallery-banner-img.png'),"
  )
  .replace(
    "alt: item.caption || item.alt || item.title || 'Unimrkt research team moments',",
    "alt: item.caption || item.alt || item.title || '',"
  );
fs.writeFileSync(momentsPath, momentsCode, 'utf8');
console.log('✓ MomentsSection.jsx updated');

// 9. HomeFaq.jsx
const homeFaqPath = path.join(__dirname, '../app/homesections/HomeFaq.jsx');
let homeFaqCode = fs.readFileSync(homeFaqPath, 'utf8');
homeFaqCode = homeFaqCode
  .replace(
    '<img src="/asstes/images/unimrkt-resarch-map-banner-img.png" alt="fqa banner" />',
    '<img src={getStrapiMedia("/uploads/unimrkt-resarch-map-banner-img.png")} alt="fqa banner" />'
  )
  .replace(
    "const heading = dynamicFaq?.heading || dynamicFaq?.title || 'Frequently Asked Questions';",
    "const heading = dynamicFaq?.heading || dynamicFaq?.title;"
  );
if (!homeFaqCode.includes("import { getStrapiMedia }")) {
  homeFaqCode = homeFaqCode.replace("'use client';", "'use client';\n\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(homeFaqPath, homeFaqCode, 'utf8');
console.log('✓ HomeFaq.jsx updated');

// 10. QuestionCtaSection.jsx
const qCtaPath = path.join(__dirname, '../app/homesections/QuestionCtaSection.jsx');
const qCtaCode = `import React from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';

export default function QuestionCtaSection({
  dynamicCta = null,
  title,
  description,
  button,
  visualImageUrl,
} = {}) {
  const displayTitle = dynamicCta?.title || dynamicCta?.heading || title;
  const displayDesc = dynamicCta?.description || description;
  const buttonLabel = dynamicCta?.buttonText || button?.label || 'Get in Touch With Us';
  const buttonUrl = dynamicCta?.buttonUrl || button?.url || '/contact';
  const visualImage = getStrapiMedia(dynamicCta?.image || visualImageUrl, getStrapiMedia('/uploads/question-img.png'));

  if (!displayTitle && !displayDesc) return null;

  return (
    <section className="question-cta-section">
      <div className="srcn-container">
        <div className="question-cta-card">
          <div className="question-cta-content">
            {displayTitle && (
              <h2 className="question-cta-title" style={{ whiteSpace: 'pre-line' }}>
                {displayTitle}
              </h2>
            )}
            {displayDesc && <p className="question-cta-desc">{displayDesc}</p>}
            <Link href={buttonUrl} className="question-cta-btn">
              <span>{buttonLabel}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          {visualImage && (
            <div className="question-cta-visual">
              <img src={visualImage} alt={displayTitle || 'Question CTA'} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(qCtaPath, qCtaCode, 'utf8');
console.log('✓ QuestionCtaSection.jsx updated');

// 11. Update app/page.js
const homePagePath = path.join(__dirname, '../app/page.js');
let homePageCode = fs.readFileSync(homePagePath, 'utf8');
homePageCode = homePageCode.replace(
  "const [pageData, latestBlogs, industries, services, galleryItems] = await Promise.all([",
  "const [pageData, latestBlogs, industries, services, galleryItems, offices] = await Promise.all([\n    getPageBySlug('home').catch(() => null),\n    getBlogPosts(6).catch(() => []),\n    getIndustries(12).catch(() => []),\n    getServices(12).catch(() => []),\n    getGalleryItems(8).catch(() => []),\n    getOfficeLocations().catch(() => []),"
);
homePageCode = homePageCode.replace(
  "import { getBlogPosts, getPageBySlug, findSection, getIndustries, getServices, getGalleryItems } from '../lib/strapi';",
  "import { getBlogPosts, getPageBySlug, findSection, getIndustries, getServices, getGalleryItems, getOfficeLocations } from '../lib/strapi';"
);
homePageCode = homePageCode.replace(
  "<CapabilitiesSection />",
  "<CapabilitiesSection dynamicMetrics={metricsSection} />"
);
homePageCode = homePageCode.replace(
  "<AdvancedAreaSection />",
  "<AdvancedAreaSection dynamicCallout={findSection(pageData, 'sections.callout-box')} />"
);
homePageCode = homePageCode.replace(
  "<MarketplacesSection />",
  "<MarketplacesSection initialOffices={offices} dynamicSection={findSection(pageData, 'sections.research-reach')} />"
);
homePageCode = homePageCode.replace(
  "<SolutionsSection dynamicServices={services} />",
  "<SolutionsSection dynamicServices={services} dynamicSolutions={findSection(pageData, 'sections.accordion-solutions')} />"
);
fs.writeFileSync(homePagePath, homePageCode, 'utf8');
console.log('✓ app/page.js updated');

console.log('All Home sections cleaned successfully.');
