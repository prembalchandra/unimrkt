const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'public', 'asstes', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

const addition = `

/* ==========================================================================
   25/10/2026 CODEBASE DESIGN RESTORATION & UNIMRKT DESIGN INTEGRATION
   ========================================================================== */

/* 1. Global & Hero Common Aliases & Badges */
.hero-common-content-area,
.hero-common-contnet-area {
    width: 100%;
}

.hero-badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
}

.badge-red-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #CC1F1F;
    display: inline-block;
    flex-shrink: 0;
}

.hero-main-heading {
    color: rgb(255, 255, 255);
    font-size: clamp(26px, 4vw, 3.3rem);
    margin-bottom: 20px;
    font-family: Montserrat, sans-serif;
    font-weight: 600;
    line-height: 120%;
    text-transform: capitalize;
}

.hero-sub-paragraph {
    color: rgba(255, 255, 255, 0.85);
    font-size: 16px;
    line-height: 1.65;
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    margin-bottom: 16px !important;
}

.brain-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
}

.section-kicker,
.section-kicker-red {
    display: inline-block;
    color: #CC1F1F;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 12px;
    font-family: Montserrat, sans-serif;
}

/* 2. Editorial & Impact Sections */
.insights-editorial-heading {
    font-size: clamp(24px, 3.8vw, 2.75rem);
    color: var(--color-heading, #04264E);
    margin-bottom: 24px;
    font-family: Montserrat, sans-serif;
    font-weight: 600;
    line-height: 125%;
    text-align: center;
}

.impact-wrapper {
    display: grid;
    gap: 20px;
    width: 100%;
    align-items: stretch;
}

@media (max-width: 900px) {
    .impact-wrapper {
        grid-template-columns: repeat(2, 1fr) !important;
    }
}

@media (max-width: 500px) {
    .impact-wrapper {
        grid-template-columns: 1fr !important;
    }
}

.impact-counter {
    color: #CC1F1F;
    font-size: clamp(2rem, 3.2vw, 2.8rem);
    font-weight: 700;
    margin: 0 0 8px 0;
    font-family: Montserrat, sans-serif;
    text-align: center;
}

.impact-label {
    color: #04264E;
    font-size: 15px;
    font-weight: 500;
    margin: 0;
    text-align: center;
    font-family: Montserrat, sans-serif;
}

.research-impact-col {
    min-width: 0;
    width: 100%;
}

.research-impact-content-area,
.research-impact-contnet-area {
    width: 100%;
    text-align: center;
}

/* 3. Containers & Layout Wrappers */
.contact-process-container,
.telephonic-process-container,
.auto-ecosystem-container,
.auto-segments-container,
.question-cta-container,
.research-process-container,
.srcn-containers {
    width: 100%;
    max-width: 1330px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px;
}

.capabilities-wrapper,
.our-industries-wrapper-inner,
.our-industries-wapper-area,
.our-unimrkt-research-wrapper-inner,
.research-methodologies-wapper,
.blog-sction-wapper,
.carousel-wrapper {
    width: 100%;
}

.industries-sections {
    padding: 50px 0 70px;
    background: #ffffff;
    position: relative;
}

.industries-banner-wapper-banner {
    width: 100%;
    position: relative;
}

.stat-counter-num {
    display: inline-block;
}

.featured-card-content {
    position: relative;
    z-index: 2;
}

/* 4. Telephonic Surveys & Approach Section */
.why-telephonic-section {
    position: relative;
    overflow: hidden;
    padding: 60px 0;
    background: linear-gradient(90deg, #6C2A4A 0%, #BE2C28 100%);
    color: #ffffff;
}

.why-telephonic-container,
.approach-container {
    width: 100%;
    max-width: 1330px;
    margin: 0 auto;
    padding: 0 15px;
}

.why-telephonic-header {
    text-align: center;
    margin-bottom: 36px;
}

.why-telephonic-kicker,
.approach-eyebrow {
    display: inline-block;
    color: #ffffff;
    opacity: 0.9;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 12px;
    font-family: Montserrat, sans-serif;
}

.why-telephonic-title,
.approach-title {
    font-size: clamp(24px, 3.8vw, 2.75rem);
    color: #ffffff;
    margin-bottom: 16px;
    font-family: Montserrat, sans-serif;
    font-weight: 600;
    line-height: 125%;
    text-align: center;
}

.approach-description {
    color: rgba(255, 255, 255, 0.88);
    font-size: 16px;
    line-height: 1.65;
    max-width: 860px;
    margin: 0 auto 36px;
    text-align: center;
    font-family: Montserrat, sans-serif;
}

.why-telephonic-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
}

@media (max-width: 900px) {
    .why-telephonic-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 600px) {
    .why-telephonic-grid {
        grid-template-columns: 1fr;
    }
}

.why-telephonic-card {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 28px 24px;
    transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.why-telephonic-card:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.16);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}

.why-telephonic-card-area,
.approach-card-box-area {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    width: 100%;
}

.why-telephonic-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.why-telephonic-icon img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.why-telephonic-card-content h3 {
    color: #ffffff;
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0 0 8px 0;
    font-family: Montserrat, sans-serif;
}

.why-telephonic-card-content p {
    color: rgba(255, 255, 255, 0.85);
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
    font-family: Montserrat, sans-serif;
}

/* 5. Headers, Kickers & Descriptions */
.business-outcomes-header,
.industries-showcase-header,
.research-process-header,
.global-reach-header,
.section-center-header {
    text-align: center;
    max-width: 860px;
    margin: 0 auto 36px;
}

.business-outcomes-kicker,
.industries-showcase-kicker,
.research-process-kicker,
.career-values-kicker,
.career-benefits-kicker,
.career-openings-kicker,
.telephonic-overview-kicker,
.our-unimrkt-research-sub-title {
    display: inline-block;
    color: #CC1F1F;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 12px;
    font-family: Montserrat, sans-serif;
}

.business-outcomes-heading,
.industries-showcase-heading,
.research-process-heading,
.our-industries-heading {
    font-size: clamp(24px, 4.1vw, 3rem);
    color: var(--color-heading, #04264E);
    margin-bottom: 14px;
    font-family: Montserrat, sans-serif;
    font-weight: 600;
    line-height: 120%;
    text-align: center;
    text-transform: capitalize;
}

.business-outcomes-desc,
.industries-showcase-desc,
.research-process-desc,
.industries-expertise-desc,
.telephonic-process-sub-heading,
.section-sub-desc,
.question-cta-desc {
    font-size: 16px;
    color: var(--color-body, #4b5563);
    line-height: 1.65;
    max-width: 820px;
    margin: 0 auto;
    font-family: Montserrat, sans-serif;
}

.abou-Primary-overview p {
    font-size: 16px;
    color: var(--color-body, #4b5563);
    line-height: 1.65;
    margin-bottom: 16px;
    font-family: Montserrat, sans-serif;
}

/* 6. Action Buttons & Interactive Components */
.primary-service-card-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #CC1F1F;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-family: Montserrat, sans-serif;
}

.end-to-end-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: #CC1F1F;
    color: #ffffff !important;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 16px;
    transition: background 0.3s ease;
}

.end-to-end-btn:hover {
    background: #a81919;
    color: #ffffff !important;
}

.why-choose-icon {
    width: 48px;
    height: 48px;
    object-fit: contain;
}

.reach-card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
}

.testimonial-process-slider {
    overflow: hidden;
    padding-bottom: 26px;
}

.testimonial-process-card-box {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.case-impact-dots-overlay,
.case-impact-waves-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.15;
}

.case-stat-content {
    display: flex;
    flex-direction: column;
}

.team-modal-rule {
    width: 48px;
    height: 3px;
    background: #CC1F1F;
    margin: 14px 0 18px;
    border-radius: 2px;
}

.career-journey-content {
    flex: 1;
}

.career-details-modal {
    max-width: 720px;
}

.career-job-apply-trigger {
    cursor: pointer;
}

.career-resume-field {
    width: 100%;
}

.dropdown-label {
    font-size: 13px;
    font-weight: 600;
    color: #4b5563;
    margin-bottom: 6px;
    display: block;
}

/* 7. Empty States & Navigation */
.faq-header-left {
    display: flex;
    align-items: center;
    gap: 12px;
    text-align: left;
}

.faq-empty-state {
    text-align: center;
    padding: 60px 20px;
    background: #ffffff;
    border-radius: 12px;
    border: 1px dashed #d1d5db;
    margin: 20px 0;
}

.faq-empty-icon {
    font-size: 40px;
    color: #9ca3af;
    margin-bottom: 16px;
}

.faq-reset-btn {
    margin-top: 16px;
    padding: 10px 24px;
    background: #CC1F1F;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
}

.faq-reset-btn:hover {
    background: #a81919;
}

.our-gallery-empty {
    text-align: center;
    padding: 60px 20px;
    font-size: 16px;
    color: #6b7280;
    grid-column: 1 / -1;
}

.our-gallery-loadmore-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 28px;
    background: #04264E;
    color: #ffffff;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: background 0.25s ease;
}

.our-gallery-loadmore-btn:hover {
    background: #CC1F1F;
    color: #ffffff;
}
`;

fs.writeFileSync(cssPath, css + addition, 'utf8');
console.log('Successfully appended restored styles to style.css');
