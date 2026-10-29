
'use client';

import React, { useState, useMemo, useEffect } from 'react';

const faqDatabase = [
  {
    category: 'General',
    question: 'What is Unimrkt Research and what services do you provide?',
    answer:
      'Unimrkt Research is a global market research and data collection agency founded in 2009. We offer end-to-end qualitative and quantitative research services, CATI, online survey panels, healthcare studies, data analytics, and secondary market intelligence across 90+ countries.',
  },
  {
    category: 'General',
    question: 'Where are your offices and research centers located?',
    answer:
      'Our primary operational headquarters and multilingual research facilities are based in Gurugram, India, supported by regional business offices in the United States and the United Kingdom. We operate 24/7 across multiple time zones.',
  },
  {
    category: 'General',
    question: 'What certifications and quality standards do you follow?',
    answer:
      'Unimrkt Research follows ISO 20252:2019 and ISO 27001:2013 standards as specified for its research and information security practices. We adhere to applicable industry ethics and data privacy requirements.',
  },
  {
    category: 'Primary Research',
    question: 'What is the difference between primary and secondary research at Unimrkt?',
    answer:
      'Primary research involves original, first-hand data collection directly from targeted audiences via phone interviews (CATI), web surveys, in-depth interviews (IDIs), and focus groups. Secondary research leverages verified publications, commercial databases, company filings, and statistical repositories to synthesize market landscapes and competitive benchmarking.',
  },
  {
    category: 'Primary Research',
    question: 'Can you reach niche B2B decision-makers and C-suite executives?',
    answer:
      'Yes. Our specialized B2B recruitment teams have experience reaching high-value profiles such as CTOs, CFOs, hospital procurement directors, fleet managers, supply chain leaders, and cybersecurity experts across North America, Europe, APAC, and LATAM.',
  },
  {
    category: 'Primary Research',
    question: 'Do you offer questionnaire design and survey programming?',
    answer:
      'Yes, we provide questionnaire design, logic routing, complex quotas, multilingual localization, and survey scripting across platforms like Decipher, Confirmit, Qualtrics, and programmed web instruments.',
  },
  {
    category: 'CATI & Telephonic',
    question: 'What is CATI and why should I choose it over web surveys?',
    answer:
      'CATI stands for Computer-Assisted Telephone Interviewing. It is ideal when you need deeper probing, engagement from busy senior executives, real-time response validation, and access to segments where email contact lists have low deliverability.',
  },
  {
    category: 'CATI & Telephonic',
    question: 'How many CATI stations do you operate and in what languages?',
    answer:
      'Our CATI operations support multilingual interviewing across English, German, French, Spanish, Italian, Japanese, Mandarin, Arabic, Portuguese, Hindi, and other regional languages. Confirm current station capacity and language availability with our team.',
  },
  {
    category: 'CATI & Telephonic',
    question: 'Are CATI calls recorded and monitored for quality assurance?',
    answer:
      'Call recording and monitoring practices depend on project requirements, respondent consent, and applicable privacy laws. Quality assurance can include live monitoring, post-interview verification, and protocol compliance checks.',
  },
  {
    category: 'Panels & Sampling',
    question: 'How large is your global panel reach?',
    answer:
      'We support research across 90+ countries, with access to consumer, B2B professional, healthcare, physician, and niche technology audiences. Feasibility depends on the target profile, geography, incidence rate, and sample requirements.',
  },
  {
    category: 'Panels & Sampling',
    question: 'How do you prevent fraudulent bots and duplicate respondents?',
    answer:
      'Fraud prevention can include device and IP checks, CAPTCHA, attention checks, response-duration analysis, and duplicate detection to help identify suspicious or invalid responses.',
  },
  {
    category: 'Quality & Delivery',
    question: 'What deliverables do you provide at project completion?',
    answer:
      'Deliverables can include clean datasets in SPSS, Excel, CSV, or ASCII formats, weighted tables, banner cross-tabs, PowerPoint executive summaries, verbatim transcripts, and interactive business intelligence dashboards, depending on the project scope.',
  },
  {
    category: 'Quality & Delivery',
    question: 'What is the typical turnaround time for a custom research project?',
    answer:
      'Turnaround times depend on sample size, incidence rate, target audience, and geography. Standard B2B and consumer web surveys may take 3 to 7 business days, while complex multi-country CATI or executive qualitative studies may take 2 to 4 weeks or longer.',
  },
  {
    category: 'Quality & Delivery',
    question: 'How do I request a quote or RFP proposal?',
    answer:
      'Submit your project requirements through our online Contact Form or email sales@unimrkt.com. Our team can assess feasibility, methodology, timelines, and pricing based on your project requirements.',
  },
];

const categories = [
  'All',
  'General',
  'Primary Research',
  'CATI & Telephonic',
  'Panels & Sampling',
  'Quality & Delivery',
];

export default function FaqContent({ dynamicFaq = null }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestion, setOpenQuestion] = useState(null);

  const combinedFaqs = useMemo(() => {
    if (!dynamicFaq?.items || dynamicFaq.items.length === 0) return faqDatabase;
    const strapiItems = dynamicFaq.items.map((it) => ({
      category: 'General',
      question: it.question,
      answer: it.answer,
    }));
    return [...strapiItems, ...faqDatabase];
  }, [dynamicFaq]);

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return combinedFaqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        faq.category === selectedCategory;

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    setOpenQuestion(null);
  }, [selectedCategory, searchQuery]);

  const toggleFaq = (question) => {
    setOpenQuestion((previous) =>
      previous === question ? null : question
    );
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setOpenQuestion(null);
  };

  return (
    <section className="faq-section-area">
      <div className="worldmap-bg">
        <img src="/asstes/images/unimrkt-resarch-map-banner-img.png" alt="fqa banner" />
      </div>
      <div className="srcn-container">

        <div
          className="blog-filter-tabs our-gallery-tabs"
          role="group"
          aria-label="Filter FAQs by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`blog-filter-btn ${selectedCategory === category ? 'active' : ''
                }`}
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="faq-accordion-container">
          {filteredFaqs.length === 0 ? (
            <div className="faq-empty-state">
              <div className="faq-empty-icon">
                <i
                  className="fa-solid fa-circle-exclamation"
                  aria-hidden="true"
                />
              </div>

              <h3>No matching questions found</h3>

              <p>
                Try different keywords or clear your filters to see
                all frequently asked questions.
              </p>

              <button
                type="button"
                className="faq-reset-btn"
                onClick={resetFilters}
              >
                View All Questions
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openQuestion === faq.question;
              const answerId = `faq-answer-${index}`;

              return (
                <div
                  key={faq.question}
                  className={`faq-accordion-item  ${isOpen ? 'active' : ''
                    }`}
                >
                  <button
                    type="button"
                    className="faq-accordion-header"
                    onClick={() => toggleFaq(faq.question)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span className="faq-header-left">
                      <span className="faq-question-text">
                        {faq.question}
                      </span>
                    </span>

                    <span className={`faq-icon-indicator ${isOpen ? 'active' : ''}`} aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <div
                    id={answerId}
                    className="faq-accordion-body"
                    hidden={!isOpen}
                  >
                    <div className="faq-accordion-content">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
