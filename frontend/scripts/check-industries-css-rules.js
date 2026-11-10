const fs = require('fs');
const css = fs.readFileSync('public/asstes/css/style.css', 'utf8');

// Check all classes used in app/industries/sections
const classesToCheck = [
  'telephonic-overview-section', 'telephonic-overview-grid', 'telephonic-overview-content', 'telephonic-overview-visual-wrap',
  'industries-grid-section', 'industries-cards-grid', 'industry-card', 'industry-card-body', 'industry-card-title', 'industry-card-desc',
  'partner-industries-section', 'partner-industries-grid', 'partner-card', 'partner-industry-card',
  'question-cta-section', 'question-cta-card', 'question-cta-content', 'question-cta-visual',
  'questions-to-insights-section', 'qti-accordion-wrapper', 'qti-accordion-header', 'qti-accordion-body',
  'business-outcomes-section', 'outcomes-slider', 'outcome-card',
  'global-reach-dark-section', 'global-reach-stat-circle',
  'telephonic-process-area', 'telephonic-process-card', 'telephonic-process-slider',
  'testimonials-showcase-section', 'testimonial-showcase-card'
];

console.log('--- CSS CHECK FOR INDUSTRIES SECTIONS ---');
classesToCheck.forEach(cls => {
  const has = css.includes('.' + cls);
  console.log(cls.padEnd(35), '=>', has ? 'FOUND' : 'MISSING!');
});
