const fs = require('fs');
const path = require('path');

console.log('Cleaning Case Study & Case Study Details sections...');

// 1. CaseStudyExplorer.jsx
const csExpPath = path.join(__dirname, '../app/case-study/sections/CaseStudyExplorer.jsx');
let csExpCode = fs.readFileSync(csExpPath, 'utf8');
csExpCode = csExpCode
  .replace(
    "const indSlug = item.industry?.slug || 'banking-finance';",
    "const indSlug = item.industry?.slug || '';"
  )
  .replace(
    "const indName = item.industry?.title || item.industry?.name || 'BANKING & FINANCE';",
    "const indName = item.industry?.title || item.industry?.name || '';"
  )
  .replace(
    "const resSlug = item.researchType?.slug || 'consumer-insights';",
    "const resSlug = item.researchType?.slug || '';"
  )
  .replace(
    "img: getStrapiMedia(item.heroImage, '/asstes/images/case-study-banking.jpg'),",
    "img: getStrapiMedia(item.heroImage, getStrapiMedia('/uploads/case-study-banking.jpg')),"
  )
  .replace(
    "const displayKicker = dynamicSection?.kicker || kicker || 'Case Study Explorer';",
    "const displayKicker = dynamicSection?.kicker || kicker;"
  )
  .replace(
    "const displayTitle = dynamicSection?.heading || dynamicSection?.title || title || 'Explore Our Research Stories';",
    "const displayTitle = dynamicSection?.heading || dynamicSection?.title || title;"
  )
  .replace(
    "const displayDesc =\n    dynamicSection?.description ||\n    description ||\n    'Discover how we solve complex research challenges across industries, markets and methodologies.';",
    "const displayDesc = dynamicSection?.description || description;"
  );
fs.writeFileSync(csExpPath, csExpCode, 'utf8');
console.log('✓ CaseStudyExplorer.jsx updated');

