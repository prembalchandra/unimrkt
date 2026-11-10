'use client';

import React, { useState, useMemo, useEffect } from 'react';

function formatJob(job, idx) {
  if (!job) return null;
  const deptLabel = job.department || 'Operations';
  const typeLabel = job.job_type || job.jobType || 'Full Time';
  const locationLabel = job.location || 'Gurugram, India';
  const dateLabel = job.posted_date || job.postedDate
    ? new Date(job.posted_date || job.postedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Recent';

  let descContent = null;
  if (typeof job.description === 'string' && job.description.length > 0) {
    descContent = <p>{job.description}</p>;
  } else if (Array.isArray(job.description) && job.description.length > 0) {
    descContent = (
      <div>
        {job.description.map((block, i) => (
          <p key={i}>{(block.children || []).map((c) => c.text).join('')}</p>
        ))}
      </div>
    );
  } else {
    descContent = (
      <>
        <h4>Job Description</h4>
        <p>Support research execution, quality audits, data processing, and client engagement workflows across multi-country studies.</p>
        <h4>Key Responsibilities</h4>
        <ul>
          <li>Execute quantitative and qualitative research methodologies within designated timelines.</li>
          <li>Ensure high accuracy and strict adherence to ISO 20252 and global compliance standards.</li>
          <li>Coordinate cross-functional tasks with project managers and field teams.</li>
        </ul>
        <h4>Qualifications</h4>
        <ul>
          <li>Bachelor's or Master's degree in a relevant discipline.</li>
          <li>Strong analytical, communication, and problem-solving skills.</li>
        </ul>
      </>
    );
  }

  return {
    id: job.id || job.documentId || idx + 1,
    title: job.title || '',
    department: deptLabel.toLowerCase(),
    deptLabel,
    type: typeLabel.toLowerCase(),
    typeLabel,
    location: locationLabel.toLowerCase(),
    locationLabel,
    dateLabel,
    metaText: `${locationLabel} · ${typeLabel} · ${deptLabel} · ${dateLabel}`,
    description: descContent,
  };
}

export default function CareerOpenings({ initialJobs = [] }) {
  const [jobs, setJobs] = useState(() => (initialJobs || []).map(formatJob).filter(Boolean));
  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);

  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyStatus, setApplyStatus] = useState('');

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

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    const emailBody = [
      `Position: ${selectedJob ? selectedJob.title : ''}`,
      `Full Name: ${formName}`,
      `Email: ${formEmail}`,
      `Phone: ${formPhone}`,
      `Experience: ${formExperience}`,
      `Current Location: ${formLocation}`,
      `Additional Message: ${formMessage || 'None'}`,
      '',
      'Please attach my resume to this application.',
    ].join('\n');

    const subject = encodeURIComponent(`Job Application: ${selectedJob ? selectedJob.title : ''}`);
    const body = encodeURIComponent(emailBody);
    setApplyStatus('Opening your email app. Please attach your resume before sending.');
    window.location.href = `mailto:careers@unimrkt.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="career-openings-section" id="open-positions">
      <div className="srcn-container">
        <header className="career-openings-header">
          <span className="career-openings-kicker career-values-kicker">Open Positions</span>
          <h2 className="section-main-heading">Find Your Next Opportunity</h2>
          <p className="section-sub-text">
            Explore roles across different departments and take the next step in your career journey with Unimrkt.
          </p>
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
                      <img src="/asstes/images/icon/profile-user-icon-img.png" alt="Department" /> {job.deptLabel}
                    </li>
                    <li>
                      <span>
                        <img src="/asstes/images/icon/calendar-icon-img.png" alt="Date" />
                      </span>{' '}
                      {job.dateLabel}
                    </li>
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
                >
                  <option value="">Select experience</option>
                  <option>Fresher</option>
                  <option>Less than 1 year</option>
                  <option>1-3 years</option>
                  <option>3-5 years</option>
                  <option>5+ years</option>
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
                />
              </label>
              <label className="career-application-field career-resume-field">
                <span>
                  Resume / CV <b>*</b>
                </span>
                <input type="file" name="Resume" accept=".pdf,.doc,.docx" />
                <small>PDF, DOC or DOCX (up to 5 MB)</small>
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
                ></textarea>
              </label>
              <p className="career-application-note">
                Submitting opens an email draft to our hiring team. Please attach your resume to the email before sending.
              </p>
              <button className="career-job-apply career-application-submit" type="submit">
                Submit Application
              </button>
              {applyStatus && <p className="career-application-status">{applyStatus}</p>}
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
