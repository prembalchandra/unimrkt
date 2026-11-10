'use client';

import React, { useState } from 'react';
import { submitContactInquiry } from '../../../lib/strapi';

export default function ContactForm({ dynamicForm = null }) {
  const displayKicker = dynamicForm?.kicker || '';
  const displayHeading = dynamicForm?.heading || '';
  const displayDesc = dynamicForm?.description || '';

  const namePlaceholder = dynamicForm?.namePlaceholder || 'Name';
  const emailPlaceholder = dynamicForm?.emailPlaceholder || 'Email';
  const phonePlaceholder = dynamicForm?.phonePlaceholder || 'Phone number';
  const companyPlaceholder = dynamicForm?.companyPlaceholder || 'Company';
  const consentText = dynamicForm?.consentText || '';
  const submitButtonText = dynamicForm?.submitButtonText || 'Submit';
  const submittingButtonText = dynamicForm?.submittingButtonText || 'Submitting...';
  const successMessage = dynamicForm?.successMessage || 'Thank you! Your inquiry has been received.';
  const errorMessageText = dynamicForm?.errorMessage || 'An error occurred while submitting. Please try again.';

  const countryOptions = dynamicForm?.countryCodeOptions
    ? dynamicForm.countryCodeOptions.split(',').map((item) => {
        const [val, ...lbl] = item.trim().split(':');
        return { value: val.trim(), label: lbl.join(':').trim() || val.trim() };
      })
    : [
        { value: '+91', label: '🇮🇳 +91' },
        { value: '+1', label: '🇺🇸 +1' },
        { value: '+44', label: '🇬🇧 +44' },
      ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: countryOptions[0]?.value || '+91',
    phone: '',
    company: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      await submitContactInquiry({
        name: formData.name,
        email: formData.email,
        countryCode: formData.countryCode,
        phone: formData.phone,
        company: formData.company,
        consent: formData.consent,
        sourcePage: 'contact',
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('Submission issue:', err.message);
      setFormError(errorMessageText);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-form-section" id="contact-form">
      <div className="srcn-container">
        <div className="contact-form-content">
          {(displayKicker || displayHeading || displayDesc) && (
            <div className="contact-form-heading">
              {displayKicker && (
                <span className="contact-form-kicker career-values-kicker">{displayKicker}</span>
              )}
              {displayHeading && <h2 className="section-main-heading">{displayHeading}</h2>}
              {displayDesc && <p className="section-sub-text">{displayDesc}</p>}
            </div>
          )}

          {submitted ? (
            <div className="contact-form-success-box" style={{ padding: '36px', textAlign: 'center', background: '#fff', borderRadius: '12px' }}>
              <i className="fa-solid fa-circle-check" style={{ fontSize: '3rem', color: '#10B981', marginBottom: '16px' }}></i>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#1B212D' }}>{successMessage}</h3>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {formError && (
                <div className="contact-form-error-banner" style={{ color: '#EF4444', marginBottom: '16px' }}>
                  {formError}
                </div>
              )}
              <label className="contact-form-field">
                <span className="visually-hidden">{namePlaceholder}</span>
                <input
                  type="text"
                  name="name"
                  placeholder={namePlaceholder}
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
              <label className="contact-form-field">
                <span className="visually-hidden">{emailPlaceholder}</span>
                <input
                  type="email"
                  name="email"
                  placeholder={emailPlaceholder}
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <div className="contact-form-phone">
                <label className="contact-form-country">
                  <span className="visually-hidden">Country calling code</span>
                  <select
                    name="countryCode"
                    aria-label="Country calling code"
                    value={formData.countryCode}
                    onChange={handleChange}
                  >
                    {countryOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="contact-form-field">
                  <span className="visually-hidden">{phonePlaceholder}</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder={phonePlaceholder}
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <label className="contact-form-field">
                <span className="visually-hidden">{companyPlaceholder}</span>
                <input
                  type="text"
                  name="company"
                  placeholder={companyPlaceholder}
                  autoComplete="organization"
                  required
                  value={formData.company}
                  onChange={handleChange}
                />
              </label>
              {consentText && (
                <label className="contact-form-consent">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                  />
                  <span>{consentText}</span>
                </label>
              )}
              <button
                className="contact-form-submit btn-sm"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? submittingButtonText : submitButtonText}{' '}
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
