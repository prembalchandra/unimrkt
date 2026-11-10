'use client';

import React, { useState } from 'react';
import { submitContactInquiry } from '@/lib/strapi';

export default function BlogDetailClientActions({ isForm = false, sourcePage = 'blog-detail', title = '' }) {
  const [shareStatus, setShareStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleShare = async () => {
    if (typeof window === 'undefined') return;

    if (!navigator.clipboard?.writeText) {
      setShareStatus('Copy this page URL from your browser address bar to share.');
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus('Article link copied to clipboard!');
      setTimeout(() => setShareStatus(''), 4000);
    } catch {
      setShareStatus('Could not copy link automatically. Copy from your browser address bar.');
      setTimeout(() => setShareStatus(''), 4000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      await submitContactInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        company: 'Individual / Not Specified',
        countryCode: '+1',
        consent: true,
        sourcePage: sourcePage,
      });

      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      console.error('Failed to submit blog inquiry:', err);
      setErrorMessage('Could not send your inquiry. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (isForm) {
    return (
      <form onSubmit={handleSubmit} className="blog-enquiry-form">
        {submitted ? (
          <div
            style={{
              padding: '16px',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              color: '#166534',
              fontSize: '0.95rem',
              textAlign: 'center',
            }}
          >
            <i className="fa-solid fa-circle-check" style={{ marginRight: '8px', color: '#16a34a' }}></i>
            Thank you! Your inquiry has been sent to our research experts.
          </div>
        ) : (
          <>
            <label>
              <span className="visually-hidden">Name</span>
              <input
                type="text"
                name="name"
                placeholder="Name*"
                required
                value={formData.name}
                onChange={handleInputChange}
                disabled={submitting}
              />
            </label>
            <label>
              <span className="visually-hidden">Phone number</span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number*"
                required
                value={formData.phone}
                onChange={handleInputChange}
                disabled={submitting}
              />
            </label>
            <label>
              <span className="visually-hidden">Email</span>
              <input
                type="email"
                name="email"
                placeholder="Email*"
                required
                value={formData.email}
                onChange={handleInputChange}
                disabled={submitting}
              />
            </label>
            <label>
              <span className="visually-hidden">Message</span>
              <textarea
                name="message"
                placeholder="Message*"
                rows="4"
                required
                value={formData.message}
                onChange={handleInputChange}
                disabled={submitting}
              ></textarea>
            </label>
            {errorMessage && (
              <p style={{ color: '#dc2626', fontSize: '0.85rem', margin: '4px 0' }}>{errorMessage}</p>
            )}
            <button type="submit" disabled={submitting}>
              {submitting ? 'Sending...' : 'Submit'}{' '}
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </button>
          </>
        )}
      </form>
    );
  }

  return (
    <>
      <button
        type="button"
        className="blog-share-button"
        onClick={handleShare}
        aria-label={`Share ${title}`}
      >
        <i className="fa-solid fa-arrow-up-from-bracket" aria-hidden="true" style={{ marginRight: '6px' }}></i>
        Share
      </button>
      {shareStatus && (
        <span
          style={{
            display: 'inline-block',
            color: '#16a34a',
            fontSize: '0.85rem',
            marginLeft: '8px',
            fontWeight: '500',
          }}
        >
          {shareStatus}
        </span>
      )}
    </>
  );
}
