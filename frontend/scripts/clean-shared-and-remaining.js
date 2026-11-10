const fs = require('fs');
const path = require('path');

console.log('Cleaning Shared & Remaining sections...');

// 1. AboutOverview.jsx
const aboutOverPath = path.join(__dirname, '../app/about/sections/AboutOverview.jsx');
const aboutOverCode = `import React from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';

function getPillarIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('iso') || t.includes('integrity') || t.includes('security')) return getStrapiMedia('/uploads/Research-icon-img.png');
  if (t.includes('global') || t.includes('footprint') || t.includes('countries')) return getStrapiMedia('/uploads/countries-icon-img.png');
  if (t.includes('speed') || t.includes('execution') || t.includes('rigor')) return getStrapiMedia('/uploads/every-stage-icon-img.png');
  return getStrapiMedia('/uploads/experience-icon-img.png');
}

export default function AboutOverview({ dynamicMetrics = null, dynamicValues = null, dynamicOverview = null }) {
  const introKicker = dynamicOverview?.kicker;
  const introHeading = dynamicOverview?.heading || dynamicOverview?.title;
  const introLead = dynamicOverview?.description;
  const introImage = dynamicOverview?.image ? getStrapiMedia(dynamicOverview.image) : getStrapiMedia('/uploads/company-about-img.png');

  const stats = (dynamicMetrics?.metrics || []).map((m) => ({
    count: m.number || '',
    label: m.label || '',
  }));

  const pillarsHeading = dynamicValues?.heading || dynamicValues?.title;
  const pillarsKicker = dynamicValues?.kicker;

  const pillars = (dynamicValues?.values || []).map((v) => ({
    icon: v.icon ? getStrapiMedia(v.icon) : getPillarIcon(v.title),
    title: v.title || '',
    desc: v.description || '',
  }));

  return (
    <div className="about-overview-container">
      {/* Intro Narrative Section */}
      {(introHeading || introLead) && (
        <section className="about-narrative-section">
          <div className="srcn-container">
            <div className="narrative-grid">
              <div className="narrative-col text-col">
                {introKicker && <span className="narrative-kicker career-values-kicker">{introKicker}</span>}
                {introHeading && <h2 className="section-main-heading">{introHeading}</h2>}
                {introLead && <p className="narrative-lead section-sub-text">{introLead}</p>}
                <div className="narrative-actions">
                  <Link href="/services" className="narrative-cta-btn btn-border-sm">
                    <span>OUR METHODOLOGIES</span>
                    <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </Link>
                  <Link href="/contact" className="narrative-secondary-btn btn-sm">
                    <span>DISCUSS A PROJECT</span>
                    <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>

              {introImage && (
                <div className="narrative-col visual-col">
                  <div className="narrative-image-card">
                    <img
                      src={introImage}
                      alt={introHeading || 'About Unimrkt Research'}
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Global Impact Stats Grid */}
      {stats.length > 0 && (
        <section className="about-stats-strip">
          <div className="srcn-container">
            <div className="about-stats-grid">
              {stats.map((s, i) => (
                <div key={i} className="about-stat-item">
                  <span className="about-stat-number">{s.count}</span>
                  <span className="about-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Core Operational Pillars */}
      {pillars.length > 0 && (
        <section className="about-pillars-section">
          <div className="srcn-container">
            {(pillarsKicker || pillarsHeading) && (
              <div className="section-header-area">
                {pillarsKicker && <span className="career-values-kicker">{pillarsKicker}</span>}
                {pillarsHeading && <h2 className="section-main-heading">{pillarsHeading}</h2>}
              </div>
            )}
            <div className="about-pillars-grid">
              {pillars.map((p, i) => (
                <article key={i} className="about-pillar-card">
                  {p.icon && (
                    <div className="pillar-icon-box">
                      <img src={p.icon} alt={p.title} loading="lazy" />
                    </div>
                  )}
                  {p.title && <h3>{p.title}</h3>}
                  {p.desc && <p>{p.desc}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
`;
fs.writeFileSync(aboutOverPath, aboutOverCode, 'utf8');
console.log('✓ AboutOverview.jsx updated');

