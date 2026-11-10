'use client';

import React, { useState, useMemo, useEffect } from 'react';
import StrapiBlocksRenderer from '@/components/StrapiBlocksRenderer';
import { submitContactInquiry } from '@/lib/strapi';

function formatJob(job, idx) {
  if (!job) return null;
  const deptLabel = job.department || 'Operations';
  const typeLabel = job.job_type || job.jobType || 'Full Time';
  const locationLabel = job.location || 'Gurugram, India';
  const dateLabel = job.posted_date || job.postedDate
    ? new Date(job.posted_date || job.postedDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

  const descContent = job.description ? (
    <StrapiBlocksRenderer content={job.description} />
  ) : null;

  const metaParts = [locationLabel, typeLabel, deptLabel, dateLabel].filter(Boolean);

  return {
    id: job.id || job.documentId || idx + 1,
    slug: job.slug || '',
    title: job.title || '',
    department: deptLabel.toLowerCase(),
    deptLabel,
    type: typeLabel.toLowerCase(),
    typeLabel,
    location: locationLabel.toLowerCase(),
    locationLabel,
    dateLabel,
    metaText: metaParts.join(' · '),
    description: descContent,
  };
}

export default function CareerOpenings({ initialJobs = [], dynamicSection = null }) {
  const [jobs, setJobs] = useState(() => (initialJobs || []).map(formatJob).filter(Boolean));
  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);

  const displayKicker = dynamicSection?.kicker || 'Open Positions';
  const displayHeading =
    dynamicSection?.heading || dynamicSection?.title || 'Find Your Next Opportunity';
  const displayDesc =
    dynamicSection?.description ||
    'Explore roles across different departments and take the next step in your career journey with Unimrkt.';

  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyStatus, setApplyStatus] = useState('');
  const [applySubmitting, setApplySubmitting] = useState(false);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formExperience, setFormExperience] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    if (initialJobs && initialJobs.length > 0) {
      setJobs(initialJobs.map(formatJob).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/career-jobs?pagination[limit]=20`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setJobs(d.data.map(formatJob).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [initialJobs]);

  const departmentOptions = useMemo(() => {
    const set = new Set();
    jobs.forEach((j) => set.add(j.deptLabel));
    return Array.from(set);
  }, [jobs]);

  const jobTypeOptions = useMemo(() => {
    const set = new Set();
    jobs.forEach((j) => set.add(j.typeLabel));
    return Array.from(set);
  }, [jobs]);

  const locationOptions = useMemo(() => {
    const set = new Set();
    jobs.forEach((j) => set.add(j.locationLabel));
    return Array.from(set);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q);
      const matchDept = !department || job.deptLabel === department;
      const matchType = !jobType || job.typeLabel === jobType;
      const matchLoc = !location || job.locationLabel === location;
      return matchSearch && matchDept && matchType && matchLoc;
    });
  }, [jobs, searchQuery, department, jobType, location]);

  const visibleJobs = filteredJobs.slice(0, visibleCount);

  useEffect(() => {
    if (isDetailsModalOpen || isApplyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDetailsModalOpen(false);
        setIsApplyModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDetailsModalOpen, isApplyModalOpen]);

  const handleOpenDetails = (job) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(true);
  };

  const handleOpenApply = (job) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(false);
    setIsApplyModalOpen(true);
    setApplyStatus('');
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setApplySubmitting(true);
    setApplyStatus('Submitting your application...');

    try {
      await submitContactInquiry({
        name: formName,
        email: formEmail,
        phone: formPhone,
        company: `Applicant: ${selectedJob?.title || 'General'}`,
        message: `Job Application for: ${selectedJob?.title || 'Open Role'}\nExperience: ${formExperience}\nCurrent Location: ${formLocation}\nMessage: ${formMessage || 'None'}`,
        sourcePage: `careers-${selectedJob?.slug || selectedJob?.id || 'work'}`,
        countryCode: '+91',
        consent: true,
      });

      setApplyStatus('Thank you! Your application has been submitted successfully to our talent team.');
      setTimeout(() => {
        setIsApplyModalOpen(false);
        setApplyStatus('');
        setFormName('');
        setFormEmail('');
        setFormPhone('');
        setFormExperience('');
        setFormLocation('');
        setFormMessage('');
      }, 3500);
    } catch (err) {
      console.error('Job application submission error:', err);
      // Fallback: trigger email client
      const subject = encodeURIComponent(`Job Application: ${selectedJob ? selectedJob.title : ''}`);
      const body = encodeURIComponent(
        `Position: ${selectedJob ? selectedJob.title : ''}\nName: ${formName}\nEmail: ${formEmail}\nPhone: ${formPhone}\nExperience: ${formExperience}\nLocation: ${formLocation}\n\nMessage:\n${formMessage || 'None'}`
      );
      window.location.href = `mailto:careers@unimrkt.com?subject=${subject}&body=${body}`;
      setApplyStatus('Application drafted. Please send through your email client.');
    } finally {
      setApplySubmitting(false);
    }
  };

  return (
    <section className="career-openings-section" id="open-positions">
      <div className="srcn-container">
        <header className="career-openings-header section-header-area">
          <span className="career-openings-kicker career-values-kicker">{displayKicker}</span>
          <h2 className="section-main-heading">{displayHeading}</h2>
          <p className="section-sub-text">{displayDesc}</p>
        </header>

        <form
          className="career-job-filters"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            setVisibleCount(4);
          }}
        >
          <label className="career-job-search">
            <span className="visually-hidden">Search job roles</span>
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            <input
              type="search"
              name="job-search"
              placeholder="Search for job roles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(4);
              }}
            />
          </label>
          <label className="career-job-filter">
            <span>Department</span>
            <select
              name="department"
              aria-label="Filter by department"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setVisibleCount(4);
              }}
            >
              <option value="">All Departments</option>
              {departmentOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label className="career-job-filter">
            <span>Job Type</span>
            <select
              name="job-type"
              aria-label="Filter by job type"
              value={jobType}
              onChange={(e) => {
                setJobType(e.target.value);
                setVisibleCount(4);
              }}
            >
              <option value="">All Types</option>
              {jobTypeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="career-job-filter">
            <span>Location</span>
            <select
              name="location"
              aria-label="Filter by location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setVisibleCount(4);
              }}
            >
              <option value="">All Locations</option>
              {locationOptions.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <button className="career-job-search-submit" type="submit">
            Search
          </button>
        </form>

        <div className="career-job-list" aria-live="polite">
          {visibleJobs.map((job) => (
            <article key={job.id} className="career-job-card">
              <div className="career-job-summary">
                <span className="career-job-icon">
                  <img src="/asstes/images/icon/job-icon-img.png" alt="job" />
                </span>
                <div className="career-job-main">
                  <h3>{job.title}</h3>
                  <ul className="career-job-meta">
                    <li>
                      <span>
                        <img src="/asstes/images/icon/location-icon-img.png" alt="Location" />
                      </span>{' '}
                      {job.locationLabel}
                    </li>
                    <li>
                      <span>
                        <img src="/asstes/images/icon/briefcase-icon-img.png" alt="Job Type" />
                      </span>{' '}
                      {job.typeLabel}
                    </li>
                    <li>
                      <img src="/asstes/images/icon/profile-user-icon-img.png" alt="Department" />{' '}
                      {job.deptLabel}
                    </li>
                    {job.dateLabel && (
                      <li>
                        <span>
                          <img src="/asstes/images/icon/calendar-icon-img.png" alt="Date" />
                        </span>{' '}
                        {job.dateLabel}
                      </li>
                    )}
                  </ul>
                </div>
                <div className="career-job-actions">
                  <button
                    className="career-job-details-toggle"
                    type="button"
                    onClick={() => handleOpenDetails(job)}
                  >
                    View Details
                  </button>
                  <button
                    className="career-job-apply career-job-apply-trigger"
                    type="button"
                    onClick={() => handleOpenApply(job)}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <p className="career-jobs-empty">No positions match those filters. Try changing your search or selections.</p>
        )}

        {filteredJobs.length > visibleCount && (
          <button
            className="career-jobs-load-more"
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 4)}
          >
            Load More
          </button>
        )}
      </div>

      {/* Details Modal */}
      {isDetailsModalOpen && selectedJob && (
        <div
          className="career-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsDetailsModalOpen(false);
          }}
        >
          <div
            className="career-modal career-details-modal open"
            role="dialog"
            aria-modal="true"
            aria-labelledby="careerDetailsTitle"
          >
            <div className="career-modal-header">
              <div className="career-modal-job-heading">
                <span className="career-job-icon">
                  <img src="/asstes/images/icon/job-icon-img.png" alt="Job Position" />
                </span>
                <div>
                  <h2 id="careerDetailsTitle">{selectedJob.title}</h2>
                  <p id="careerDetailsMeta">{selectedJob.metaText}</p>
                </div>
              </div>
              <button
                className="career-modal-close"
                type="button"
                aria-label="Close job details"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
            </div>
            <div className="career-details-content">{selectedJob.description}</div>
            <div className="career-modal-footer">
              <button
                className="career-job-apply career-modal-apply"
                type="button"
                onClick={() => handleOpenApply(selectedJob)}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {isApplyModalOpen && selectedJob && (
        <div
          className="career-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsApplyModalOpen(false);
          }}
        >
          <div
            className="career-modal career-application-modal open"
            role="dialog"
            aria-modal="true"
            aria-labelledby="careerApplicationTitle"
          >
            <div className="career-modal-header">
              <div className="career-modal-title-wrap">
                <h2 id="careerApplicationTitle">Apply for {selectedJob.title}</h2>
                <p>Fill in your details below to apply for this position.</p>
              </div>
              <button
                className="career-modal-close"
                type="button"
                aria-label="Close application form"
                onClick={() => setIsApplyModalOpen(false)}
              >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
            </div>
            <form className="career-application-form" onSubmit={handleApplicationSubmit}>
              <label className="career-application-field">
                <span>
                  Full Name <b>*</b>
                </span>
                <input
                  type="text"
                  name="Full Name"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  disabled={applySubmitting}
                />
              </label>
              <label className="career-application-field">
                <span>
                  Email Address <b>*</b>
                </span>
                <input
                  type="email"
                  name="Email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  required
                  disabled={applySubmitting}
                />
              </label>
              <label className="career-application-field">
                <span>
                  Phone Number <b>*</b>
                </span>
                <input
                  type="tel"
                  name="Phone"
                  placeholder="Enter your mobile number"
                  autoComplete="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  required
                  disabled={applySubmitting}
                />
              </label>
              <label className="career-application-field">
                <span>
                  Experience (in Years) <b>*</b>
                </span>
                <select
                  name="Experience"
                  value={formExperience}
                  onChange={(e) => setFormExperience(e.target.value)}
                  required
                  disabled={applySubmitting}
                >
                  <option value="">Select experience</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </label>
              <label className="career-application-field">
                <span>
                  Current Location <b>*</b>
                </span>
                <input
                  type="text"
                  name="Current Location"
                  placeholder="Enter your current location"
                  autoComplete="address-level2"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  required
                  disabled={applySubmitting}
                />
              </label>
              <label className="career-application-field career-application-message">
                <span>
                  Additional Message <em>(Optional)</em>
                </span>
                <textarea
                  name="Message"
                  rows="3"
                  placeholder="Tell us why you're a great fit for this role..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  disabled={applySubmitting}
                ></textarea>
              </label>
              <button
                className="career-job-apply career-application-submit"
                type="submit"
                disabled={applySubmitting}
              >
                {applySubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
              {applyStatus && (
                <p
                  className="career-application-status"
                  style={{
                    color: applyStatus.includes('successfully') ? '#16a34a' : '#d97706',
                    marginTop: '12px',
                    fontWeight: '500',
                  }}
                >
                  {applyStatus}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
