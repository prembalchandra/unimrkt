'use client';

import React, { useState, useMemo, useEffect } from 'react';

const jobCardsData = [
  {
    id: 1,
    title: 'Executive - Language & Communication',
    department: 'communication',
    type: 'full time',
    location: 'gurugram',
    locationLabel: 'Gurugram, India',
    typeLabel: 'Full Time',
    deptLabel: 'India Research',
    dateLabel: '12 Aug 2026',
    metaText: 'Gurugram, India · Full Time · India Research · 12 Aug 2026',
    description: (
      <>
        <h4>Job Description</h4>
        <p>Support language and communication quality across research projects, coordinate with internal teams, and help ensure clear, accurate participant interactions.</p>
        <ul>
          <li>Monitor and record operational calls and language assessments.</li>
          <li>Identify opportunities to improve accent, pronunciation, grammar, telephonic etiquette, and voice modulation.</li>
          <li>Provide constructive feedback and practical coaching to research associates.</li>
          <li>Evaluate communication quality and share regular progress reports.</li>
        </ul>
        <h4>Skills Required</h4>
        <ul>
          <li>Excellent spoken English and strong written communication.</li>
          <li>Ability to identify language and pronunciation issues.</li>
          <li>Strong interpersonal skills and attention to detail.</li>
        </ul>
        <h4>Qualifications and Experience</h4>
        <ul>
          <li>Graduate in English, communications, linguistics, or a related field preferred.</li>
          <li>Prior experience in communication training or quality assurance is an advantage.</li>
        </ul>
      </>
    ),
  },
  {
    id: 2,
    title: 'Associate - Primary Research',
    department: 'primary research',
    type: 'full time',
    location: 'gurugram',
    locationLabel: 'Gurugram, India',
    typeLabel: 'Full Time',
    deptLabel: 'India Research',
    dateLabel: '12 Aug 2026',
    metaText: 'Gurugram, India · Full Time · India Research · 12 Aug 2026',
    description: (
      <>
        <h4>Job Description</h4>
        <p>Execute B2B and B2C primary research projects across global markets, focusing on questionnaire execution, in-depth interviews, survey data validation, and respondent quality control.</p>
        <h4>Key Responsibilities</h4>
        <ul>
          <li>Conduct telephonic and in-depth qualitative and quantitative interviews with industry professionals.</li>
          <li>Coordinate field work with project managers and ensure quota targets are achieved within deadlines.</li>
          <li>Perform preliminary data cleaning, screening validation, and quota tracking.</li>
          <li>Prepare daily field progression reports and flag incidence or sample anomalies.</li>
        </ul>
        <h4>Skills Required</h4>
        <ul>
          <li>Excellent oral and written communication skills in English.</li>
          <li>Familiarity with research methodologies, CATI tools, and survey administration.</li>
          <li>High analytical capability and strong attention to detail.</li>
        </ul>
        <h4>Qualifications and Experience</h4>
        <ul>
          <li>Bachelor's or Master's degree in Business, Economics, Statistics, or related discipline.</li>
          <li>1-3 years of proven experience in primary market research operations.</li>
        </ul>
      </>
    ),
  },
  {
    id: 3,
    title: 'Associate - Secondary Research',
    department: 'secondary research',
    type: 'full time',
    location: 'gurugram',
    locationLabel: 'Gurugram, India',
    typeLabel: 'Full Time',
    deptLabel: 'India Research',
    dateLabel: '12 Aug 2026',
    metaText: 'Gurugram, India · Full Time · India Research · 12 Aug 2026',
    description: (
      <>
        <h4>Job Description</h4>
        <p>Conduct deep secondary research and market intelligence synthesis using syndicated commercial databases, corporate financial filings, trade journals, and regulatory publications.</p>
        <h4>Key Responsibilities</h4>
        <ul>
          <li>Gather and synthesize market size, share, growth driver, and competitor data across global industries.</li>
          <li>Build structured market models, value-chain assessments, and company profiling dossiers.</li>
          <li>Validate and triangulate secondary data points to maintain highest research accuracy.</li>
          <li>Collaborate with primary research analysts to deliver cohesive client insight reports.</li>
        </ul>
        <h4>Skills Required</h4>
        <ul>
          <li>Strong proficiency in Excel, data modeling, and advanced secondary search operators.</li>
          <li>Excellent analytical thinking and business report writing skills.</li>
          <li>Ability to synthesize complex datasets into concise executive summaries.</li>
        </ul>
        <h4>Qualifications and Experience</h4>
        <ul>
          <li>Degree in Management, Finance, Economics, or Research.</li>
          <li>1-3 years of experience in business research or competitive intelligence.</li>
        </ul>
      </>
    ),
  },
  {
    id: 4,
    title: 'Assistant Manager - India Sales',
    department: 'sales',
    type: 'full time',
    location: 'gurugram',
    locationLabel: 'Gurugram, India',
    typeLabel: 'Full Time',
    deptLabel: 'India Research',
    dateLabel: '12 Aug 2026',
    metaText: 'Gurugram, India · Full Time · India Research · 12 Aug 2026',
    description: (
      <>
        <h4>Job Description</h4>
        <p>Drive new business acquisition and client engagement for Unimrkt Research's full-service portfolio across corporate enterprises, consulting firms, and agencies in India.</p>
        <h4>Key Responsibilities</h4>
        <ul>
          <li>Identify and pitch prospective client accounts requiring market research, CATI, and panel data collection.</li>
          <li>Formulate tailored commercial proposals, RFPs, and study pricing structures with delivery directors.</li>
          <li>Foster long-term executive relationships and oversee key account management.</li>
          <li>Achieve quarterly revenue milestones and expand customer lifetime value.</li>
        </ul>
        <h4>Skills Required</h4>
        <ul>
          <li>Demonstrated B2B solution selling track record within the research or professional services domain.</li>
          <li>Stellar presentation, negotiation, and consultative selling abilities.</li>
          <li>Strong commercial acumen and market understanding.</li>
        </ul>
        <h4>Qualifications and Experience</h4>
        <ul>
          <li>MBA or equivalent postgraduate qualification in Marketing or Business.</li>
          <li>3-5 years of successful B2B corporate sales experience.</li>
        </ul>
      </>
    ),
  },
  {
    id: 5,
    title: 'Research Operations Coordinator',
    department: 'operations',
    type: 'contract',
    location: 'delhi',
    locationLabel: 'Delhi, India',
    typeLabel: 'Contract',
    deptLabel: 'India Research',
    dateLabel: '12 Aug 2026',
    metaText: 'Delhi, India · Contract · India Research · 12 Aug 2026',
    description: (
      <>
        <h4>Job Description</h4>
        <p>Manage the logistical pipeline, field resource scheduling, and vendor coordination across multi-country research studies.</p>
        <h4>Key Responsibilities</h4>
        <ul>
          <li>Coordinate daily shift allocations for over 450+ multilingual CATI interviewers.</li>
          <li>Monitor real-time quota compliance, telephone dialer throughput, and interviewer efficiency metrics.</li>
          <li>Facilitate cross-departmental communication between sales, sample providers, and research directors.</li>
          <li>Track project milestones and flag delivery bottlenecks proactively.</li>
        </ul>
        <h4>Skills Required</h4>
        <ul>
          <li>Strong operational problem-solving and multi-tasking skills.</li>
          <li>Familiarity with call center or market research operations software.</li>
          <li>Effective coordination and interpersonal communication skills.</li>
        </ul>
        <h4>Qualifications and Experience</h4>
        <ul>
          <li>Bachelor's degree in any discipline.</li>
          <li>1-3 years in operations coordination or project support.</li>
        </ul>
      </>
    ),
  },
  {
    id: 6,
    title: 'Research Analyst - Market Insights',
    department: 'primary research',
    type: 'part time',
    location: 'remote',
    locationLabel: 'Remote',
    typeLabel: 'Part Time',
    deptLabel: 'India Research',
    dateLabel: '12 Aug 2026',
    metaText: 'Remote · Part Time · India Research · 12 Aug 2026',
    description: (
      <>
        <h4>Job Description</h4>
        <p>Transform complex quantitative survey datasets and qualitative verbatims into actionable strategic insights and visual presentations.</p>
        <h4>Key Responsibilities</h4>
        <ul>
          <li>Analyze raw data tables, cross-tabs, and statistical distributions.</li>
          <li>Draft executive summary decks, key takeaway narratives, and strategic recommendations for clients.</li>
          <li>Work with interactive BI dashboard platforms and data visualization instruments.</li>
          <li>Verify analytical rigor and statistical significance across project outputs.</li>
        </ul>
        <h4>Skills Required</h4>
        <ul>
          <li>Strong command over SPSS, Excel, PowerPoint, and statistical analysis techniques.</li>
          <li>Proven storytelling capability translating numbers into business impact.</li>
          <li>Familiarity with market research cross-tabulation tools.</li>
        </ul>
        <h4>Qualifications and Experience</h4>
        <ul>
          <li>Degree in Statistics, Data Science, Marketing, or Economics.</li>
          <li>2-4 years of experience in insight analytics.</li>
        </ul>
      </>
    ),
  },
];

