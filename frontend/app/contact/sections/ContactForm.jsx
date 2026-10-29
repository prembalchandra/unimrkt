'use client';

import React, { useState } from 'react';
import { submitContactInquiry } from '../../../lib/strapi';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    company: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setSubmitted(true);

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
    } catch (err) {
      console.warn('Strapi submission warning:', err.message);
    } finally {
      setIsSubmitting(false);
    }

    const subject = encodeURIComponent(`New Market Research Enquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.countryCode} ${formData.phone}\nCompany: ${formData.company}\nConsent: ${formData.consent ? 'Yes' : 'No'}`
    );
    window.location.href = `mailto:sales@unimrkt.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact-form-section" id="contact-form">
      <div className="srcn-container">
        <div className="contact-form-content">
          <div className="contact-form-heading">
            <span className="contact-form-kicker career-values-kicker">Contact Form</span>
            <h2 className="section-main-heading">Let's Team Up!</h2>
            <p className="section-sub-text">
              Interested in high-end, extensive market research? Get in touch with our experts.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="contact-form-field">
              <span className="visually-hidden">Name</span>
              <input
                type="text"
                name="name"
                placeholder="Name*"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label className="contact-form-field">
              <span className="visually-hidden">Email ID</span>
              <input
                type="email"
                name="email"
                placeholder="Email ID*"
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
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
              </label>
              <label className="contact-form-field">
                <span className="visually-hidden">Phone number</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number*"
                  autoComplete="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>
            </div>
            <label className="contact-form-field">
              <span className="visually-hidden">Company name</span>
              <input
                type="text"
                name="company"
                placeholder="Company name*"
                autoComplete="organization"
                required
                value={formData.company}
                onChange={handleChange}
              />
            </label>
            <label className="contact-form-consent">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
              />
              <span>I agree to be contacted about my research enquiry.</span>
            </label>
            <button className="contact-form-submit btn-sm" type="submit">
              {submitted ? 'Message Sent!' : 'Send'}{' '}
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
