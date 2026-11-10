const fs = require('fs');
const path = require('path');

// 1. Update style.css with dedicated Industries Design Styles
const styleCssPath = path.join(__dirname, '../public/asstes/css/style.css');
let styleCss = fs.readFileSync(styleCssPath, 'utf8');

const industriesCss = `

/* ==========================================================================
   INDUSTRIES PAGE - 100% DESIGN SYSTEM & SECTION STYLES
   Exact pixel-perfect match for http://localhost:1440/industries
   ========================================================================== */

/* 1. Section 2: Industries About ("Understanding Industries. Uncovering Opportunities.") */
.industries-about-section {
    position: relative;
    width: 100%;
    background-color: #f9f9f7;
    padding: clamp(60px, 7vw, 100px) 0;
}

.industries-about-grid {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: clamp(30px, 4vw, 65px);
    align-items: center;
}

.industries-about-content {
    max-width: 800px;
}

.industries-about-kicker {
    display: inline-block;
    color: #cc1f1f;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 12px;
    font-family: var(--font-body);
}

.industries-about-title {
    font-size: clamp(28px, 3.5vw, 48px);
    font-weight: 700;
    line-height: 1.18;
    letter-spacing: -1.5px;
    color: #02060e;
    margin-bottom: 20px;
    font-family: var(--font-heading);
}

.industries-about-text p {
    font-size: 15.5px;
    line-height: 1.82;
    color: #02060e;
    opacity: 0.82;
    margin-bottom: 18px;
    font-family: var(--font-body);
}

.industries-about-visual-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.industries-about-ring-outer {
    position: relative;
    width: clamp(280px, 32vw, 480px);
    height: clamp(280px, 32vw, 480px);
    border-radius: 50%;
    border: 1.5px solid rgba(204, 31, 31, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
}

.industries-about-ring-inner {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1.5px dashed rgba(204, 31, 31, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
}

.industries-about-photo-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.industries-about-photo-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
}

/* 2. Section 3: Industries Grid ("Deep Expertise Across Diverse Industries") */
.industries-grid-section {
    position: relative;
    width: 100%;
    background-color: #ffffff;
    padding: clamp(60px, 7vw, 95px) 0;
    overflow: hidden;
}

.industries-cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    margin-top: 40px;
}

.industries-grid-card {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 24px;
    padding: 18px 18px 28px;
    box-shadow: 0 6px 36px rgba(0, 0, 0, 0.05);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
    height: 100%;
}

.industries-grid-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 42px rgba(15, 23, 42, 0.1);
    border-color: rgba(204, 31, 31, 0.3);
}

.industries-card-img-wrap {
    width: 100%;
    height: 200px;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 20px;
    background: #f1f5f9;
}

.industries-card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

.industries-grid-card:hover .industries-card-img-wrap img {
    transform: scale(1.05);
}

.industries-card-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.industries-card-content h3 {
    font-size: 19px;
    font-weight: 700;
    color: #02060e;
    margin-bottom: 10px;
    line-height: 1.35;
    font-family: var(--font-heading);
}

.industries-card-content p {
    font-size: 14px;
    line-height: 1.65;
    color: #64748b;
    margin-bottom: 18px;
    flex-grow: 1;
}

.industries-pagination-area {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 40px;
}

.industries-pagination-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #cbd5e1;
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;
}

.industries-pagination-dot.active {
    width: 26px;
    border-radius: 12px;
    background: #cc1f1f;
}

/* 3. Section 4: Partner Industries ("One Research Partner. Multiple Industries.") */
.partner-industries-section {
    position: relative;
    width: 100%;
    background-color: #f9f9f7;
    padding: clamp(65px, 7vw, 100px) 0;
}

.partner-industries-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    margin-top: 45px;
}

.partner-card {
    background: #ffffff;
    border: 1px solid #e1e1df;
    border-radius: 24px;
    padding: 42px 34px 38px;
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.03);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease, background-color 0.35s ease;
    height: 100%;
}

.partner-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 36px rgba(15, 23, 42, 0.08);
}

.partner-card-icon-wrap {
    width: 58px;
    height: 58px;
    margin-bottom: 22px;
}

.partner-card-icon-wrap img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.partner-card-title {
    font-size: 20px;
    font-weight: 700;
    color: #02060e;
    margin-bottom: 12px;
    line-height: 1.35;
    font-family: var(--font-heading);
}

.partner-card-desc {
    font-size: 14.5px;
    line-height: 1.68;
    color: #64748b;
    margin: 0;
}

/* Red Highlighted 3rd Card in Partner Section */
.partner-card.partner-card-featured,
.partner-industries-grid > .partner-card:nth-child(3) {
    background: #BE2C28 !important;
    border-color: #BE2C28 !important;
    box-shadow: 0 14px 38px rgba(190, 44, 40, 0.32) !important;
}

.partner-card.partner-card-featured .partner-card-title,
.partner-industries-grid > .partner-card:nth-child(3) .partner-card-title {
    color: #ffffff !important;
}

.partner-card.partner-card-featured .partner-card-desc,
.partner-industries-grid > .partner-card:nth-child(3) .partner-card-desc {
    color: rgba(255, 255, 255, 0.92) !important;
}

.partner-card.partner-card-featured .partner-card-icon-wrap img,
.partner-industries-grid > .partner-card:nth-child(3) .partner-card-icon-wrap img {
    filter: brightness(0) invert(1) !important;
}

/* 4. Section 5: Question CTA Banner */
.question-cta-section {
    width: 100%;
    padding: clamp(40px, 5vw, 65px) 0;
    background: #ffffff;
}

.question-cta-container {
    width: 100%;
}

.question-cta-banner {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 380px;
    border-radius: 28px;
    padding: clamp(32px, 4vw, 48px) clamp(24px, 5vw, 60px);
    background: linear-gradient(90deg, #6C2A4A 0%, #BE2C28 100%);
    box-shadow: 0 18px 46px rgba(190, 44, 40, 0.28);
    overflow: hidden;
}

.question-cta-content {
    position: relative;
    z-index: 2;
    width: 58%;
    max-width: 580px;
}

.question-cta-title {
    color: #ffffff;
    font-size: clamp(26px, 3.2vw, 40px);
    font-weight: 700;
    line-height: 1.22;
    margin-bottom: 14px;
    font-family: var(--font-heading);
}

.question-cta-description {
    color: rgba(255, 255, 255, 0.88);
    font-size: 15px;
    line-height: 1.68;
    margin-bottom: 24px;
}

.question-cta-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #040F1D;
    color: #ffffff;
    border-radius: 9999px;
    padding: 14px 30px;
    font-size: 13.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.question-cta-button:hover {
    background: #ffffff;
    color: #BE2C28;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

.question-cta-image {
    position: absolute;
    right: 2%;
    bottom: 0;
    width: 44%;
    max-width: 520px;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    pointer-events: none;
    z-index: 1;
}

.question-cta-image img {
    display: block;
    max-height: 105%;
    width: auto;
    object-fit: contain;
    object-position: bottom right;
}

/* 5. Section 6: Questions To Insights ("From Questions To Insights") */
.questions-to-insights-section {
    position: relative;
    width: 100%;
    background-color: #ffffff;
    padding: clamp(65px, 7vw, 100px) 0;
}

.questions-insights-layout {
    display: grid;
    grid-template-columns: 0.95fr 1.05fr;
    gap: clamp(30px, 4vw, 55px);
    align-items: center;
    margin-top: 45px;
}

.questions-insights-visual {
    width: 100%;
    display: flex;
    justify-content: center;
}

.questions-insights-visual-card {
    position: relative;
    width: 100%;
    max-width: 480px;
    border-radius: 28px;
    overflow: hidden;
    background: #f8fafc;
    box-shadow: 0 12px 36px rgba(15, 23, 42, 0.06);
}

.questions-insights-visual-card img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
}

.qti-accordion-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.qti-accordion-item {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.qti-accordion-item.active {
    border-color: #BE2C28;
    box-shadow: 0 8px 24px rgba(190, 44, 40, 0.08);
}

.qti-accordion-header {
    width: 100%;
    padding: 18px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    background: transparent;
    border: none;
    text-align: left;
}

.qti-header-left {
    display: flex;
    align-items: center;
    gap: 16px;
}

.qti-num-badge {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #fdf2f2;
    color: #BE2C28;
    font-weight: 700;
    font-size: 13.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.qti-accordion-item.active .qti-num-badge {
    background: #BE2C28;
    color: #ffffff;
}

.qti-question-title {
    font-size: 16.5px;
    font-weight: 600;
    color: #02060e;
    margin: 0;
    font-family: var(--font-heading);
}

.qti-toggle-icon {
    font-size: 20px;
    font-weight: 600;
    color: #BE2C28;
    line-height: 1;
}

.qti-accordion-body {
    padding: 0 24px 20px 72px;
}

.qti-answer-text {
    font-size: 14.5px;
    line-height: 1.7;
    color: #475569;
    margin: 0;
}

/* 6. Section 7: Business Outcomes ("From Business Questions to Meaningful Outcomes") */
.business-outcomes-section {
    position: relative;
    width: 100%;
    background-color: #f9f9f7;
    padding: clamp(65px, 7vw, 100px) 0;
}

.outcomes-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    margin-top: 40px;
}

.outcome-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    padding: 38px 30px;
    box-shadow: 0 6px 26px rgba(15, 23, 42, 0.04);
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
}

.outcome-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 36px rgba(15, 23, 42, 0.09);
    border-color: rgba(204, 31, 31, 0.25);
}

.outcome-icon-wrap {
    width: 52px;
    height: 52px;
    margin-bottom: 22px;
}

.outcome-icon-wrap img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.outcome-title {
    font-size: 20px;
    font-weight: 700;
    color: #02060e;
    margin-bottom: 12px;
    font-family: var(--font-heading);
}

.outcome-desc {
    font-size: 14.5px;
    line-height: 1.68;
    color: #64748b;
    margin: 0;
}

.outcomes-pagination-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 36px;
}

.outcomes-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #cbd5e1;
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;
}

.outcomes-dot.active {
    width: 26px;
    border-radius: 12px;
    background: #cc1f1f;
}

/* 7. Section 8: Local Insight Global Reach (Dark Section) */
.global-reach-dark-section {
    position: relative;
    width: 100%;
    background-color: #020a13;
    padding: clamp(70px, 8vw, 110px) 0;
    color: #ffffff;
    text-align: center;
    overflow: hidden;
}

.global-reach-dark-section .section-header-area .section-main-heading {
    color: #ffffff !important;
}

.global-reach-dark-section .section-header-area .industries-expertise-desc,
.global-reach-dark-section .section-header-area .section-sub-text {
    color: rgba(255, 255, 255, 0.8) !important;
}

.global-reach-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
    margin-top: 48px;
}

.global-reach-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 24px;
    padding: 44px 24px 38px;
    display: flex;
    flex-direction: column;
    align-items: center;
    backdrop-filter: blur(14px);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s, border-color 0.3s;
}

.global-reach-card:hover {
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(190, 44, 40, 0.5);
    transform: translateY(-6px);
}

.global-reach-icon-wrap {
    width: 86px;
    height: 86px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.22);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 22px;
    background: rgba(255, 255, 255, 0.04);
}

.global-reach-icon-wrap img {
    width: 44px;
    height: 44px;
    object-fit: contain;
}

.global-reach-number {
    font-family: var(--font-heading);
    font-size: clamp(32px, 3vw, 42px);
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 6px;
}

.global-reach-label {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.82);
    margin: 0;
}

/* 8. Section 9: Turning Research Into Impact */
.research-process-impact-section {
    position: relative;
    width: 100%;
    background-color: #f9f9f7;
    padding: clamp(65px, 7vw, 100px) 0;
}

.process-cards-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-top: 45px;
}

.process-impact-card {
    background: #ffffff;
    border: 1px solid #e0e0df;
    border-radius: 24px;
    padding: 38px 28px;
    box-shadow: 0 6px 28px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
}

.process-impact-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 36px rgba(15, 23, 42, 0.09);
    border-color: #BE2C28;
}

.process-step-num {
    font-size: 52px;
    font-weight: 800;
    color: #02060e;
    opacity: 0.15;
    line-height: 1;
    margin-bottom: 16px;
    font-family: var(--font-heading);
}

.process-step-icon {
    width: 54px;
    height: 54px;
    margin-bottom: 20px;
}

.process-step-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.process-step-title {
    font-size: 20px;
    font-weight: 700;
    color: #02060e;
    margin-bottom: 12px;
    font-family: var(--font-heading);
}

.process-step-desc {
    font-size: 14px;
    line-height: 1.68;
    color: #64748b;
    margin: 0;
}

/* Responsive adjustments for mobile & tablet */
@media (max-width: 1024px) {
    .industries-about-grid {
        grid-template-columns: 1fr;
        text-align: center;
    }
    .industries-about-content {
        max-width: 100%;
    }
    .industries-cards-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .partner-industries-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .questions-insights-layout {
        grid-template-columns: 1fr;
    }
    .global-reach-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .process-cards-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .question-cta-content {
        width: 100%;
        max-width: 100%;
    }
    .question-cta-image {
        display: none;
    }
}

@media (max-width: 640px) {
    .industries-cards-grid {
        grid-template-columns: 1fr;
    }
    .partner-industries-grid {
        grid-template-columns: 1fr;
    }
    .outcomes-grid {
        grid-template-columns: 1fr;
    }
    .global-reach-grid {
        grid-template-columns: 1fr;
    }
    .process-cards-grid {
        grid-template-columns: 1fr;
    }
}
`;

// Remove previous block if exists, then append
if (styleCss.includes('INDUSTRIES PAGE - 100% DESIGN SYSTEM & SECTION STYLES')) {
  styleCss = styleCss.split('/* ==========================================================================\n   INDUSTRIES PAGE - 100% DESIGN SYSTEM & SECTION STYLES')[0].trim();
}

styleCss += '\n\n' + industriesCss.trim() + '\n';
fs.writeFileSync(styleCssPath, styleCss, 'utf8');
console.log('Successfully appended industries design CSS to style.css!');
