'use client';

import React, { useState, useMemo, useEffect } from 'react';

function formatFaq(f) {
  if (!f) return null;
  return {
    category: f.category || 'General',
    question: f.question || '',
    answer: f.answer || '',
  };
}

export default function FaqContent({ dynamicFaq = null, initialFaqs = [] }) {
  const [faqsList, setFaqsList] = useState(() => (initialFaqs || []).map(formatFaq).filter(Boolean));
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestion, setOpenQuestion] = useState(null);

  useEffect(() => {
    if (initialFaqs && initialFaqs.length > 0) {
      setFaqsList(initialFaqs.map(formatFaq).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/faqs?pagination[limit]=50&sort=order:asc`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setFaqsList(d.data.map(formatFaq).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [initialFaqs]);

  const combinedFaqs = useMemo(() => {
    const fromDynamic = (dynamicFaq?.items || []).map((it) => ({
      category: 'General',
      question: it.question,
      answer: it.answer,
    }));
    return [...fromDynamic, ...faqsList];
  }, [dynamicFaq, faqsList]);

  const categories = useMemo(() => {
    const set = new Set();
    combinedFaqs.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return ['All', ...Array.from(set)];
  }, [combinedFaqs]);

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
  }, [combinedFaqs, selectedCategory, searchQuery]);

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
                  className={`faq-accordion-item ${isOpen ? 'active' : ''
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
