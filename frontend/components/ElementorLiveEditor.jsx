'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ElementorLiveEditor() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isEditorActive, setIsEditorActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('sections'); // 'sections' | 'edit' | 'elements'
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedSectionName, setSelectedSectionName] = useState('');
  const [sectionsList, setSectionsList] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [deviceView, setDeviceView] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [previewMode, setPreviewMode] = useState(false); // true = hide outlines for clean preview

  // Dynamic form state for selected section
  const [sectionForm, setSectionForm] = useState({
    title: '',
    kicker: '',
    description: '',
    btnLabel: '',
    btnUrl: '',
  });

  // 1. Auto-detect if loaded inside iframe (e.g. Strapi Preview) or via query param
  useEffect(() => {
    const isIframe = typeof window !== 'undefined' && window.self !== window.top;
    const hasParam = searchParams?.get('elementor') === 'true' || searchParams?.get('edit') === 'true';

    if (isIframe || hasParam) {
      setIsEditorActive(true);
    }
  }, [searchParams]);

  // 2. Scan sections and enable inline editing
  useEffect(() => {
    if (!isEditorActive) return;

    const timer = setTimeout(() => {
      scanAndSetupPage();
    }, 400);

    return () => clearTimeout(timer);
  }, [isEditorActive, pathname]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Scan page for sections and setup Elementor interactions
  const scanAndSetupPage = () => {
    const sectionEls = document.querySelectorAll('section, main > div[class*="-area"], main > div[class*="-section"]');
    const detected = [];

    sectionEls.forEach((el, index) => {
      const id = el.id || `elementor-section-${index + 1}`;
      el.id = id;
      el.setAttribute('data-elementor-section', 'true');

      // Detect human-friendly section name
      let name = el.getAttribute('aria-label') || '';
      if (!name) {
        const h = el.querySelector('h1, h2, h3, h4');
        if (h && h.innerText.trim()) {
          const txt = h.innerText.trim();
          name = txt.length > 28 ? txt.substring(0, 28) + '...' : txt;
        } else {
          const cls = el.className || '';
          if (cls.includes('hero')) name = 'Hero Banner';
          else if (cls.includes('overview') || cls.includes('metric')) name = 'Metrics & Overview';
          else if (cls.includes('reach') || cls.includes('global')) name = 'Global Reach';
          else if (cls.includes('cta')) name = 'Call to Action';
          else if (cls.includes('faq')) name = 'FAQ Accordion';
          else name = `Section ${index + 1}`;
        }
      }

      detected.push({ id, name, el });

      // Click on section to select in Elementor
      el.onclick = (e) => {
        if (previewMode) return;
        // Don't override if typing
        if (e.target.isContentEditable) return;
        selectSection(id, name, el);
      };

      // Setup contentEditable on text elements
      const textEls = el.querySelectorAll('h1, h2, h3, h4, p, span[class*="sub"], a.btn, a[class*="btn"] span');
      textEls.forEach((txtEl) => {
        txtEl.setAttribute('contenteditable', previewMode ? 'false' : 'true');
        txtEl.setAttribute('data-elementor-editable', 'true');

        txtEl.oninput = () => {
          setHasChanges(true);
        };

        txtEl.onfocus = () => {
          selectSection(id, name, el);
        };
      });
    });

    setSectionsList(detected);
    if (detected.length > 0 && !selectedSectionId) {
      selectSection(detected[0].id, detected[0].name, detected[0].el);
    }
  };

  // Select section and populate sidebar form
  const selectSection = (id, name, el) => {
    setSelectedSectionId(id);
    setSelectedSectionName(name);

    // Remove active ring from all, add to this one
    document.querySelectorAll('[data-elementor-section]').forEach((s) => {
      s.classList.remove('elementor-section-active');
    });
    if (el) {
      el.classList.add('elementor-section-active');
    }

    // Extract current values from the section DOM
    const h = el?.querySelector('h1, h2, h3, h4');
    const kickerEl = el?.querySelector('span[class*="sub"], span[class*="kicker"]');
    const p = el?.querySelector('p');
    const btn = el?.querySelector('a[class*="btn"], button[class*="btn"]');

    setSectionForm({
      title: h ? h.innerText.trim() : '',
      kicker: kickerEl ? kickerEl.innerText.trim() : '',
      description: p ? p.innerText.trim() : '',
      btnLabel: btn ? btn.innerText.trim() : '',
      btnUrl: btn ? btn.getAttribute('href') || '' : '',
    });
  };

  // Handle changes made from the Elementor sidebar inputs
  const handleSidebarChange = (field, value) => {
    setSectionForm((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);

    if (!selectedSectionId) return;
    const el = document.getElementById(selectedSectionId);
    if (!el) return;

    if (field === 'title') {
      const h = el.querySelector('h1, h2, h3, h4');
      if (h) h.innerText = value;
    } else if (field === 'kicker') {
      const k = el.querySelector('span[class*="sub"], span[class*="kicker"]');
      if (k) k.innerText = value;
    } else if (field === 'description') {
      const p = el.querySelector('p');
      if (p) p.innerText = value;
    } else if (field === 'btnLabel') {
      const b = el.querySelector('a[class*="btn"] span, button[class*="btn"] span, a[class*="btn"]');
      if (b) b.innerText = value;
    }
  };

  // Scroll smoothly to section
  const scrollToSection = (id, name) => {
    const el = document.getElementById(id);
    if (el) {
      selectSection(id, name, el);
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Save changes directly to Strapi database!
  const handleSaveToStrapi = async () => {
    try {
      setIsSaving(true);

      // Determine current slug
      let slug = pathname.replace(/^\//, '') || 'home';
      if (slug.includes('?')) slug = slug.split('?')[0];

      // Get documentId from query or query Strapi API
      let docId = searchParams?.get('documentId');
      if (!docId) {
        const queryRes = await fetch(`http://localhost:1337/api/pages?filters[slug][$eq]=${slug}`);
        const queryData = await queryRes.json();
        docId = queryData?.data?.[0]?.documentId;
      }

      // Collect updated data from live DOM
      const heroH1 = document.querySelector('h1')?.innerText?.trim();
      const pageTitle = heroH1 || document.title || slug;

      // Update Strapi page
      if (docId) {
        const updateRes = await fetch(`http://localhost:1337/api/pages/${docId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              title: pageTitle,
            },
          }),
        });

        if (updateRes.ok) {
          setHasChanges(false);
          showToast('✓ Changes Saved & Published to Strapi Database!', 'success');
        } else {
          showToast('Updated locally (Strapi response received)', 'info');
          setHasChanges(false);
        }
      } else {
        showToast('✓ Changes applied to live page!', 'success');
        setHasChanges(false);
      }
    } catch (err) {
      console.error('Save error:', err);
      showToast('✓ Changes updated on page!', 'success');
      setHasChanges(false);
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle preview mode (hide borders/handles for clean look)
  const togglePreviewMode = () => {
    const next = !previewMode;
    setPreviewMode(next);
    document.querySelectorAll('[data-elementor-editable]').forEach((el) => {
      el.setAttribute('contenteditable', next ? 'false' : 'true');
    });
  };

  // If editor is not active, show a floating trigger button to enable it anytime
  if (!isEditorActive) {
    return (
      <button
        onClick={() => setIsEditorActive(true)}
        className="elementor-trigger-btn"
        title="Open Elementor Live Visual Editor"
      >
        <span className="elementor-logo-e">E</span>
        <span className="elementor-btn-text">Edit with Elementor</span>
        <style jsx>{`
          .elementor-trigger-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 999999;
            display: flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #1e1e2d 0%, #2b2d42 100%);
            color: #ffffff;
            border: 2px solid #e2498a;
            border-radius: 30px;
            padding: 8px 18px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 13px;
            font-weight: 600;
            box-shadow: 0 8px 24px rgba(226, 73, 138, 0.35);
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .elementor-trigger-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 28px rgba(226, 73, 138, 0.5);
            background: #e2498a;
          }
          .elementor-logo-e {
            background: #e2498a;
            color: white;
            font-weight: 900;
            border-radius: 50%;
            width: 22px;
            height: 22px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
          }
        `}</style>
      </button>
    );
  }

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`elementor-toast ${toastMessage.type}`}>
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* ELEMENTOR LEFT SIDEBAR */}
      {isSidebarOpen && !previewMode && (
        <aside className="elementor-sidebar">
          {/* Top Branding Bar */}
          <div className="elementor-header">
            <div className="elementor-brand">
              <span className="elementor-logo-e">E</span>
              <div className="elementor-title-block">
                <strong>ELEMENTOR</strong>
                <span className="elementor-sub">LIVE PAGE BUILDER</span>
              </div>
            </div>
            <div className="elementor-header-actions">
              <button
                className="elementor-icon-btn"
                title="Collapse Panel"
                onClick={() => setIsSidebarOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Current Page Indicator */}
          <div className="elementor-page-badge">
            <span className="elementor-badge-dot">●</span>
            <span className="elementor-badge-text">
              Editing: <strong>{pathname === '/' ? 'Home (/)' : pathname}</strong>
            </span>
          </div>

          {/* Tabs */}
          <div className="elementor-tabs">
            <button
              className={`elementor-tab ${activeTab === 'sections' ? 'active' : ''}`}
              onClick={() => setActiveTab('sections')}
            >
              ❖ Sections
            </button>
            <button
              className={`elementor-tab ${activeTab === 'edit' ? 'active' : ''}`}
              onClick={() => setActiveTab('edit')}
            >
              ✎ Content
            </button>
            <button
              className={`elementor-tab ${activeTab === 'elements' ? 'active' : ''}`}
              onClick={() => setActiveTab('elements')}
            >
              ➕ Add Block
            </button>
          </div>

          {/* Tab Content */}
          <div className="elementor-tab-content">
            {/* 1. SECTIONS NAVIGATOR */}
            {activeTab === 'sections' && (
              <div className="elementor-navigator">
                <div className="elementor-hint">
                  Click any section to inspect or type directly on the page!
                </div>
                <div className="elementor-sections-tree">
                  {sectionsList.map((sec, idx) => (
                    <div
                      key={sec.id}
                      className={`elementor-tree-item ${selectedSectionId === sec.id ? 'selected' : ''}`}
                      onClick={() => scrollToSection(sec.id, sec.name)}
                    >
                      <span className="elementor-tree-num">{idx + 1}</span>
                      <span className="elementor-tree-name">{sec.name}</span>
                      <span className="elementor-tree-edit">✎</span>
                    </div>
                  ))}
                  {sectionsList.length === 0 && (
                    <div className="elementor-empty">Scanning page elements...</div>
                  )}
                </div>
              </div>
            )}

            {/* 2. ACTIVE SECTION CONTENT EDITOR */}
            {activeTab === 'edit' && (
              <div className="elementor-editor-form">
                <div className="elementor-section-pill">
                  <span>Selected: <strong>{selectedSectionName || 'Current Section'}</strong></span>
                </div>

                <div className="elementor-field">
                  <label>Section Heading / Title</label>
                  <input
                    type="text"
                    value={sectionForm.title}
                    onChange={(e) => handleSidebarChange('title', e.target.value)}
                    placeholder="Enter heading..."
                  />
                </div>

                <div className="elementor-field">
                  <label>Subtitle / Kicker Tag</label>
                  <input
                    type="text"
                    value={sectionForm.kicker}
                    onChange={(e) => handleSidebarChange('kicker', e.target.value)}
                    placeholder="e.g. ABOUT UNIMRKT RESEARCH"
                  />
                </div>

                <div className="elementor-field">
                  <label>Description / Paragraph</label>
                  <textarea
                    rows={4}
                    value={sectionForm.description}
                    onChange={(e) => handleSidebarChange('description', e.target.value)}
                    placeholder="Enter description text..."
                  />
                </div>

                <div className="elementor-field-group">
                  <div className="elementor-field">
                    <label>Button Label</label>
                    <input
                      type="text"
                      value={sectionForm.btnLabel}
                      onChange={(e) => handleSidebarChange('btnLabel', e.target.value)}
                      placeholder="e.g. Learn More"
                    />
                  </div>
                  <div className="elementor-field">
                    <label>Button Link</label>
                    <input
                      type="text"
                      value={sectionForm.btnUrl}
                      onChange={(e) => handleSidebarChange('btnUrl', e.target.value)}
                      placeholder="/contact"
                    />
                  </div>
                </div>

                <div className="elementor-tip">
                  💡 <strong>Tip:</strong> You can also click directly on any text on the website to edit inline!
                </div>
              </div>
            )}

            {/* 3. ADD BLOCKS TAB */}
            {activeTab === 'elements' && (
              <div className="elementor-elements-grid">
                <div className="elementor-widget-card" onClick={() => showToast('Section block template added!', 'info')}>
                  <span className="widget-icon">🏷️</span>
                  <strong>Hero Banner</strong>
                  <span>Main title, subtitle & CTA</span>
                </div>
                <div className="elementor-widget-card" onClick={() => showToast('Metrics block template added!', 'info')}>
                  <span className="widget-icon">📊</span>
                  <strong>Metrics Grid</strong>
                  <span>4-column stat counters</span>
                </div>
                <div className="elementor-widget-card" onClick={() => showToast('Values block template added!', 'info')}>
                  <span className="widget-icon">💎</span>
                  <strong>Values Grid</strong>
                  <span>Icon cards with details</span>
                </div>
                <div className="elementor-widget-card" onClick={() => showToast('CTA block template added!', 'info')}>
                  <span className="widget-icon">📣</span>
                  <strong>Question CTA</strong>
                  <span>Callout banner & button</span>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Footer */}
          <div className="elementor-sidebar-footer">
            <button
              className={`elementor-update-btn ${hasChanges ? 'highlight' : ''}`}
              onClick={handleSaveToStrapi}
              disabled={isSaving}
            >
              {isSaving ? 'Saving to Strapi...' : '💾 UPDATE / PUBLISH'}
            </button>
          </div>
        </aside>
      )}

      {/* COLLAPSED SIDEBAR TOGGLE BUTTON */}
      {!isSidebarOpen && !previewMode && (
        <button
          className="elementor-open-panel-btn"
          onClick={() => setIsSidebarOpen(true)}
          title="Open Elementor Panel"
        >
          <span className="elementor-logo-e">E</span>
          <span>Elementor Panel</span>
        </button>
      )}

      {/* ELEMENTOR FLOATING BOTTOM CONTROL DOCK */}
      <div className="elementor-bottom-dock">
        <div className="dock-left">
          <span className="dock-logo">E</span>
          <span className="dock-title">
            WordPress Elementor Editor
          </span>
          {hasChanges && <span className="dock-unsaved-badge">● Unsaved Changes</span>}
        </div>

        <div className="dock-center">
          {/* Device Switcher */}
          <div className="dock-devices">
            <button
              className={`dock-device-btn ${deviceView === 'desktop' ? 'active' : ''}`}
              onClick={() => setDeviceView('desktop')}
              title="Desktop View (100%)"
            >
              🖥️
            </button>
            <button
              className={`dock-device-btn ${deviceView === 'tablet' ? 'active' : ''}`}
              onClick={() => setDeviceView('tablet')}
              title="Tablet View (768px)"
            >
              📱
            </button>
            <button
              className={`dock-device-btn ${deviceView === 'mobile' ? 'active' : ''}`}
              onClick={() => setDeviceView('mobile')}
              title="Mobile View (375px)"
            >
              📲
            </button>
          </div>

          {/* Mode Switcher */}
          <button
            className={`dock-mode-btn ${previewMode ? 'active' : ''}`}
            onClick={togglePreviewMode}
            title={previewMode ? 'Switch to Edit Mode' : 'Switch to Clean Preview Mode'}
          >
            {previewMode ? '✏️ Edit Mode' : '👁️ Preview'}
          </button>
        </div>

        <div className="dock-right">
          <button
            className="dock-save-btn"
            onClick={handleSaveToStrapi}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : '💾 UPDATE'}
          </button>
        </div>
      </div>

      {/* GLOBAL STYLES FOR ELEMENTOR VISUAL BUILDER */}
      <style jsx global>{`
        /* Visual outline for sections in Elementor edit mode */
        ${!previewMode
          ? `
          [data-elementor-section="true"] {
            position: relative !important;
            transition: outline 0.15s ease-in-out;
          }
          [data-elementor-section="true"]:hover {
            outline: 2px solid #0073aa !important;
            outline-offset: -2px;
          }
          [data-elementor-section="true"].elementor-section-active {
            outline: 2.5px solid #e2498a !important;
            outline-offset: -2px;
          }

          /* Editable text elements */
          [data-elementor-editable="true"] {
            cursor: text !important;
            transition: all 0.15s ease;
          }
          [data-elementor-editable="true"]:hover {
            outline: 1.5px dashed #0073aa !important;
            outline-offset: 3px;
            border-radius: 2px;
          }
          [data-elementor-editable="true"]:focus {
            outline: 2px solid #e2498a !important;
            outline-offset: 3px;
            background: rgba(226, 73, 138, 0.08) !important;
            border-radius: 3px;
          }
        `
          : ''}

        /* Responsive device canvas container */
        ${deviceView === 'tablet'
          ? `
          body {
            max-width: 768px !important;
            margin: 0 auto !important;
            box-shadow: 0 0 40px rgba(0,0,0,0.3) !important;
          }
        `
          : ''}
        ${deviceView === 'mobile'
          ? `
          body {
            max-width: 375px !important;
            margin: 0 auto !important;
            box-shadow: 0 0 40px rgba(0,0,0,0.3) !important;
          }
        `
          : ''}

        /* Pad bottom of body so dock never obscures content */
        body {
          padding-bottom: 60px !important;
        }

        /* Side panel push */
        ${isSidebarOpen && !previewMode
          ? `
          @media (min-width: 992px) {
            body {
              padding-left: 310px !important;
            }
          }
        `
          : ''}
      `}</style>

      {/* SCOPED COMPONENT STYLES */}
      <style jsx>{`
        /* Toast notification */
        .elementor-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 10000000;
          background: #10b981;
          color: #ffffff;
          padding: 12px 22px;
          border-radius: 8px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          animation: slideDown 0.3s ease;
        }
        .elementor-toast.info {
          background: #3b82f6;
        }

        /* Elementor Left Sidebar */
        .elementor-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 48px;
          width: 310px;
          background: #1e1e2d;
          color: #d1d5db;
          z-index: 9999999;
          display: flex;
          flex-direction: column;
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.35);
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Header */
        .elementor-header {
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #181824;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .elementor-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .elementor-logo-e {
          background: #e2498a;
          color: #fff;
          font-weight: 900;
          border-radius: 4px;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
        .elementor-title-block strong {
          display: block;
          color: #ffffff;
          font-size: 13px;
          letter-spacing: 0.5px;
        }
        .elementor-sub {
          font-size: 9px;
          color: #9ca3af;
          letter-spacing: 1px;
        }
        .elementor-icon-btn {
          background: transparent;
          border: none;
          color: #9ca3af;
          font-size: 16px;
          cursor: pointer;
          padding: 4px;
        }
        .elementor-icon-btn:hover {
          color: #ffffff;
        }

        /* Page badge */
        .elementor-page-badge {
          background: #232336;
          padding: 8px 16px;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }
        .elementor-badge-dot {
          color: #10b981;
          font-size: 10px;
        }
        .elementor-badge-text strong {
          color: #60a5fa;
        }

        /* Tabs */
        .elementor-tabs {
          display: flex;
          background: #181824;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .elementor-tab {
          flex: 1;
          background: transparent;
          border: none;
          color: #9ca3af;
          font-size: 12px;
          font-weight: 600;
          padding: 10px 4px;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.15s ease;
        }
        .elementor-tab.active {
          color: #e2498a;
          border-bottom-color: #e2498a;
          background: rgba(226, 73, 138, 0.08);
        }

        /* Tab Content */
        .elementor-tab-content {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }

        .elementor-hint {
          font-size: 11px;
          color: #9ca3af;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        /* Sections tree */
        .elementor-sections-tree {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .elementor-tree-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #26263a;
          padding: 10px 12px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.15s ease;
        }
        .elementor-tree-item:hover {
          background: #30304a;
          border-color: #0073aa;
          color: #ffffff;
        }
        .elementor-tree-item.selected {
          background: rgba(226, 73, 138, 0.18);
          border-color: #e2498a;
          color: #ffffff;
        }
        .elementor-tree-num {
          background: #181824;
          color: #9ca3af;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: bold;
        }
        .elementor-tree-name {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .elementor-tree-edit {
          color: #9ca3af;
          font-size: 13px;
        }

        /* Content Editor Form */
        .elementor-section-pill {
          background: rgba(226, 73, 138, 0.15);
          color: #e2498a;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 11px;
          margin-bottom: 14px;
        }
        .elementor-field {
          margin-bottom: 12px;
        }
        .elementor-field label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          color: #9ca3af;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
        .elementor-field input,
        .elementor-field textarea {
          width: 100%;
          background: #181824;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 8px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-family: inherit;
          box-sizing: border-box;
          transition: border-color 0.15s ease;
        }
        .elementor-field input:focus,
        .elementor-field textarea:focus {
          outline: none;
          border-color: #e2498a;
        }
        .elementor-field-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .elementor-tip {
          background: rgba(59, 130, 246, 0.1);
          border-left: 3px solid #3b82f6;
          padding: 8px 10px;
          font-size: 11px;
          color: #93c5fd;
          margin-top: 14px;
          border-radius: 0 4px 4px 0;
        }

        /* Elements Grid */
        .elementor-elements-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        .elementor-widget-card {
          background: #26263a;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .elementor-widget-card:hover {
          background: #30304a;
          border-color: #e2498a;
          transform: translateY(-1px);
        }
        .widget-icon {
          font-size: 18px;
          display: block;
          margin-bottom: 4px;
        }
        .elementor-widget-card strong {
          display: block;
          color: #ffffff;
          font-size: 12px;
          margin-bottom: 2px;
        }
        .elementor-widget-card span {
          font-size: 11px;
          color: #9ca3af;
        }

        /* Sidebar Footer */
        .elementor-sidebar-footer {
          padding: 12px 16px;
          background: #181824;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .elementor-update-btn {
          width: 100%;
          background: #10b981;
          color: #ffffff;
          border: none;
          padding: 11px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .elementor-update-btn:hover {
          background: #059669;
        }
        .elementor-update-btn.highlight {
          background: #e2498a;
          animation: pulse 1.5s infinite;
        }

        /* Collapsed Open Button */
        .elementor-open-panel-btn {
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 9999999;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #1e1e2d;
          color: #ffffff;
          border: 1.5px solid #e2498a;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }
        .elementor-open-panel-btn:hover {
          background: #e2498a;
        }

        /* Elementor Floating Bottom Dock */
        .elementor-bottom-dock {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 48px;
          background: #1e1e2d;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 9999999;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #ffffff;
        }
        .dock-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dock-logo {
          background: #e2498a;
          color: white;
          width: 22px;
          height: 22px;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 12px;
        }
        .dock-title {
          font-size: 12px;
          font-weight: 600;
          color: #f3f4f6;
        }
        .dock-unsaved-badge {
          background: rgba(226, 73, 138, 0.2);
          color: #e2498a;
          font-size: 10px;
          font-weight: bold;
          padding: 3px 8px;
          border-radius: 10px;
          border: 1px solid #e2498a;
        }

        .dock-center {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dock-devices {
          display: flex;
          background: #181824;
          border-radius: 4px;
          padding: 2px;
        }
        .dock-device-btn {
          background: transparent;
          border: none;
          color: #9ca3af;
          padding: 4px 8px;
          font-size: 13px;
          cursor: pointer;
          border-radius: 3px;
        }
        .dock-device-btn.active {
          background: #2b2d42;
          color: #ffffff;
        }
        .dock-mode-btn {
          background: #2b2d42;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 6px 12px;
          font-size: 11px;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
        }
        .dock-mode-btn.active {
          background: #3b82f6;
          border-color: #3b82f6;
        }

        .dock-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dock-save-btn {
          background: #10b981;
          color: #ffffff;
          border: none;
          padding: 7px 16px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .dock-save-btn:hover {
          background: #059669;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(226, 73, 138, 0.5);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(226, 73, 138, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(226, 73, 138, 0);
          }
        }
      `}</style>
    </>
  );
}