// 2. ResearchValue.jsx (case-study)
const resValPath = path.join(__dirname, '../app/case-study/sections/ResearchValue.jsx');
const resValCode = `import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

function getValueIcon(idx = 0) {
  const icons = [
    getStrapiMedia('/uploads/connection-icon-img.png'),
    getStrapiMedia('/uploads/analysis-research-icon-img.png'),
    getStrapiMedia('/uploads/insight-icon-img.png'),
    getStrapiMedia('/uploads/growth-impact-icon-img.png')
  ];
  return icons[idx % icons.length];
}

export default function ResearchValue({ dynamicValues = null }) {
  const kicker = dynamicValues?.kicker;
  const heading = dynamicValues?.heading || dynamicValues?.title;
  const rawCards = dynamicValues?.values || [];

  const cards = rawCards.map((v, i) => ({
    icon: v.icon ? getStrapiMedia(v.icon) : getValueIcon(i),
    title: v.title || '',
    desc: v.description || '',
  }));

  if (cards.length === 0 && !heading) return null;

  return (
    <section className="research-value-section">
      <div className="srcn-container">
        <div className="research-value-wrap">
          {(kicker || heading) && (
            <div className="research-value-header">
              {kicker && <span className="research-value-kicker career-values-kicker">{kicker}</span>}
              {heading && (
                <h2 className="research-value-title section-main-heading">
                  {heading}
                </h2>
              )}
            </div>
          )}

          {cards.length > 0 && (
            <div className="research-value-grid">
              {cards.map((card, idx) => (
                <article key={idx} className="research-value-card">
                  {card.icon && (
                    <div className="value-icon-wrap">
                      <img src={card.icon} alt={card.title} />
                    </div>
                  )}
                  {card.title && <h3>{card.title}</h3>}
                  {card.desc && <p>{card.desc}</p>}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(resValPath, resValCode, 'utf8');
console.log('✓ ResearchValue.jsx (case-study) updated');

// 3. ContactProcess.jsx (case-study)
const contactProcPath = path.join(__dirname, '../app/case-study/sections/ContactProcess.jsx');
let contactProcCode = fs.readFileSync(contactProcPath, 'utf8');
contactProcCode = contactProcCode
  .replace(
    "title: t.title || 'Client Partnership',",
    "title: t.title || '',"
  )
  .replace(
    "const displayKicker = dynamicSection?.kicker || kicker || 'How it works';",
    "const displayKicker = dynamicSection?.kicker || kicker;"
  )
  .replace(
    "const displayTitle = dynamicSection?.heading || dynamicSection?.title || title || 'What Happens After You Contact Us?';",
    "const displayTitle = dynamicSection?.heading || dynamicSection?.title || title;"
  )
  .replace(
    "const displayDesc =\n    dynamicSection?.description ||\n    description ||\n    'A simple process designed to understand your requirement and connect you with the right research expert.';",
    "const displayDesc = dynamicSection?.description || description;"
  )
  .replace(
    '<img src="/asstes/images/icon/testimonial-icon-img.png" alt="Testimonial quote icon" />',
    '<img src={getStrapiMedia("/uploads/testimonial-icon-img.png")} alt="Testimonial quote icon" />'
  );
if (!contactProcCode.includes("import { getStrapiMedia }")) {
  contactProcCode = "import { getStrapiMedia } from '@/lib/strapi';\n" + contactProcCode;
}
fs.writeFileSync(contactProcPath, contactProcCode, 'utf8');
console.log('✓ ContactProcess.jsx updated');

// 4. CaseStudyFaq.jsx
const csFaqPath = path.join(__dirname, '../app/case-study/sections/CaseStudyFaq.jsx');
let csFaqCode = fs.readFileSync(csFaqPath, 'utf8');
csFaqCode = csFaqCode
  .replace(
    '<img src="/asstes/images/unimrkt-resarch-map-banner-img.png" alt="fqa banner" />',
    '<img src={getStrapiMedia("/uploads/unimrkt-resarch-map-banner-img.png")} alt="fqa banner" />'
  )
  .replace(
    "{dynamicFaq?.title || 'Frequently Asked Questions'}",
    "{dynamicFaq?.title || dynamicFaq?.heading}"
  );
if (!csFaqCode.includes("import { getStrapiMedia }")) {
  csFaqCode = "import { getStrapiMedia } from '@/lib/strapi';\n" + csFaqCode;
}
fs.writeFileSync(csFaqPath, csFaqCode, 'utf8');
console.log('✓ CaseStudyFaq.jsx updated');

// 5. CaseDetailHero.jsx
const cdHeroPath = path.join(__dirname, '../app/case-study-details/sections/CaseDetailHero.jsx');
let cdHeroCode = fs.readFileSync(cdHeroPath, 'utf8');
cdHeroCode = cdHeroCode
  .replace(
    "const displayKicker = kicker || dynamicHero?.kicker || dynamicHero?.industry?.title || 'BANKING & FINANCE';",
    "const displayKicker = kicker || dynamicHero?.kicker || dynamicHero?.industry?.title;"
  )
  .replace(
    "const displayTitle =\n    title ||\n    dynamicHero?.title ||\n    'Understanding Customer Expectations In A Changing Financial Market';",
    "const displayTitle = title || dynamicHero?.title;"
  )
  .replace(
    "const displayDesc =\n    description ||\n    dynamicHero?.description ||\n    dynamicHero?.excerpt ||\n    'How research uncovered evolving customer needs, digital expectations, and decision-making drivers to help a financial services organization strengthen its customer strategy.';",
    "const displayDesc = description || dynamicHero?.description || dynamicHero?.excerpt;"
  )
  .replace(
    "const imgSrc = getStrapiMedia(heroImage || dynamicHero?.heroImage, '/asstes/images/case-study-banking.jpg');",
    "const imgSrc = getStrapiMedia(heroImage || dynamicHero?.heroImage, getStrapiMedia('/uploads/case-study-banking.jpg'));"
  );
fs.writeFileSync(cdHeroPath, cdHeroCode, 'utf8');
console.log('✓ CaseDetailHero.jsx updated');

// 6. CaseDetailApproach.jsx
const cdAppPath = path.join(__dirname, '../app/case-study-details/sections/CaseDetailApproach.jsx');
const cdAppCode = `import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

