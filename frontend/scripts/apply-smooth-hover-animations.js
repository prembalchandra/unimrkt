const fs = require('fs');
const path = require('path');

const smoothHoverCss = `

/* ==========================================================================
   GLOBAL ULTRA-SMOOTH HOVER & INTERACTION ANIMATIONS (APPLE / STRIPE GRADE)
   Ensures fluid, buttery-smooth cubic-bezier transitions on hover, focus,
   and mouse-leave for all cards, buttons, icons, links, images, and controls.
   ========================================================================== */

/* 1. Global Hardware-Accelerated Smooth Variables */
:root {
  --smooth-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --smooth-easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --smooth-duration-fast: 0.24s;
  --smooth-duration-normal: 0.36s;
  --smooth-duration-slow: 0.55s;
  --smooth-shadow-lift: 0 16px 36px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(139, 30, 45, 0.08);
  --smooth-shadow-glow: 0 10px 28px rgba(190, 44, 40, 0.32);
}

/* 2. All Buttons & Interactive Action Elements */
.btn-border-sm,
.btn-sm,
.btn-white,
.btn-burgundy,
.btn-talk-experts,
.btn-discover-unimrkt,
.case-impact-btn,
.auto-success-btn,
.question-cta-btn,
.end-to-end-btn,
.stat-explore-cta,
.our-gallery-loadmore-btn,
.faq-reset-btn,
.industries-view-all-btn,
.filter-all-btn,
.gallery-load-more-btn,
.card-action-btn,
.header-btn,
.career-job-apply,
.career-job-search-submit,
.career-jobs-load-more,
.team-page-button,
.blog-share-button,
.market-trends-browse-btn,
.career-job-details-toggle,
.blog-enquiry-form button,
.blog-sidebar-cta > a {
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.32s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.3s ease,
              background 0.3s ease,
              border-color 0.3s ease,
              color 0.25s ease,
              opacity 0.25s ease !important;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  will-change: transform, box-shadow;
}

/* Active Pressed Effect for All Buttons */
.btn-border-sm:active,
.btn-sm:active,
.btn-white:active,
.btn-burgundy:active,
.btn-talk-experts:active,
.case-impact-btn:active,
.auto-success-btn:active,
.question-cta-btn:active,
.career-job-apply:active {
  transform: translateY(0px) scale(0.97) !important;
  transition-duration: 0.1s !important;
}

/* 3. Button Internal Icons & Arrows (Smooth gliding / rotation) */
.btn-border-sm img,
.btn-border-sm i,
.btn-border-sm svg,
.btn-white img,
.btn-white i,
.btn-white svg,
.btn-sm img,
.btn-sm i,
.btn-sm svg,
.btn-talk-experts i,
.btn-talk-experts img,
.case-impact-btn i,
.case-impact-btn img,
.auto-success-btn i,
.auto-success-btn img,
.stat-explore-cta i,
.stat-explore-cta img,
.card-action-btn i,
.card-action-btn img,
.btn-arrow,
.arrow-btn,
.case-btn-icon,
.industries-card-explore-btn i,
.gallery-load-more-btn img,
.gallery-load-more-btn i {
  display: inline-block;
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s ease !important;
  will-change: transform;
}

/* 4. All Interactive Cards & Grid Tiles (Smooth Lift & Depth) */
.approach-card,
.auto-challenge-card,
.auto-ecosystem-card,
.auto-intel-card,
.auto-method-card,
.auto-segment-card,
.auto-success-card,
.blog-col-box,
.case-study-card,
.case-card,
.career-value-card,
.career-job-card,
.career-benefit-item,
.global-reach-card,
.impact-card,
.industries-grid-card,
.industry-card,
.industry-expertise-card,
.market-trends-card,
.measure-card,
.telephonic-measure-card,
.narrative-image-card,
.office-hub-card,
.office-card,
.our-gallery-card,
.gallery-card,
.our-unimrkt-research-card,
.outcome-card,
.partner-industry-card,
.partner-card,
.primary-service-card,
.quality-first-card,
.research-impact-card,
.research-methodologies-card,
.research-reach-card,
.research-value-card,
.solution-featured-red-card,
.solution-interactive-card,
.team-profile-card,
.telephonic-process-card,
.testimonial-showcase-card,
.trusted-client-item,
.why-choose-card,
.why-telephonic-card,
.about-pillar-card,
.contact-process-card,
.cs-question-card,
.service-stack-item,
.swiper-slide.industry-card {
  transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.38s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.32s ease,
              background-color 0.32s ease,
              background 0.32s ease !important;
  backface-visibility: hidden;
  transform: translateZ(0);
  will-change: transform, box-shadow;
}

/* 5. Smooth Cinematic Image Zoom inside Cards */
.gallery-card img,
.our-gallery-card img,
.case-card img,
.case-study-card img,
.blog-col-box img,
.measure-card img,
.telephonic-measure-card img,
.auto-intel-card img,
.auto-method-card img,
.auto-success-card img,
.industry-card img,
.office-hub-card img,
.partner-industry-card img,
.primary-service-card img,
.team-profile-card img,
.narrative-image-card img,
.market-trends-card img,
.approach-card img,
.cati-cutout-img {
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.4s ease,
              opacity 0.4s ease !important;
  backface-visibility: hidden;
  will-change: transform;
}

/* 6. Navigation, Dropdowns & Header Links */
.header-link-area {
  position: relative;
  transition: color 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.header-link-area::after {
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.3s ease !important;
  will-change: width;
}

.header-sub-menu-area-wrapper {
  transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1),
              visibility 0.28s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
  will-change: transform, opacity;
}

.header-submenu-time-area,
.header-submenu-time-area a,
.about-dropdown-link,
.about-dropdown-item {
  transition: background-color 0.25s ease,
              color 0.25s ease,
              padding-left 0.28s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.25s ease !important;
}

.mobile-nav-link {
  transition: color 0.25s ease, padding-left 0.25s ease !important;
}

/* 7. Footer Links & Social Media Icons */
.footer-time-area a,
.footer-menu-link,
.footer-bottom-links a {
  display: inline-block;
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
              color 0.25s ease !important;
  will-change: transform;
}

.footer-social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.3s ease,
              border-color 0.3s ease,
              color 0.25s ease,
              box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
  will-change: transform, box-shadow;
}

/* 8. Accordions & FAQ Items */
.faq-accordion-item {
  transition: border-color 0.3s ease,
              box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.3s ease,
              transform 0.32s cubic-bezier(0.16, 1, 0.3, 1) !important;
  will-change: transform, box-shadow;
}

.faq-icon-indicator,
.faq-accordion-header i,
.faq-accordion-item .fa-chevron-down,
.faq-accordion-item .fa-plus {
  display: inline-block;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              color 0.25s ease !important;
  will-change: transform;
}

/* 9. Sliders, Carousel Buttons & Lightbox Navigation */
.slider-btn,
.lightbox-nav-btn,
.lightbox-close,
.industries-nav-btn,
.auto-methods-nav-btn,
.market-trends-nav-btn,
.prev-btn,
.next-btn,
.gallery-lightbox-close,
.gallery-lightbox-nav,
.our-gallery-lightbox-close {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              background 0.3s ease,
              background-color 0.3s ease,
              color 0.25s ease,
              box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.3s ease !important;
  will-change: transform, box-shadow;
}

/* 10. Filter Tabs, Badges & Pagination Controls */
.blog-filter-btn,
.gallery-filter-btn,
.filter-all-btn,
.our-gallery-tab-btn,
.pagination-item,
.page-btn,
.filter-dropdown-btn,
.cs-dropdown-item,
.badge-tag,
.team-modal-close-btn,
.career-modal-close,
.team-modal-close {
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.28s ease,
              background 0.28s ease,
              border-color 0.28s ease,
              color 0.25s ease,
              box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
  will-change: transform;
}

/* 11. Form Inputs & Textareas */
input[type="text"],
input[type="email"],
input[type="tel"],
textarea,
select {
  transition: border-color 0.28s ease,
              box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.28s ease !important;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
textarea:focus,
select:focus {
  transition: border-color 0.28s ease,
              box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* 12. Interactive Special Elements */
.cs-diagram-circle,
.case-floating-chart-badge,
.marketplaces-email-pill,
.stat-interactive-row,
.solution-featured-red-card {
  transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.38s cubic-bezier(0.16, 1, 0.3, 1),
              background 0.32s ease,
              border-color 0.32s ease !important;
  will-change: transform, box-shadow;
}
`;