// 2. ServicesIndustriesExpertise.jsx
const servIndPath = path.join(__dirname, '../components/ServicesIndustriesExpertise.jsx');
let servIndCode = fs.readFileSync(servIndPath, 'utf8');
servIndCode = servIndCode
  .replace("return '/asstes/images/banking-finance-img.png';", "return getStrapiMedia('/uploads/banking-finance-img.png');")
  .replace("return '/asstes/images/Healthcare-img.png';", "return getStrapiMedia('/uploads/Healthcare-img.png');")
  .replace("return '/asstes/images/consumer-retail-img.png';", "return getStrapiMedia('/uploads/consumer-retail-img.png');")
  .replace("return '/asstes/images/case-study-automotive.jpg';", "return getStrapiMedia('/uploads/case-study-automotive.jpg');")
  .replace("return '/asstes/images/case-study-telecom.jpg';", "return getStrapiMedia('/uploads/case-study-telecom.jpg');")
  .replace("return '/asstes/images/case-study-energy.jpg';", "return getStrapiMedia('/uploads/case-study-energy.jpg');")
  .replace("return '/asstes/images/banking-finance-img.png';", "return getStrapiMedia('/uploads/banking-finance-img.png');")
  .replace("const displayKicker = dynamicSection?.kicker || 'INDUSTRIES WE SERVE';", "const displayKicker = dynamicSection?.kicker;")
  .replace("const displayHeading = dynamicSection?.heading || dynamicSection?.title || 'Research Expertise Across Diverse Industries';", "const displayHeading = dynamicSection?.heading || dynamicSection?.title;")
  .replace("const displayDesc = dynamicSection?.description || 'From financial services and healthcare to technology, retail and industrial markets, our research capabilities help organizations understand their customers, markets and business opportunities. We work across diverse sectors, tailoring research approaches to each industry\\'s unique challenges, audiences and decision-making needs. By combining the right methodologies, market expertise and quality-focused execution, we help businesses uncover meaningful insights and make more informed strategic decisions.';", "const displayDesc = dynamicSection?.description;");
fs.writeFileSync(servIndPath, servIndCode, 'utf8');
console.log('✓ ServicesIndustriesExpertise.jsx updated');

// 3. CommonBlogSection.jsx
const comBlogPath = path.join(__dirname, '../components/CommonBlogSection.jsx');
let comBlogCode = fs.readFileSync(comBlogPath, 'utf8');
comBlogCode = comBlogCode
  .replace(
    "img: getStrapiMedia(b.featuredImage, '/asstes/images/market-trends-card-img1.png'),",
    "img: getStrapiMedia(b.featuredImage, getStrapiMedia('/uploads/market-trends-card-img1.png')),"
  )
  .replace("const displayKicker = dynamicSection?.kicker || 'LATEST BLOGS';", "const displayKicker = dynamicSection?.kicker;")
  .replace("const displayTitle = dynamicSection?.heading || dynamicSection?.title || 'Exploring Market Trends';", "const displayTitle = dynamicSection?.heading || dynamicSection?.title;")
  .replace("const displayDesc = dynamicSection?.description || 'Discover Emerging Market Trends That Shape Smarter Business Decisions.';", "const displayDesc = dynamicSection?.description;");
fs.writeFileSync(comBlogPath, comBlogCode, 'utf8');
console.log('✓ CommonBlogSection.jsx updated');

// 4. CommonTrustedPartnersTestimonials.jsx
const comTestPath = path.join(__dirname, '../components/CommonTrustedPartnersTestimonials.jsx');
let comTestCode = fs.readFileSync(comTestPath, 'utf8');
comTestCode = comTestCode
  .replace("const displayKicker = kicker || dynamicSection?.kicker || 'CLIENT SUCCESS STORIES';", "const displayKicker = kicker || dynamicSection?.kicker;")
  .replace("const displayHeading = heading || dynamicSection?.heading || dynamicSection?.title || 'Trusted Research Partner For Businesses Worldwide';", "const displayHeading = heading || dynamicSection?.heading || dynamicSection?.title;");
fs.writeFileSync(comTestPath, comTestCode, 'utf8');
console.log('✓ CommonTrustedPartnersTestimonials.jsx updated');

// 5. DynamicSectionRenderer.jsx
const dynSecPath = path.join(__dirname, '../components/DynamicSectionRenderer.jsx');
let dynSecCode = fs.readFileSync(dynSecPath, 'utf8');
dynSecCode = dynSecCode
  .replace("{section.title || section.heading || 'Core Pillars'}", "{section.title || section.heading}")
  .replace("{section.title || section.heading || 'Frequently Asked Questions'}", "{section.title || section.heading}")
  .replace("section.kicker || 'GET STARTED'", "section.kicker")
  .replace("section.buttonText || 'CONNECT WITH US'", "section.buttonText || 'Contact Us'");