function getStepIcon(step, idx = 0) {
  if (step.icon) return getStrapiMedia(step.icon);
  const title = (step.title || '').toLowerCase();
  if (title.includes('define')) return getStrapiMedia('/uploads/Define-icon-img.png');
  if (title.includes('discover') || title.includes('discovery')) return getStrapiMedia('/uploads/discovery-icon-img.png');
  if (title.includes('measure')) return getStrapiMedia('/uploads/measure-icon-img.png');
  if (title.includes('segment')) return getStrapiMedia('/uploads/segment-icon-img.png');
  if (title.includes('analyse') || title.includes('analyze')) return getStrapiMedia('/uploads/analyse-icon-img.png');
  if (title.includes('activate')) return getStrapiMedia('/uploads/activate-icon-img.png');
  const defaults = [
    getStrapiMedia('/uploads/Define-icon-img.png'),
    getStrapiMedia('/uploads/discovery-icon-img.png'),
    getStrapiMedia('/uploads/measure-icon-img.png'),
    getStrapiMedia('/uploads/segment-icon-img.png'),
    getStrapiMedia('/uploads/analyse-icon-img.png'),
    getStrapiMedia('/uploads/activate-icon-img.png'),
  ];
  return defaults[idx % defaults.length];
}

export default function CaseDetailApproach({ approachSteps = [], heading, kicker, description }) {
  const stepsToRender = approachSteps || [];

  if (stepsToRender.length === 0 && !heading) return null;

  return (
    <section className="approach-section">
      <div className="srcn-container">
        <div className="approach-container">
          {(kicker || heading || description) && (
            <div className="approach-header career-journey-header">
              {kicker && <span className="approach-eyebrow career-journey-kicker career-values-kicker">{kicker}</span>}
              {heading && <h2 className="approach-title section-main-heading">{heading}</h2>}
              {description && <p className="approach-description section-sub-text">{description}</p>}
            </div>
          )}

          {stepsToRender.length > 0 && (
            <div className="approach-grid">
              {stepsToRender.map((step, index) => {
                const icon = getStepIcon(step, index);
                return (
                  <article key={step.id || index} className="approach-card career-journey-step">
                    <div className="approach-card-box-area">
                      {icon && (
                        <div className="approach-icon career-journey-icon">
                          <img src={icon} alt={step.title} />
                        </div>
                      )}
                      <div className="career-journey-content">
                        {step.title && <h3 className="approach-card-title">{step.title}</h3>}
                        {(step.desc || step.description) && (
                          <p className="approach-card-description">{step.desc || step.description}</p>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(cdAppPath, cdAppCode, 'utf8');
console.log('✓ CaseDetailApproach.jsx updated');

// 7. CaseDetailImpact.jsx
const cdImpPath = path.join(__dirname, '../app/case-study-details/sections/CaseDetailImpact.jsx');
const cdImpCode = `import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function CaseDetailImpact({ impacts = [], kicker, heading, description }) {
  const impactsToRender = impacts || [];

  if (impactsToRender.length === 0 && !heading) return null;

  const cardIcon = getStrapiMedia('/uploads/identified-icon-img.png');

  return (
    <section className="impact-section">
      <div className="srcn-container">
        <div className="impact-container">
          {(kicker || heading || description) && (
            <div className="impact-header career-journey-header">
              {kicker && <span className="impact-subtitle career-values-kicker">{kicker}</span>}
              {heading && <h2 className="impact-title section-main-heading">{heading}</h2>}
              {description && <p className="impact-description section-sub-text">{description}</p>}
            </div>
          )}

          {impactsToRender.length > 0 && (
            <div className="impact-cards-wrapper-area">
              <div className="impact-cards-grid">
                {impactsToRender.map((item, index) => {
                  const title = typeof item === 'string' ? item : item.title || item.heading || '';
                  return (
                    <article key={item.id || index} className="impact-card">
                      <div className="impact-card-area">
                        {cardIcon && (
                          <div className="impact-icon">
                            <img src={cardIcon} alt={title.replace(/\\n/g, ' ')} />
                          </div>
                        )}
                        <div className="impact-card-content-area">
                          <h3>
                            {title.split('\\n').map((line, i) => (
                              <React.Fragment key={i}>
                                {line}
                                {i < title.split('\\n').length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </h3>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(cdImpPath, cdImpCode, 'utf8');
console.log('✓ CaseDetailImpact.jsx updated');

// 8. CaseDetailChallenge.jsx
const cdChallPath = path.join(__dirname, '../app/case-study-details/sections/CaseDetailChallenge.jsx');
const cdChallCode = `import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function CaseDetailChallenge({
  dynamicSection = null,
  kicker = null,
  heading = null,
  description = null,
  subtitle = null,
  bullets = [],
  summary = null,
  image = null,
}) {
  const displayKicker = kicker || dynamicSection?.kicker || dynamicSection?.challengeKicker;
  const displayHeading = heading || dynamicSection?.heading || dynamicSection?.title || dynamicSection?.challengeTitle;
  const displayDesc = description || dynamicSection?.description || dynamicSection?.challengeDescription;
  const displaySubtitle = subtitle || dynamicSection?.subtitle || dynamicSection?.challengeSubtitle;
  const displayBullets = (bullets && bullets.length > 0)
    ? bullets
    : (dynamicSection?.challengeBullets && dynamicSection.challengeBullets.length > 0)
      ? dynamicSection.challengeBullets.map(b => typeof b === 'string' ? b : b.text || b.title || '')
      : [];
  const displaySummary = summary || dynamicSection?.summary || dynamicSection?.challengeSummary;
  const visualImage = getStrapiMedia(image || dynamicSection?.image || dynamicSection?.challengeImage, getStrapiMedia('/uploads/challenge-portrait.png'));

  if (!displayHeading && !displayDesc && displayBullets.length === 0) return null;

  return (
    <section className="cs-detail-challenge-section">
      <div className="srcn-container">
        <div className="cs-challenge-grid">
          {/* Left: Circular Avatar Image */}
          {visualImage && (
            <div className="cs-challenge-visual">
              <div className="cs-challenge-avatar-frame">
                <img src={visualImage} alt={displayHeading || 'Challenge'} />
              </div>
            </div>
          )}

          {/* Right: Content */}
          <div className="cs-challenge-content">
            {displayKicker && <span className="cs-kicker-red career-values-kicker">{displayKicker}</span>}
            {displayHeading && <h2 className="cs-challenge-title section-main-heading">{displayHeading}</h2>}
            {displayDesc && <p className="cs-challenge-text">{displayDesc}</p>}

            {displaySubtitle && <p className="cs-challenge-subtitle">{displaySubtitle}</p>}
            {displayBullets.length > 0 && (
              <ul className="cs-challenge-bullets">
                {displayBullets.map((b, idx) => (
                  <li key={idx}>{typeof b === 'string' ? b : b.text || b.title}</li>
                ))}
              </ul>
            )}

            {displaySummary && <p className="cs-challenge-summary">{displaySummary}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(cdChallPath, cdChallCode, 'utf8');
console.log('✓ CaseDetailChallenge.jsx updated');

// 9. CaseDetailResearchQuestion.jsx
const cdRqPath = path.join(__dirname, '../app/case-study-details/sections/CaseDetailResearchQuestion.jsx');
const cdRqCode = `import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

function getPillarIcon(p, idx = 0) {
  if (p.icon) return getStrapiMedia(p.icon);
  const name = (p.name || p.title || '').toLowerCase();
  if (name.includes('trust')) return getStrapiMedia('/uploads/trust-shield-tick-icon-img.png');
  if (name.includes('convenien')) return getStrapiMedia('/uploads/convenience-iocn-img.png');
  if (name.includes('digital') || name.includes('experience')) return getStrapiMedia('/uploads/review-icon-img.png');
  if (name.includes('relation') || name.includes('partner')) return getStrapiMedia('/uploads/handshake-partnership-icon-img.png');
  if (name.includes('value') || name.includes('excellen')) return getStrapiMedia('/uploads/cup-research%20excellence-icon-img.png');
  const defaults = [
    getStrapiMedia('/uploads/trust-shield-tick-icon-img.png'),
    getStrapiMedia('/uploads/convenience-iocn-img.png'),
    getStrapiMedia('/uploads/review-icon-img.png'),
    getStrapiMedia('/uploads/handshake-partnership-icon-img.png'),
    getStrapiMedia('/uploads/cup-research%20excellence-icon-img.png'),
  ];
  return defaults[idx % defaults.length];
}

export default function CaseDetailResearchQuestion({
  dynamicSection = null,
  kicker = null,
  heading = null,
  description = null,
  pillars = [],
}) {
  const displayKicker = kicker || dynamicSection?.kicker;
  const displayHeading = heading || dynamicSection?.heading || dynamicSection?.title;
  const displayDesc = description || dynamicSection?.description;

  const displayPillars = (pillars && pillars.length > 0)
    ? pillars
    : (dynamicSection?.researchPillars && dynamicSection.researchPillars.length > 0)
      ? dynamicSection.researchPillars
      : [];

  if (!displayHeading && displayPillars.length === 0) return null;

  return (
    <section className="cs-detail-research-question-section">
      <div className="srcn-container">
        <div className="cs-question-card">
          {(displayKicker || displayHeading || displayDesc) && (
            <div className="cs-question-header">
              {displayKicker && <span className="cs-kicker-red career-values-kicker">{displayKicker}</span>}
              {displayHeading && <h2 className="cs-question-title section-main-heading">{displayHeading}</h2>}
              {displayDesc && <p className="cs-question-desc section-sub-text">{displayDesc}</p>}
            </div>
          )}

          {displayPillars.length > 0 && (
            <div className="cs-diagram-container">
              <div className="cs-diagram-row">
                {displayPillars.map((p, idx) => {
                  const name = p.name || p.title || '';
                  const text = p.desc || p.description || '';
                  const icon = getPillarIcon(p, idx);
                  const stepNum = (idx % 5) + 1;

                  return (
                    <div key={p.id || idx} className={\`cs-diagram-item cs-step-\${stepNum}\`}>
                      <div className="cs-circle-wrap">
                        {icon && (
                          <div className="cs-diagram-circle">
                            <img src={icon} alt={name} />
                          </div>
                        )}
                      </div>
                      <div className="cs-diagram-stem"></div>
                      <div className="cs-diagram-info">
                        {name && <h4 className="cs-diagram-name">{name}</h4>}
                        {text && <p className="cs-diagram-text">{text}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(cdRqPath, cdRqCode, 'utf8');
console.log('✓ CaseDetailResearchQuestion.jsx updated');

// 10. CaseDetailFaq.jsx
const cdFaqPath = path.join(__dirname, '../app/case-study-details/sections/CaseDetailFaq.jsx');
let cdFaqCode = fs.readFileSync(cdFaqPath, 'utf8');
cdFaqCode = cdFaqCode
  .replace(
    '<img src="/asstes/images/unimrkt-resarch-map-banner-img.png" alt="faq banner" />',
    '<img src={getStrapiMedia("/uploads/unimrkt-resarch-map-banner-img.png")} alt="faq banner" />'
  )
  .replace(
    "const displayHeading = heading || dynamicFaq?.heading || dynamicFaq?.title || 'Frequently Asked Questions';",
    "const displayHeading = heading || dynamicFaq?.heading || dynamicFaq?.title;"
  );
if (!cdFaqCode.includes("import { getStrapiMedia }")) {
  cdFaqCode = "import { getStrapiMedia } from '@/lib/strapi';\n" + cdFaqCode;
}
fs.writeFileSync(cdFaqPath, cdFaqCode, 'utf8');
console.log('✓ CaseDetailFaq.jsx updated');

// 11. app/case-study/[slug]/page.jsx
const csSlugPath = path.join(__dirname, '../app/case-study/[slug]/page.jsx');
let csSlugCode = fs.readFileSync(csSlugPath, 'utf8');
csSlugCode = csSlugCode
  .replace(
    "imageUrl = getStrapiMedia(\n    caseStudy.seo?.shareImage || caseStudy.heroImage,\n    '/asstes/images/case-study-banking.jpg'\n  );",
    "imageUrl = getStrapiMedia(\n    caseStudy.seo?.shareImage || caseStudy.heroImage,\n    getStrapiMedia('/uploads/case-study-banking.jpg')\n  );"
  )
  .replace(
    "'/asstes/images/case-study-banking.jpg'",
    "getStrapiMedia('/uploads/case-study-banking.jpg')"
  );
fs.writeFileSync(csSlugPath, csSlugCode, 'utf8');
console.log('✓ app/case-study/[slug]/page.jsx updated');

console.log('All Case Study sections cleaned successfully.');