export default function CareerOpenings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);

  // Modal states
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyStatus, setApplyStatus] = useState('');

  // Close modals on Escape key and lock body scroll
  useEffect(() => {
    if (!isDetailsModalOpen && !isApplyModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDetailsModalOpen(false);
        setIsApplyModalOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDetailsModalOpen, isApplyModalOpen]);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formExperience, setFormExperience] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const filteredJobs = useMemo(() => {
    return jobCardsData.filter((job) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q);
      const matchDept = !department || job.department === department;
      const matchType = !jobType || job.type === jobType;
      const matchLoc = !location || job.location === location;
      return matchSearch && matchDept && matchType && matchLoc;
    });
  }, [searchQuery, department, jobType, location]);

  const visibleJobs = filteredJobs.slice(0, visibleCount);

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
              <option value="communication">Communication</option>
              <option value="primary research">Primary Research</option>
              <option value="secondary research">Secondary Research</option>
              <option value="sales">Sales</option>
              <option value="operations">Operations</option>
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
              <option value="full time">Full Time</option>
              <option value="part time">Part Time</option>
              <option value="contract">Contract</option>
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
              <option value="gurugram">Gurugram, India</option>
              <option value="delhi">Delhi, India</option>
              <option value="remote">Remote</option>
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
                  <h2 id="careerDetailsTitle">
                    {selectedJob.title}
                  </h2>
                  <p id="careerDetailsMeta">
                    {selectedJob.metaText}
                  </p>
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
            <div className="career-details-content">
              {selectedJob.description}
            </div>
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
                <h2 id="careerApplicationTitle">
                  Apply for {selectedJob.title}
                </h2>
                <p>
                  Fill in your details below to apply for this position.
                </p>
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