const styleCssPath = path.join(__dirname, '../public/asstes/css/style.css');
let styleCss = fs.readFileSync(styleCssPath, 'utf8');

// If already applied previously, remove old block first
if (styleCss.includes('GLOBAL ULTRA-SMOOTH HOVER & INTERACTION ANIMATIONS')) {
  styleCss = styleCss.split('/* ==========================================================================\n   GLOBAL ULTRA-SMOOTH HOVER & INTERACTION ANIMATIONS')[0].trim();
}

styleCss += '\n\n' + smoothHoverCss.trim() + '\n';
fs.writeFileSync(styleCssPath, styleCss, 'utf8');
console.log('Successfully appended ultra-smooth hover animations to style.css!');

// Also update global.css transition tokens to match ultra-smooth easing
const globalCssPath = path.join(__dirname, '../public/asstes/css/global.css');
let globalCss = fs.readFileSync(globalCssPath, 'utf8');
globalCss = globalCss.replace(
  /--transition:\s*[^;]+;/,
  '--transition: 0.35s cubic-bezier(0.16, 1, 0.3, 1);'
);
globalCss = globalCss.replace(
  /--transition-normal:\s*[^;]+;/,
  '--transition-normal: 0.35s cubic-bezier(0.16, 1, 0.3, 1);'
);
globalCss = globalCss.replace(
  /--transition-fast:\s*[^;]+;/,
  '--transition-fast: 0.22s cubic-bezier(0.16, 1, 0.3, 1);'
);
globalCss = globalCss.replace(
  /--transition-slow:\s*[^;]+;/,
  '--transition-slow: 0.55s cubic-bezier(0.16, 1, 0.3, 1);'
);
fs.writeFileSync(globalCssPath, globalCss, 'utf8');
console.log('Successfully updated transition tokens in global.css!');

// Update layout.js cache-busting version query string
const layoutPath = path.join(__dirname, '../app/layout.js');
let layout = fs.readFileSync(layoutPath, 'utf8');
layout = layout.replace('style.css?v=3.5', 'style.css?v=3.6');
layout = layout.replace('global.css?v=1.0', 'global.css?v=1.1');
fs.writeFileSync(layoutPath, layout, 'utf8');
console.log('Successfully bumped stylesheet cache-buster query params in layout.js!');
