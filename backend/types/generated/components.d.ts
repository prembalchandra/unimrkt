import type { Schema, Struct } from '@strapi/strapi';

export interface CaseStudyApproachStep extends Struct.ComponentSchema {
  collectionName: 'components_case_study_approach_steps';
  info: {
    description: 'Step in research methodology or execution process';
    displayName: 'Approach Step';
    icon: 'arrowRight';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    stepNumber: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CaseStudyDiagramPillar extends Struct.ComponentSchema {
  collectionName: 'components_case_study_diagram_pillars';
  info: {
    description: 'Research question pillar or framework node';
    displayName: 'Diagram Pillar';
    icon: 'layer';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    stepNumber: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CaseStudyImpactItem extends Struct.ComponentSchema {
  collectionName: 'components_case_study_impact_items';
  info: {
    description: 'Measurable outcome or impact highlight';
    displayName: 'Impact Item';
    icon: 'thumbUp';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsButtonLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_button_links';
  info: {
    description: 'Call to action button or link';
    displayName: 'Button Link';
    icon: 'cursor';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    showArrow: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline', 'text']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface ElementsFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_faq_items';
  info: {
    description: 'Single question and answer pair';
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_feature_items';
  info: {
    description: 'Represents a capability, feature, or benefit card';
    displayName: 'Feature Item';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    iconClass: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsListItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_list_items';
  info: {
    description: 'Simple repeatable text bullet or item';
    displayName: 'List Item';
    icon: 'bulletList';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsMetricCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_metric_cards';
  info: {
    description: 'Key performance indicator or impact metric';
    displayName: 'Metric Card';
    icon: 'chartBubble';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsNavLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_nav_links';
  info: {
    description: 'Navigation item with optional dropdown sub-links';
    displayName: 'Navigation Link';
    icon: 'bulletList';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    subLinks: Schema.Attribute.Component<'elements.button-link', true>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_social_links';
  info: {
    description: 'Social media platform link';
    displayName: 'Social Link';
    icon: 'share';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['linkedin', 'twitter', 'facebook', 'youtube', 'instagram']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_testimonial_items';
  info: {
    description: 'Client testimonial quote and author details';
    displayName: 'Testimonial Item';
    icon: 'user';
  };
  attributes: {
    author: Schema.Attribute.String & Schema.Attribute.Required;
    avatar: Schema.Attribute.Media<'images'>;
    company: Schema.Attribute.String;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    role: Schema.Attribute.String;
  };
}

export interface LayoutFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_layout_footer_columns';
  info: {
    description: 'Navigation column in the footer';
    displayName: 'Footer Column';
    icon: 'bulletList';
  };
  attributes: {
    links: Schema.Attribute.Component<'elements.button-link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsAccordionSolutions extends Struct.ComponentSchema {
  collectionName: 'components_sections_accordion_solutions';
  info: {
    description: 'Expanding horizontal or vertical accordion solution cards';
    displayName: 'Accordion Solutions';
    icon: 'expand';
  };
  attributes: {
    cards: Schema.Attribute.Component<'elements.feature-item', true>;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsBlogsSlider extends Struct.ComponentSchema {
  collectionName: 'components_sections_blogs_sliders';
  info: {
    description: 'Latest research articles and market intelligence';
    displayName: 'Blogs Slider';
    icon: 'book';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Market Intelligence & Strategic Perspectives'>;
    kicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'LATEST INSIGHTS'>;
  };
}

export interface SectionsCalloutBox extends Struct.ComponentSchema {
  collectionName: 'components_sections_callout_boxes';
  info: {
    description: 'Editorial or sidebar callout box with action link';
    displayName: 'Callout Box';
    icon: 'volumeUp';
  };
  attributes: {
    button: Schema.Attribute.Component<'elements.button-link', false>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsCaseStudiesSlider extends Struct.ComponentSchema {
  collectionName: 'components_sections_case_studies_sliders';
  info: {
    description: 'Featured enterprise client success stories';
    displayName: 'Case Studies Slider';
    icon: 'briefcase';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Real-World Results & Commercial Impact'>;
    kicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'PROVEN IMPACT'>;
  };
}

export interface SectionsClientLogos extends Struct.ComponentSchema {
  collectionName: 'components_sections_client_logos';
  info: {
    description: 'Grid or ticker of enterprise client partner logos';
    displayName: 'Client Logos';
    icon: 'picture';
  };
  attributes: {
    logos: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Trusted by Global Enterprises'>;
  };
}

export interface SectionsContactForm extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_forms';
  info: {
    description: 'Interactive inquiry form with contact details';
    displayName: 'Contact Form Section';
    icon: 'mail';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Let's Connect and Build Your Research Blueprint">;
    kicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'GET IN TOUCH'>;
    supportEmail: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'sales@unimrkt.com'>;
    supportPhone: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'+91-124-424-5210'>;
  };
}

export interface SectionsFaqAccordion extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_accordions';
  info: {
    description: 'Accordion list of frequently asked questions';
    displayName: 'FAQ Accordion';
    icon: 'question';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Frequently Asked Questions'>;
    items: Schema.Attribute.Component<'elements.faq-item', true> &
      Schema.Attribute.Required;
    kicker: Schema.Attribute.String;
  };
}

export interface SectionsGalleryShowcase extends Struct.ComponentSchema {
  collectionName: 'components_sections_gallery_showcases';
  info: {
    description: 'Moments, culture, and fieldwork photo gallery';
    displayName: 'Gallery Showcase';
    icon: 'picture';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Moments, Milestones & Celebrations'>;
    kicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'LIFE AT UNIMRKT'>;
  };
}

export interface SectionsHeroCommon extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_commons';
  info: {
    description: 'Standard hero banner with title, kicker, description, background and CTA buttons';
    displayName: 'Hero Common';
    icon: 'landscape';
  };
  attributes: {
    bannerImage: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.Text;
    kicker: Schema.Attribute.String;
    primaryButton: Schema.Attribute.Component<'elements.button-link', false>;
    secondaryButton: Schema.Attribute.Component<'elements.button-link', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHomeHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_home_heroes';
  info: {
    description: 'Video hero section with rotating service highlights';
    displayName: 'Home Hero';
    icon: 'play';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.button-link', false>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Market Intelligence'>;
    fallbackImage: Schema.Attribute.Media<'images'>;
    servicePills: Schema.Attribute.Component<'elements.feature-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    video: Schema.Attribute.Media<'videos' | 'files'>;
    videoUrl: Schema.Attribute.String;
  };
}

export interface SectionsIndustrySlider extends Struct.ComponentSchema {
  collectionName: 'components_sections_industry_sliders';
  info: {
    description: 'Carousel or grid showcasing served industries';
    displayName: 'Industry Slider';
    icon: 'slideshow';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    kicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'INDUSTRIES WE SERVE'>;
    slides: Schema.Attribute.Component<'elements.feature-item', true>;
  };
}

export interface SectionsMetricsGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_metrics_grids';
  info: {
    description: 'Grid of key statistical counters and achievements';
    displayName: 'Metrics Grid';
    icon: 'dashboard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    kicker: Schema.Attribute.String;
    metrics: Schema.Attribute.Component<'elements.metric-card', true>;
  };
}

export interface SectionsQuestionCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_question_ctas';
  info: {
    description: 'Have A Question CTA banner with image and action button';
    displayName: 'Question CTA';
    icon: 'question';
  };
  attributes: {
    button: Schema.Attribute.Component<'elements.button-link', false>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Have A Question? Let's Find The Answer.">;
    visualImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SectionsResearchReach extends Struct.ComponentSchema {
  collectionName: 'components_sections_research_reaches';
  info: {
    description: 'Global research reach showcase with capability cards';
    displayName: 'Research Reach';
    icon: 'earth';
  };
  attributes: {
    cards: Schema.Attribute.Component<'elements.feature-item', true>;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    kicker: Schema.Attribute.String & Schema.Attribute.DefaultTo<'OUR REACH'>;
  };
}

export interface SectionsRichTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_sections_rich_text_blocks';
  info: {
    description: 'Standard rich content block powered by Strapi Blocks editor';
    displayName: 'Rich Text Block';
    icon: 'file';
  };
  attributes: {
    content: Schema.Attribute.Blocks & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTeamGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_team_grids';
  info: {
    description: 'Leadership and executive directory section';
    displayName: 'Team Grid';
    icon: 'user';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Meet Our Leadership & Research Experts'>;
    kicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'EXECUTIVE LEADERSHIP'>;
  };
}

export interface SectionsTestimonialsSlider extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonials_sliders';
  info: {
    description: 'Client testimonials and partner reviews slider';
    displayName: 'Testimonials Slider';
    icon: 'quote-right';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'What Global Enterprises Say About Unimrkt'>;
    kicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'TRUSTED BY LEADERS'>;
    testimonials: Schema.Attribute.Component<'elements.testimonial-item', true>;
  };
}

export interface SectionsValuesGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_values_grids';
  info: {
    description: 'Grid of core company values and cultural pillars';
    displayName: 'Values Grid';
    icon: 'shield';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'What Drives Us'>;
    kicker: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Core Values of Unimrkt'>;
    values: Schema.Attribute.Component<'elements.feature-item', true>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Search engine optimization and social metadata';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    noIndex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'case-study.approach-step': CaseStudyApproachStep;
      'case-study.diagram-pillar': CaseStudyDiagramPillar;
      'case-study.impact-item': CaseStudyImpactItem;
      'elements.button-link': ElementsButtonLink;
      'elements.faq-item': ElementsFaqItem;
      'elements.feature-item': ElementsFeatureItem;
      'elements.list-item': ElementsListItem;
      'elements.metric-card': ElementsMetricCard;
      'elements.nav-link': ElementsNavLink;
      'elements.social-link': ElementsSocialLink;
      'elements.testimonial-item': ElementsTestimonialItem;
      'layout.footer-column': LayoutFooterColumn;
      'sections.accordion-solutions': SectionsAccordionSolutions;
      'sections.blogs-slider': SectionsBlogsSlider;
      'sections.callout-box': SectionsCalloutBox;
      'sections.case-studies-slider': SectionsCaseStudiesSlider;
      'sections.client-logos': SectionsClientLogos;
      'sections.contact-form': SectionsContactForm;
      'sections.faq-accordion': SectionsFaqAccordion;
      'sections.gallery-showcase': SectionsGalleryShowcase;
      'sections.hero-common': SectionsHeroCommon;
      'sections.home-hero': SectionsHomeHero;
      'sections.industry-slider': SectionsIndustrySlider;
      'sections.metrics-grid': SectionsMetricsGrid;
      'sections.question-cta': SectionsQuestionCta;
      'sections.research-reach': SectionsResearchReach;
      'sections.rich-text-block': SectionsRichTextBlock;
      'sections.team-grid': SectionsTeamGrid;
      'sections.testimonials-slider': SectionsTestimonialsSlider;
      'sections.values-grid': SectionsValuesGrid;
      'shared.seo': SharedSeo;
    }
  }
}