fs.writeFileSync(dynSecPath, dynSecCode, 'utf8');
console.log('✓ DynamicSectionRenderer.jsx updated');

// 6. ContactForm.jsx & ContactFormSection.jsx
const formFiles = [
  path.join(__dirname, '../app/contact/sections/ContactForm.jsx'),
  path.join(__dirname, '../app/primary-research/sections/ContactFormSection.jsx'),
];
formFiles.forEach((file) => {
  let code = fs.readFileSync(file, 'utf8');
  code = code
    .replace("const namePlaceholder = dynamicForm?.namePlaceholder || 'Name';", "const namePlaceholder = dynamicForm?.namePlaceholder || dynamicForm?.name_placeholder || '';")
    .replace("const emailPlaceholder = dynamicForm?.emailPlaceholder || 'Email';", "const emailPlaceholder = dynamicForm?.emailPlaceholder || dynamicForm?.email_placeholder || '';")
    .replace("const phonePlaceholder = dynamicForm?.phonePlaceholder || 'Phone number';", "const phonePlaceholder = dynamicForm?.phonePlaceholder || dynamicForm?.phone_placeholder || '';")
    .replace("const companyPlaceholder = dynamicForm?.companyPlaceholder || 'Company';", "const companyPlaceholder = dynamicForm?.companyPlaceholder || dynamicForm?.company_placeholder || '';")
    .replace("const companyPlaceholder = dynamicForm?.companyPlaceholder || 'Company / Research Requirements';", "const companyPlaceholder = dynamicForm?.companyPlaceholder || dynamicForm?.company_placeholder || '';")
    .replace("const successMessage = dynamicForm?.successMessage || 'Thank you! Your inquiry has been received.';", "const successMessage = dynamicForm?.successMessage || dynamicForm?.success_message || '';")
    .replace("const successMessage = dynamicForm?.successMessage || 'Thank You! Your inquiry has been received. Our research team will reach out to you shortly.';", "const successMessage = dynamicForm?.successMessage || dynamicForm?.success_message || '';")
    .replace("const errorMessageText = dynamicForm?.errorMessage || 'An error occurred while submitting. Please try again.';", "const errorMessageText = dynamicForm?.errorMessage || dynamicForm?.error_message || '';");
  fs.writeFileSync(file, code, 'utf8');
  console.log(`✓ ${path.basename(file)} updated`);
});

// 7. OfficePresence.jsx
const offPresPath = path.join(__dirname, '../app/contact/sections/OfficePresence.jsx');
let offPresCode = fs.readFileSync(offPresPath, 'utf8');
offPresCode = offPresCode
  .replace("'/asstes/images/contact-map-banner-img.png'", "getStrapiMedia('/uploads/contact-map-banner-img.png')")
  .replace("'/asstes/images/contact-banner-usa.jpg'", "getStrapiMedia('/uploads/contact-banner-usa.jpg')")
  .replace("'/asstes/images/contact-banner-uk.jpg'", "getStrapiMedia('/uploads/contact-banner-uk.jpg')");
