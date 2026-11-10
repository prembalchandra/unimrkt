const fs = require('fs');
const path = require('path');

const filesWithArrays = [
  'app/automotives/sections/AutomotiveChallengesDark.jsx',
  'app/automotives/sections/AutomotiveEcosystemSlider.jsx',
  'app/automotives/sections/AutomotiveFaq.jsx',
  'app/automotives/sections/AutomotiveIntelligenceCards.jsx',
  'app/automotives/sections/AutomotiveMethodologiesSlider.jsx',
  'app/automotives/sections/AutomotiveOverview.jsx',
  'app/automotives/sections/AutomotiveSegmentsSlider.jsx',
  'app/blog/sections/BlogFaq.jsx',
  'app/blog/sections/BlogGrid.jsx',
  'app/case-study/sections/CaseStudyExplorer.jsx',
  'app/case-study-details/sections/CaseDetailApproach.jsx',
  'app/case-study-details/sections/CaseDetailFaq.jsx',
  'app/case-study-details/sections/CaseDetailImpact.jsx',
  'app/contact/sections/ContactProcess.jsx',
  'app/gallery/sections/GalleryGrid.jsx',
  'app/homesections/CapabilitiesSection.jsx',
  'app/homesections/HeroSection.jsx',
  'app/industries/sections/BusinessOutcomesSection.jsx',
  'app/industries/sections/IndustriesFaq.jsx',
  'app/industries/sections/LocalInsightGlobalReach.jsx',
  'app/industries/sections/PartnerIndustriesSection.jsx',
  'app/industries/sections/QuestionsToInsightsSection.jsx',
  'app/industries/sections/ResearchProcessImpact.jsx',
  'app/our-company/sections/CompanyOurResearchEcosystem.jsx',
  'app/our-company/sections/CompanyOverview.jsx',
  'app/our-company/sections/CompnayIndustriesUnderstand.jsx',
  'app/our-company/sections/CompnayOurFqa.jsx',
  'app/our-company/sections/CompnayOurValues.jsx',
  'app/our-company/sections/OurcompanyResearchImpact.jsx',
  'app/primary-research/sections/FqaPrimaryresearch.jsx',
  'app/primary-research/sections/IndustriesArea.jsx',
  'app/primary-research/sections/PrimaryServices.jsx',
  'app/primary-research/sections/ResearchMethodologies.jsx',
  'app/primary-research/sections/UnimrktResearchArea.jsx',
  'app/services/sections/EndToEndSolutions.jsx',
  'app/services/sections/ServicesFaq.jsx',
  'app/services/sections/ServicesWorkflow.jsx',
  'app/services/sections/WhyChooseUs.jsx',
  'app/telephonic-surveys/sections/MeasureSection.jsx',
  'app/telephonic-surveys/sections/QualityFirst.jsx',
  'app/telephonic-surveys/sections/TelephonicCanMeasure.jsx',
  'app/telephonic-surveys/sections/TelephonicFaq.jsx',
  'app/telephonic-surveys/sections/TelephonicProcess.jsx',
  'app/telephonic-surveys/sections/WhyTelephonic.jsx'
];

console.log('Total files to check:', filesWithArrays.length);
for (const rel of filesWithArrays) {
  const fullPath = path.join(__dirname, '..', rel);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const matches = content.match(/(const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*\[/g);
    console.log(rel, '=>', matches ? matches.join(', ') : 'none');
  } else {
    console.log(rel, '=> NOT FOUND');
  }
}
