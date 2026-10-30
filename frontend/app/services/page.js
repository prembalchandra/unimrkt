import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
import ServicesHero from './sections/ServicesHero';
import ServicesAboutOverview from './sections/ServicesAboutOverview';
import EndToEndSolutions from './sections/EndToEndSolutions';
import WhyChooseUs from './sections/WhyChooseUs';
import ServicesWorkflow from './sections/ServicesWorkflow';
import ServicesQuestionCTA from './sections/ServicesQuestionCTA';
import ResearchReachSection from './sections/ResearchReachSection';
import ServicesIndustriesExpertise from '../../components/ServicesIndustriesExpertise';
import CaseStudiesImpactCta from './sections/CaseStudiesImpactCta';
import CommonTrustedPartnersTestimonials from '../../components/CommonTrustedPartnersTestimonials';
import CommonBlogSection from '../../components/CommonBlogSection';
import ServicesFaq from './sections/ServicesFaq';
import InsightsEditorial from './sections/InsightsEditorial';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'services',
    'Market Research Services | Primary, Secondary, CATI & Analytics',
    'Comprehensive research solutions: qualitative in-depth interviews, quantitative surveys, CATI telephonic reach, survey scripting, and advanced business analytics.'
  );
}

export default async function ServicesPage() {
  const pageData = await getPageBySlug('services').catch(() => null);

  
  if (pageData?.sections && pageData.sections.length > 0) {
    return (
      <main>
        <DynamicZoneRenderer sections={pageData.sections} pageContext={{ pageData }} />
      </main>
    );
  }

  const heroSection = findSection(pageData, 'sections.hero-common');
  const metricsSection = findSection(pageData, 'sections.metrics-grid');
  const faqSection = findSection(pageData, 'sections.faq-accordion');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <>
      <ServicesHero dynamicHero={heroSection} />
      <ServicesAboutOverview />
      <EndToEndSolutions />
      <WhyChooseUs />
      <ServicesWorkflow />
      <ServicesQuestionCTA dynamicCta={ctaSection} />
      <ResearchReachSection
        kicker={metricsSection?.kicker || 'Our Coverage'}
        title={metricsSection?.heading || 'Research Reach That Goes Beyond Markets'}
        description={metricsSection?.description}
      />
      <ServicesIndustriesExpertise />
      <CaseStudiesImpactCta />
      <CommonTrustedPartnersTestimonials />
      <CommonBlogSection />
      <ServicesFaq dynamicFaq={faqSection} />
      <InsightsEditorial />
      <ResearchCta dynamicCta={ctaSection} />
    </>
  );
}