if (!offPresCode.includes("import { getStrapiMedia }")) {
  offPresCode = offPresCode.replace("'use client';", "'use client';\n\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(offPresPath, offPresCode, 'utf8');
console.log('✓ OfficePresence.jsx updated');

// 8. ResearchImpact.jsx & ResearchValue.jsx (contact)
const contImpPath = path.join(__dirname, '../app/contact/sections/ResearchImpact.jsx');
let contImpCode = fs.readFileSync(contImpPath, 'utf8');
contImpCode = contImpCode
  .replace("return '/asstes/images/icon/countries-icon-img.png';", "return getStrapiMedia('/uploads/countries-icon-img.png');")
  .replace("return '/asstes/images/icon/every-stage-icon-img.png';", "return getStrapiMedia('/uploads/every-stage-icon-img.png');")
  .replace("return '/asstes/images/icon/phone-icon-img.png';", "return getStrapiMedia('/uploads/phone-icon-img.png');")
  .replace("return '/asstes/images/icon/experience-icon-img.png';", "return getStrapiMedia('/uploads/experience-icon-img.png');")
  .replace("{dynamicMetrics?.title || 'Research at a Global Scale'}", "{dynamicMetrics?.title || dynamicMetrics?.heading}");
if (!contImpCode.includes("import { getStrapiMedia }")) {
  contImpCode = "import { getStrapiMedia } from '@/lib/strapi';\n" + contImpCode;
}
fs.writeFileSync(contImpPath, contImpCode, 'utf8');
console.log('✓ ResearchImpact.jsx (contact) updated');

const contValPath = path.join(__dirname, '../app/contact/sections/ResearchValue.jsx');
let contValCode = fs.readFileSync(contValPath, 'utf8');
contValCode = contValCode
  .replace("icon: '/asstes/images/icon/Research-icon-img.png',", "icon: getStrapiMedia('/uploads/Research-icon-img.png'),")
  .replace("{dynamicValues?.kicker || 'Why work with Unimrkt'}", "{dynamicValues?.kicker}")
  .replace("{dynamicValues?.title || 'More Than Research. A Partner For Better Decisions.'}", "{dynamicValues?.title || dynamicValues?.heading}")
  .replace("dynamicValues?.subtitle ||\n                'From defining the research question to delivering actionable insights, our team helps businesses build confidence through accurate data, sharper strategy, and measurable outcomes.'", "dynamicValues?.subtitle || dynamicValues?.description");
if (!contValCode.includes("import { getStrapiMedia }")) {
  contValCode = "import { getStrapiMedia } from '@/lib/strapi';\n" + contValCode;
}
fs.writeFileSync(contValPath, contValCode, 'utf8');
console.log('✓ ResearchValue.jsx (contact) updated');

// 9. CompnayIndustriesUnderstand.jsx & OurcompanyResearchImpact.jsx
const compIndPath = path.join(__dirname, '../app/our-company/sections/CompnayIndustriesUnderstand.jsx');
let compIndCode = fs.readFileSync(compIndPath, 'utf8');
compIndCode = compIndCode
  .replace("const displayKicker = dynamicSection?.kicker || kicker || 'INDUSTRIES WE UNDERSTAND';", "const displayKicker = dynamicSection?.kicker || kicker;")
  .replace("const displayTitle = dynamicSection?.heading || dynamicSection?.title || title || 'Deep Knowledge Across Diverse Industries';", "const displayTitle = dynamicSection?.heading || dynamicSection?.title || title;")
  .replace("const displayDesc =\n    dynamicSection?.description ||\n    description ||\n    'Industry-specific expertise that helps us understand complex markets and deliver insights that drive informed business decisions.';", "const displayDesc = dynamicSection?.description || description;")
  .replace("'/asstes/images/automotive-card-img.png'", "getStrapiMedia('/uploads/automotive-card-img.png')");
if (!compIndCode.includes("import { getStrapiMedia }")) {
  compIndCode = compIndCode.replace("import React from 'react';", "import React from 'react';\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(compIndPath, compIndCode, 'utf8');
console.log('✓ CompnayIndustriesUnderstand.jsx updated');

const compImpPath = path.join(__dirname, '../app/our-company/sections/OurcompanyResearchImpact.jsx');
let compImpCode = fs.readFileSync(compImpPath, 'utf8');
compImpCode = compImpCode
  .replace("'/asstes/images/icon/countries-icon-img.png',", "getStrapiMedia('/uploads/countries-icon-img.png'),")
  .replace("'/asstes/images/icon/every-stage-icon-img.png',", "getStrapiMedia('/uploads/every-stage-icon-img.png'),")
  .replace("'/asstes/images/icon/phone-icon-img.png',", "getStrapiMedia('/uploads/phone-icon-img.png'),")
  .replace("'/asstes/images/icon/experience-icon-img.png',", "getStrapiMedia('/uploads/experience-icon-img.png'),")
  .replace("{heading || 'Research Without Borders'}", "{heading}");
if (!compImpCode.includes("import { getStrapiMedia }")) {
  compImpCode = "import { getStrapiMedia } from '@/lib/strapi';\n" + compImpCode;
}
fs.writeFileSync(compImpPath, compImpCode, 'utf8');
console.log('✓ OurcompanyResearchImpact.jsx updated');

// 10. TeamDirectory.jsx
const teamDirPath = path.join(__dirname, '../app/team/sections/TeamDirectory.jsx');
let teamDirCode = fs.readFileSync(teamDirPath, 'utf8');
teamDirCode = teamDirCode
  .replace("`/asstes/images/team/${slug}.png`", "getStrapiMedia(`/uploads/team-${slug}.png`)")
  .replace("const displayHeading = dynamicSection?.heading || dynamicSection?.title || 'People. Expertise. Impact.';", "const displayHeading = dynamicSection?.heading || dynamicSection?.title;");
fs.writeFileSync(teamDirPath, teamDirCode, 'utf8');
console.log('✓ TeamDirectory.jsx updated');

// 11. GalleryGrid.jsx
const gallGridPath = path.join(__dirname, '../app/gallery/sections/GalleryGrid.jsx');
let gallGridCode = fs.readFileSync(gallGridPath, 'utf8');
gallGridCode = gallGridCode
  .replace("`/asstes/images/gallery/gallery_item_0${(idx % 9) + 1}.webp`", "getStrapiMedia(`/uploads/gallery_item_0${(idx % 9) + 1}.webp`)")
  .replace("const displayHeading = dynamicSection?.heading || dynamicSection?.title || 'Our Gallery';", "const displayHeading = dynamicSection?.heading || dynamicSection?.title;");
fs.writeFileSync(gallGridPath, gallGridCode, 'utf8');
console.log('✓ GalleryGrid.jsx updated');

// 12. BlogGrid.jsx & BlogFaq.jsx
const blogGridPath = path.join(__dirname, '../app/blog/sections/BlogGrid.jsx');
let blogGridCode = fs.readFileSync(blogGridPath, 'utf8');
blogGridCode = blogGridCode
  .replace("'/asstes/images/customer-experience-img.png'", "getStrapiMedia('/uploads/customer-experience-img.png')")
  .replace("const displayHeading = dynamicSection?.heading || dynamicSection?.title || 'Insights & Stories';", "const displayHeading = dynamicSection?.heading || dynamicSection?.title;")
  .replace("const displayDesc = dynamicSection?.description || 'Explore in-depth articles, industry breakdowns, and forward-looking research perspectives.';", "const displayDesc = dynamicSection?.description;");
fs.writeFileSync(blogGridPath, blogGridCode, 'utf8');
console.log('✓ BlogGrid.jsx updated');

const blogFaqPath = path.join(__dirname, '../app/blog/sections/BlogFaq.jsx');
let blogFaqCode = fs.readFileSync(blogFaqPath, 'utf8');
blogFaqCode = blogFaqCode
  .replace('<img src="/asstes/images/unimrkt-resarch-map-banner-img.png" alt="fqa banner" />', '<img src={getStrapiMedia("/uploads/unimrkt-resarch-map-banner-img.png")} alt="fqa banner" />')
  .replace("{dynamicFaq?.title || 'Frequently Asked Questions'}", "{dynamicFaq?.title || dynamicFaq?.heading}");
if (!blogFaqCode.includes("import { getStrapiMedia }")) {
  blogFaqCode = blogFaqCode.replace("'use client';", "'use client';\n\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(blogFaqPath, blogFaqCode, 'utf8');
console.log('✓ BlogFaq.jsx updated');

// 13. BlogDetailContent.jsx & app/blog/[slug]/page.jsx
const blogDetPath = path.join(__dirname, '../app/blog-details/sections/BlogDetailContent.jsx');
let blogDetCode = fs.readFileSync(blogDetPath, 'utf8');
blogDetCode = blogDetCode
  .replace("const title = dynamicHero?.title || 'Key Trends Shaping the Future of the Automotive Industry';", "const title = dynamicHero?.title || '';")
  .replace("const kicker = dynamicHero?.kicker || 'Market Research';", "const kicker = dynamicHero?.kicker || '';")
  .replace("const deck =\n    dynamicHero?.description ||\n    'From electrification and software-defined vehicles to new mobility expectations, the automotive landscape is changing at unprecedented speed.';", "const deck = dynamicHero?.description || '';")
  .replace('<img\n                src="/asstes/images/market-trends-card-img1.png"\n                alt="Market research professionals reviewing industry data and trends"\n              />', '<img src={getStrapiMedia("/uploads/market-trends-card-img1.png")} alt={title || "Blog detail"} />');
if (!blogDetCode.includes("import { getStrapiMedia }")) {
  blogDetCode = blogDetCode.replace("'use client';", "'use client';\n\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(blogDetPath, blogDetCode, 'utf8');
console.log('✓ BlogDetailContent.jsx updated');

const blogSlugPath = path.join(__dirname, '../app/blog/[slug]/page.jsx');
let blogSlugCode = fs.readFileSync(blogSlugPath, 'utf8');
blogSlugCode = blogSlugCode
  .replace("'/asstes/images/blog-banner-img.png'", "getStrapiMedia('/uploads/blog-banner-img.png')")
  .replace("'/asstes/images/market-trends-card-img1.png'", "getStrapiMedia('/uploads/market-trends-card-img1.png')");
fs.writeFileSync(blogSlugPath, blogSlugCode, 'utf8');
console.log('✓ app/blog/[slug]/page.jsx updated');

// 14. EndToEndSolutions.jsx, ResearchReachSection.jsx, CaseStudiesImpactCta.jsx
const endPath = path.join(__dirname, '../app/services/sections/EndToEndSolutions.jsx');
let endCode = fs.readFileSync(endPath, 'utf8');
endCode = endCode
  .replace("`/asstes/images/unimrkt-resarch-our-services-img${imgNum}${imgNum === 3 ? '.png.png' : '.png'}`", "getStrapiMedia(`/uploads/unimrkt-resarch-our-services-img${imgNum}${imgNum === 3 ? '.png.png' : '.png'}`)")
  .replace("`/asstes/images/icon/${iconName}`", "getStrapiMedia(`/uploads/${iconName}`)")
  .replace('<img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right" />', '<img src={getStrapiMedia("/uploads/arrow-right-icon-img.png")} alt="Arrow Right" />')
  .replace("const displayKicker = dynamicSection?.kicker || 'OUR SERVICES';", "const displayKicker = dynamicSection?.kicker;")
  .replace("const displayTitle = dynamicSection?.heading || dynamicSection?.title || 'End-To-End Market Research Solutions';", "const displayTitle = dynamicSection?.heading || dynamicSection?.title;")
  .replace("const displayDesc = dynamicSection?.description || 'From research design and respondent recruitment to data collection, analysis, and reporting, Unimrkt Research provides comprehensive market research solutions tailored to your business objectives. Our expert team delivers accurate, actionable insights that help organizations make informed decisions, uncover opportunities, and drive sustainable growth.';", "const displayDesc = dynamicSection?.description;");
fs.writeFileSync(endPath, endCode, 'utf8');
console.log('✓ EndToEndSolutions.jsx updated');

const reachPath = path.join(__dirname, '../app/services/sections/ResearchReachSection.jsx');
let reachCode = fs.readFileSync(reachPath, 'utf8');
reachCode = reachCode
  .replace("return '/asstes/images/icon/global-regional-markets-icon-img.png';", "return getStrapiMedia('/uploads/global-regional-markets-icon-img.png');")
  .replace("return '/asstes/images/icon/diverse-audiences-icon-img.png';", "return getStrapiMedia('/uploads/diverse-audiences-icon-img.png');")
  .replace("return '/asstes/images/icon/multiple-industries-icon-img.png';", "return getStrapiMedia('/uploads/multiple-industries-icon-img.png');")
  .replace("return '/asstes/images/icon/multiple-research-methods-icon.png';", "return getStrapiMedia('/uploads/multiple-research-methods-icon.png');")
  .replace("kicker = 'Our Coverage',", "kicker = null,")
  .replace("title = 'Research Reach That Goes Beyond Markets',", "title = null,")
  .replace("description = 'Our research capabilities span markets, industries, audiences and geographies, helping businesses build a deeper understanding of the people, trends and opportunities that matter most.',", "description = null,");
if (!reachCode.includes("import { getStrapiMedia }")) {
  reachCode = reachCode.replace("import React from 'react';", "import React from 'react';\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(reachPath, reachCode, 'utf8');
console.log('✓ ResearchReachSection.jsx updated');

const caseImpPath = path.join(__dirname, '../app/services/sections/CaseStudiesImpactCta.jsx');
let caseImpCode = fs.readFileSync(caseImpPath, 'utf8');
caseImpCode = caseImpCode
  .replace("src=\"/asstes/images/case-study-man-img.png\"", "src={getStrapiMedia('/uploads/case-study-man-img.png')}");
if (!caseImpCode.includes("import { getStrapiMedia }")) {
  caseImpCode = caseImpCode.replace("'use client';", "'use client';\n\nimport { getStrapiMedia } from '@/lib/strapi';");
}
fs.writeFileSync(caseImpPath, caseImpCode, 'utf8');
console.log('✓ CaseStudiesImpactCta.jsx updated');

console.log('All shared and remaining components cleaned successfully.');
