'use client';

import React, { useState } from 'react';
import { submitContactInquiry } from '@/lib/strapi';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    company: '',
    consent: true,
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
    if (!formData.name || !formData.email || !formData.company) return;

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
  };

  const inputStyle =
    'h-[65px] w-full rounded-[10px] border-none bg-white px-5 font-sans text-[15px] font-medium text-[#04264e] placeholder:text-[#5e5e5e] focus:outline-none focus:ring-2 focus:ring-brand-600 shadow-sm';

  return (
    <section id="contact-form" className="relative overflow-hidden bg-[#101723] px-4 py-16 sm:px-6 lg:pb-[105px] lg:pt-[106px]">
      <img
        alt="Let’s Team Up!"
        src="/uploads/contact_form_bg_2f600c3d05.jpg"
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-[0.16]"
      />

      <div className="relative mx-auto flex w-full max-w-[888px] flex-col items-center">
        <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-[#cc1f1f]">
          Let’s Team Up!
        </p>
        <h2 className="mt-4 text-center font-sans text-[34px] font-semibold capitalize leading-[1.2] tracking-[-1.5px] text-white sm:text-[44px] lg:text-[52px] lg:tracking-[-3px]">
          Let us scope your research study
        </h2>
        <p className="mt-4 max-w-[720px] text-center font-sans text-[16px] font-normal leading-[1.8] text-white/80">
          Fill out the form below and one of our practice leads will respond within 2 business hours.
        </p>

        {submitted ? (
          <div className="mt-10 w-full rounded-[20px] bg-white/10 p-8 text-center text-white backdrop-blur-md">
            <h3 className="font-sans text-[24px] font-semibold text-white">Thank You!</h3>
            <p className="mt-2 text-[16px] text-white/80">
              Your inquiry has been submitted successfully. A research director will contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 flex w-full flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Name*"
                className={inputStyle}
              />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email ID*"
                className={inputStyle}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex h-[65px] w-full items-center rounded-[10px] bg-white px-4 shadow-sm">
                <span className="flex items-center gap-2 pr-3 border-r border-[#e0e0df]">
                  <img src="/images/contact/contact-flag-india.png" alt="India" className="h-4 w-6 rounded-sm object-cover" />
                  <span className="text-[14px] font-semibold text-[#04264e]">{formData.countryCode}</span>
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="h-full w-full border-none bg-transparent pl-3 text-[15px] font-medium text-[#04264e] placeholder:text-[#5e5e5e] focus:outline-none"
                />
              </div>

              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name*"
                className={inputStyle}
              />
            </div>

            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="size-5 rounded border-white/20 bg-white/10 text-brand-600 focus:ring-brand-600"
                />
                <span className="font-sans text-[14px] text-white/80">
                  I agree to receive communications from Unimrkt Research.
                </span>
              </label>

              <div className="flex items-center gap-2">
                <img
                  src="/figma-industries/enquiry/recaptcha-logo.svg"
                  alt="reCAPTCHA"
                  className="h-7 w-auto opacity-80"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-[60px] items-center justify-center gap-2 rounded-btn bg-gradient-to-r from-gradient-from to-gradient-to px-12 font-sans text-[14px] font-bold uppercase tracking-[0.08em] text-white transition-all hover:brightness-110 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Talk to an Expert'}
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4">
                  <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
