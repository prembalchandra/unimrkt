'use client';

import React from 'react';
import CommonHeroSection from './sections/CommonHeroSection';
import HomeHeroSection from './sections/HomeHeroSection';
import MetricsGridSection from './sections/MetricsGridSection';
import ValuesGridSection from './sections/ValuesGridSection';
import AccordionSolutionsSection from './sections/AccordionSolutionsSection';
import ResearchReachSection from './sections/ResearchReachSection';
import IndustrySliderSection from './sections/IndustrySliderSection';
import TestimonialsSection from './sections/TestimonialsSection';
import FaqAccordionSection from './sections/FaqAccordionSection';
import QuestionCtaSection from './sections/QuestionCtaSection';
import TeamGridSection from './sections/TeamGridSection';
import GalleryShowcaseSection from './sections/GalleryShowcaseSection';
import BlogsSliderSection from './sections/BlogsSliderSection';
import CaseStudiesSliderSection from './sections/CaseStudiesSliderSection';
import ContactFormSection from './sections/ContactFormSection';
import ClientLogosSection from './sections/ClientLogosSection';
import RichTextBlockSection from './sections/RichTextBlockSection';

const COMPONENT_REGISTRY = {
  'sections.home-hero': HomeHeroSection,
  'sections.hero-common': CommonHeroSection,
  'sections.metrics-grid': MetricsGridSection,
  'sections.values-grid': ValuesGridSection,
  'sections.accordion-solutions': AccordionSolutionsSection,
  'sections.research-reach': ResearchReachSection,
  'sections.industry-slider': IndustrySliderSection,
  'sections.testimonials-slider': TestimonialsSection,
  'sections.faq-accordion': FaqAccordionSection,
  'sections.question-cta': QuestionCtaSection,
  'sections.team-grid': TeamGridSection,
  'sections.gallery-showcase': GalleryShowcaseSection,
  'sections.blogs-slider': BlogsSliderSection,
  'sections.case-studies-slider': CaseStudiesSliderSection,
  'sections.contact-form': ContactFormSection,
  'sections.client-logos': ClientLogosSection,
  'sections.rich-text-block': RichTextBlockSection,
};

export default function DynamicZoneRenderer({ sections = [], pageContext = {} }) {
  if (!Array.isArray(sections) || sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section, idx) => {
        const componentType = section.__component;
        const Component = COMPONENT_REGISTRY[componentType];

        if (!Component) {
          console.warn(`[DynamicZoneRenderer] Unknown component type: ${componentType}`);
          return null;
        }

        const key = section.id ? `${componentType}-${section.id}` : `${componentType}-${idx}`;

        return (
          <Component
            key={key}
            data={section}
            pageContext={pageContext}
          />
        );
      })}
    </>
  );
}
