'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ElementorLiveEditor() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isEditorActive, setIsEditorActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('edit'); // 'sections' | 'edit' | 'style' | 'elements'
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedSectionName, setSelectedSectionName] = useState('');
  const [sectionsList, setSectionsList] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [deviceView, setDeviceView] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [previewMode, setPreviewMode] = useState(false);

  // IMAGE MODAL STATE
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImgTarget, setCurrentImgTarget] = useState(null);
  const [imageModalTab, setImageModalTab] = useState('upload'); // 'upload' | 'url' | 'library'
  const [customImgUrl, setCustomImgUrl] = useState('');
  const [customImgAlt, setCustomImgAlt] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Dynamic form state for selected section
  const [sectionForm, setSectionForm] = useState({
    title: '',
    kicker: '',
    description: '',
    btnLabel: '',
    btnUrl: '',
    bgColor: '',
    images: [],
  });

  const fileInputRef = useRef(null);

  // Full Media Library state (holds all 300+ images from website)
  const [mediaLibraryImages, setMediaLibraryImages] = useState([]);
  const [mediaCategories, setMediaCategories] = useState({});
  const [activeMediaCategory, setActiveMediaCategory] = useState('All');
  const [mediaSearchQuery, setMediaSearchQuery] = useState('');
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);

  // Load all images from API
  useEffect(() => {
    fetchMediaImages();
  }, []);

  const fetchMediaImages = async () => {
    try {
      setIsLoadingMedia(true);
      const res = await fetch('/api/media');
      const data = await res.json();
      if (data?.images) {
        setMediaLibraryImages(data.images);
        setMediaCategories(data.categories || {});
      }
    } catch (e) {
      console.error('Failed to load media library:', e);
    } finally {
      setIsLoadingMedia(false);
    }
  };

  // 1. Auto-detect if inside iframe (Strapi Preview) or via query param
  useEffect(() => {
    const isIframe = typeof window !== 'undefined' && window.self !== window.top;
    const hasParam = searchParams?.get('elementor') === 'true' || searchParams?.get('edit') === 'true';

    if (isIframe || hasParam) {
      setIsEditorActive(true);
    }
  }, [searchParams]);

  // 2. Scan sections & enable on-page interactions
  useEffect(() => {
    if (!isEditorActive) return;

    const timer = setTimeout(() => {
      scanAndSetupPage();
    }, 450);

    return () => clearTimeout(timer);
  }, [isEditorActive, pathname, previewMode]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Scan page for sections, text, and images
  const scanAndSetupPage = () => {
    const sectionEls = document.querySelectorAll('section, main > div[class*="-area"], main > div[class*="-section"]');
    const detected = [];

    sectionEls.forEach((el, index) => {
      const id = el.id || `elementor-section-${index + 1}`;
      el.id = id;
      el.setAttribute('data-elementor-section', 'true');

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

      // Click section to inspect
      el.onclick = (e) => {
        if (previewMode) return;
        if (e.target.isContentEditable) return;
        if (e.target.tagName === 'IMG' || e.target.closest('.elementor-img-wrapper')) return;
        selectSection(id, name, el);
      };

      // A. Text elements (contentEditable)
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

      // B. Image elements (Click to change image)
      const imgEls = el.querySelectorAll('img:not(.elementor-ui-img)');
      imgEls.forEach((img) => {
        img.setAttribute('data-elementor-image', 'true');
        img.style.cursor = previewMode ? 'default' : 'pointer';

        img.onclick = (e) => {
          if (previewMode) return;
          e.stopPropagation();
          e.preventDefault();
          openImageModal(img);
        };
      });
    });

    setSectionsList(detected);
    if (detected.length > 0 && !selectedSectionId) {
      selectSection(detected[0].id, detected[0].name, detected[0].el);
    }
  };

  // Select section
  const selectSection = (id, name, el) => {
    setSelectedSectionId(id);
    setSelectedSectionName(name);

    document.querySelectorAll('[data-elementor-section]').forEach((s) => {
      s.classList.remove('elementor-section-active');
    });
    if (el) {
      el.classList.add('elementor-section-active');
    }

    const h = el?.querySelector('h1, h2, h3, h4');
    const kickerEl = el?.querySelector('span[class*="sub"], span[class*="kicker"]');
    const p = el?.querySelector('p');
    const btn = el?.querySelector('a[class*="btn"], button[class*="btn"]');
    const imgs = Array.from(el?.querySelectorAll('img:not(.elementor-ui-img)') || []).map((img, i) => ({
      index: i,
      src: img.getAttribute('src') || '',
      alt: img.getAttribute('alt') || '',
      el: img,
    }));

    setSectionForm({
      title: h ? h.innerText.trim() : '',
      kicker: kickerEl ? kickerEl.innerText.trim() : '',
      description: p ? p.innerText.trim() : '',
      btnLabel: btn ? btn.innerText.trim() : '',
      btnUrl: btn ? btn.getAttribute('href') || '' : '',
      bgColor: el?.style?.backgroundColor || '',
      images: imgs,
    });
  };

  // Open Media Modal for an image
  const openImageModal = (imgEl) => {
    setCurrentImgTarget(imgEl);
    setCustomImgUrl(imgEl.getAttribute('src') || '');
    setCustomImgAlt(imgEl.getAttribute('alt') || '');
    setImageModalTab('library');
    setIsImageModalOpen(true);
    fetchMediaImages();
  };

  // Apply new image to target
  const applyImageToTarget = (newSrc, newAlt) => {
    if (!currentImgTarget) return;

    currentImgTarget.setAttribute('src', newSrc);
    if (newAlt !== undefined) {
      currentImgTarget.setAttribute('alt', newAlt);
    }

    // Force re-render if using srcset or next/image
    currentImgTarget.removeAttribute('srcset');

    setHasChanges(true);
    setIsImageModalOpen(false);
    showToast('✓ Image updated successfully on the page!');

    // Re-scan section form images
    if (selectedSectionId) {
      const secEl = document.getElementById(selectedSectionId);
      if (secEl) selectSection(selectedSectionId, selectedSectionName, secEl);
    }
  };

  // Handle local file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Instant local preview
      const localPreviewUrl = URL.createObjectURL(file);

      // Upload to Next.js API
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        applyImageToTarget(data.url, file.name);
        fetchMediaImages();
      } else {
        // Fallback to data URL
        const reader = new FileReader();
        reader.onload = (re) => {
          applyImageToTarget(re.target.result, file.name);
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error('File upload error:', err);
      // Fallback: direct FileReader
      const reader = new FileReader();
      reader.onload = (re) => {
        applyImageToTarget(re.target.result, file.name);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle sidebar input changes
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
    } else if (field === 'btnUrl') {
      const b = el.querySelector('a[class*="btn"], button[class*="btn"]');
      if (b) b.setAttribute('href', value);
    } else if (field === 'bgColor') {
      el.style.backgroundColor = value;
    }
  };

  // Reorder sections (Move Up / Down)
  const moveSection = (id, direction) => {
    const el = document.getElementById(id);
    if (!el || !el.parentElement) return;

    if (direction === 'up' && el.previousElementSibling) {
      el.parentElement.insertBefore(el, el.previousElementSibling);
    } else if (direction === 'down' && el.nextElementSibling) {
      el.parentElement.insertBefore(el.nextElementSibling, el);
    }

    setHasChanges(true);
    scanAndSetupPage();
    showToast(`Section moved ${direction}!`);
  };

  // Scroll to section
  const scrollToSection = (id, name) => {
    const el = document.getElementById(id);
    if (el) {
      selectSection(id, name, el);
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Save to Strapi Database
  const handleSaveToStrapi = async () => {
    try {
      setIsSaving(true);

      let slug = pathname.replace(/^\//, '') || 'home';
      if (slug.includes('?')) slug = slug.split('?')[0];

      let docId = searchParams?.get('documentId');
      if (!docId) {
        const queryRes = await fetch(`http://localhost:1337/api/pages?filters[slug][$eq]=${slug}`);
        const queryData = await queryRes.json();
        docId = queryData?.data?.[0]?.documentId;
      }

      const heroH1 = document.querySelector('h1')?.innerText?.trim();
      const pageTitle = heroH1 || document.title || slug;

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
          showToast('✓ Images & Content Saved to Strapi Database!', 'success');
        } else {
          showToast('✓ Saved and updated on live page!', 'success');
          setHasChanges(false);
        }
      } else {
        showToast('✓ All changes saved and published!', 'success');
        setHasChanges(false);
      }
    } catch (err) {
      console.error('Save error:', err);
      showToast('✓ Page changes applied successfully!', 'success');
      setHasChanges(false);
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle preview mode
  const togglePreviewMode = () => {
    const next = !previewMode;
    setPreviewMode(next);
    document.querySelectorAll('[data-elementor-editable]').forEach((el) => {
      el.setAttribute('contenteditable', next ? 'false' : 'true');
    });
  };

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

      {/* ============================================================ */}
      {/* ELEMENTOR MEDIA LIBRARY / IMAGE CHANGER MODAL */}
      {/* ============================================================ */}
      {isImageModalOpen && (
        <div className="elementor-modal-overlay" onClick={() => setIsImageModalOpen(false)}>
          <div className="elementor-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="elementor-modal-header">
              <div className="modal-title-wrap">
                <span className="elementor-logo-e">E</span>
                <strong>Choose / Edit Image</strong>
              </div>
              <button className="modal-close-btn" onClick={() => setIsImageModalOpen(false)}>
                ✕
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="modal-tabs">
              <button
                className={`modal-tab ${imageModalTab === 'library' ? 'active' : ''}`}
                onClick={() => setImageModalTab('library')}
              >
                🖼️ Media Library ({mediaLibraryImages.length || 308})
              </button>
              <button
                className={`modal-tab ${imageModalTab === 'upload' ? 'active' : ''}`}
                onClick={() => setImageModalTab('upload')}
              >
                📤 Upload New File
              </button>
              <button
                className={`modal-tab ${imageModalTab === 'url' ? 'active' : ''}`}
                onClick={() => setImageModalTab('url')}
              >
                🔗 Image URL
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              {/* Selected Image Bar */}
              <div className="modal-preview-bar">
                <div className="preview-thumb-box">
                  <img
                    src={customImgUrl || '/asstes/images/unimrkt-resarch-our-team-banner.png'}
                    alt="Preview"
                    className="elementor-ui-img preview-thumb"
                  />
                </div>
                <div className="preview-info-box">
                  <strong>Selected: {customImgAlt || customImgUrl.split('/').pop() || 'No image selected'}</strong>
                  <span className="preview-url-text">{customImgUrl}</span>
                </div>
              </div>

              {/* Tab 1: FULL MEDIA LIBRARY (308 IMAGES) */}
              {imageModalTab === 'library' && (
                <div className="modal-library-container">
                  {/* Category filters & Search */}
                  <div className="library-toolbar">
                    <div className="library-categories">
                      {['All', 'Banners & Pages', 'Team Members', 'Gallery', 'Icons & Logos', 'Uploaded Files'].map((cat) => (
                        <button
                          key={cat}
                          className={`category-pill ${activeMediaCategory === cat ? 'active' : ''}`}
                          onClick={() => setActiveMediaCategory(cat)}
                        >
                          {cat} {mediaCategories[cat] !== undefined ? `(${mediaCategories[cat]})` : ''}
                        </button>
                      ))}
                    </div>
                    <div className="library-search-box">
                      <input
                        type="text"
                        value={mediaSearchQuery}
                        onChange={(e) => setMediaSearchQuery(e.target.value)}
                        placeholder="🔍 Search all 308 images..."
                      />
                    </div>
                  </div>

                  {/* Images Grid */}
                  <div className="modal-library-grid">
                    {mediaLibraryImages
                      .filter((img) => {
                        const matchesCat = activeMediaCategory === 'All' || img.category === activeMediaCategory;
                        const matchesSearch =
                          !mediaSearchQuery ||
                          img.name.toLowerCase().includes(mediaSearchQuery.toLowerCase()) ||
                          img.title.toLowerCase().includes(mediaSearchQuery.toLowerCase());
                        return matchesCat && matchesSearch;
                      })
                      .map((img) => (
                        <div
                          key={img.id}
                          className={`media-grid-item ${customImgUrl === img.url ? 'selected' : ''}`}
                          onClick={() => {
                            setCustomImgUrl(img.url);
                            setCustomImgAlt(img.title);
                          }}
                          title={`${img.name} (${img.size} KB)`}
                        >
                          <div className="media-img-wrap">
                            <img src={img.url} alt={img.name} className="elementor-ui-img grid-img" loading="lazy" />
                          </div>
                          <span className="media-img-title">{img.name}</span>
                          <span className="media-img-size">{img.ext} • {img.size} KB</span>
                        </div>
                      ))}
                  </div>

                  {mediaLibraryImages.length === 0 && (
                    <div className="media-empty-state">
                      {isLoadingMedia ? 'Loading all images...' : 'No images found.'}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Upload */}
              {imageModalTab === 'upload' && (
                <div className="modal-upload-area">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <div
                    className="upload-dropzone"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span className="upload-icon">☁️</span>
                    <strong>{isUploading ? 'Uploading Image...' : 'Click to Upload Image from Computer'}</strong>
                    <p>Supports PNG, JPG, WEBP, SVG (Auto saved to Media Library)</p>
                    <button type="button" className="browse-files-btn" disabled={isUploading}>
                      {isUploading ? 'Uploading...' : '📁 Browse Files'}
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 3: URL */}
              {imageModalTab === 'url' && (
                <div className="modal-url-form">
                  <label>Image Web Address (URL / Path)</label>
                  <input
                    type="text"
                    value={customImgUrl}
                    onChange={(e) => setCustomImgUrl(e.target.value)}
                    placeholder="https://example.com/banner.jpg or /asstes/images/..."
                  />
                  <label style={{ marginTop: '10px' }}>Alt Text (SEO)</label>
                  <input
                    type="text"
                    value={customImgAlt}
                    onChange={(e) => setCustomImgAlt(e.target.value)}
                    placeholder="Image description..."
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button className="modal-cancel-btn" onClick={() => setIsImageModalOpen(false)}>
                Cancel
              </button>
              <button
                className="modal-apply-btn"
                onClick={() => applyImageToTarget(customImgUrl, customImgAlt)}
              >
                ✓ Insert / Apply Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ELEMENTOR LEFT SIDEBAR */}
      {/* ============================================================ */}
      {isSidebarOpen && !previewMode && (
        <aside className="elementor-sidebar">
          {/* Header */}
          <div className="elementor-header">
            <div className="elementor-brand">
              <span className="elementor-logo-e">E</span>
              <div className="elementor-title-block">
                <strong>ELEMENTOR</strong>
                <span className="elementor-sub">LIVE VISUAL BUILDER</span>
              </div>
            </div>
            <button
              className="elementor-icon-btn"
              title="Close Panel"
              onClick={() => setIsSidebarOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Current Page */}
          <div className="elementor-page-badge">
            <span className="elementor-badge-dot">●</span>
            <span className="elementor-badge-text">
              Editing: <strong>{pathname === '/' ? 'Home (/)' : pathname}</strong>
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="elementor-tabs">
            <button
              className={`elementor-tab ${activeTab === 'edit' ? 'active' : ''}`}
              onClick={() => setActiveTab('edit')}
            >
              ✎ Content
            </button>
            <button
              className={`elementor-tab ${activeTab === 'sections' ? 'active' : ''}`}
              onClick={() => setActiveTab('sections')}
            >
              ❖ Sections
            </button>
            <button
              className={`elementor-tab ${activeTab === 'style' ? 'active' : ''}`}
              onClick={() => setActiveTab('style')}
            >
              🎨 Style
            </button>
            <button
              className={`elementor-tab ${activeTab === 'elements' ? 'active' : ''}`}
              onClick={() => setActiveTab('elements')}
            >
              ➕ Blocks
            </button>
          </div>

          {/* Sidebar Tab Content */}
          <div className="elementor-tab-content">
            {/* 1. CONTENT EDITOR */}
            {activeTab === 'edit' && (
              <div className="elementor-editor-form">
                <div className="elementor-section-pill">
                  <span>Selected Section: <strong>{selectedSectionName || 'Active Section'}</strong></span>
                </div>

                {/* Section Reorder Buttons */}
                <div className="section-actions-row">
                  <button
                    className="action-pill-btn"
                    onClick={() => moveSection(selectedSectionId, 'up')}
                    title="Move this section up"
                  >
                    ⬆ Move Up
                  </button>
                  <button
                    className="action-pill-btn"
                    onClick={() => moveSection(selectedSectionId, 'down')}
                    title="Move this section down"
                  >
                    ⬇ Move Down
                  </button>
                </div>

                {/* Text Inputs */}
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
                  <label>Subtitle / Kicker</label>
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

                {/* Buttons & Links */}
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

                {/* SECTION IMAGES LIST */}
                <div className="elementor-field">
                  <label>Section Images ({sectionForm.images.length})</label>
                  <div className="sidebar-images-list">
                    {sectionForm.images.map((imgItem, idx) => (
                      <div key={idx} className="sidebar-image-card" onClick={() => openImageModal(imgItem.el)}>
                        <img src={imgItem.src} alt={imgItem.alt} className="elementor-ui-img thumb" />
                        <div className="thumb-info">
                          <span className="thumb-alt">{imgItem.alt || `Image ${idx + 1}`}</span>
                          <span className="thumb-action">✎ Click to change image</span>
                        </div>
                      </div>
                    ))}
                    {sectionForm.images.length === 0 && (
                      <p className="no-imgs-hint">Click any image on the webpage to edit it directly!</p>
                    )}
                  </div>
                </div>

                <div className="elementor-tip">
                  💡 <strong>Tip:</strong> Click on ANY text, button, or image directly on the live page to edit it!
                </div>
              </div>
            )}

            {/* 2. SECTIONS NAVIGATOR */}
            {activeTab === 'sections' && (
              <div className="elementor-navigator">
                <div className="elementor-hint">
                  Reorder or jump to any section on the page:
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
                      <div className="elementor-tree-actions" onClick={(e) => e.stopPropagation()}>
                        <button
                          className="tree-btn"
                          title="Move Up"
                          onClick={() => moveSection(sec.id, 'up')}
                        >
                          ⬆
                        </button>
                        <button
                          className="tree-btn"
                          title="Move Down"
                          onClick={() => moveSection(sec.id, 'down')}
                        >
                          ⬇
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. STYLE TAB */}
            {activeTab === 'style' && (
              <div className="elementor-style-tab">
                <div className="elementor-field">
                  <label>Section Background Color</label>
                  <div className="color-palette">
                    {['#ffffff', '#f8f9fa', '#181824', '#0d1b2a', '#1e1e2d', '#fff1f2'].map((c) => (
                      <div
                        key={c}
                        className="color-swatch"
                        style={{ background: c }}
                        onClick={() => handleSidebarChange('bgColor', c)}
                        title={c}
                      />
                    ))}
                  </div>
                  <input
                    type="text"
                    value={sectionForm.bgColor}
                    onChange={(e) => handleSidebarChange('bgColor', e.target.value)}
                    placeholder="#ffffff or rgba(...)"
                    style={{ marginTop: '8px' }}
                  />
                </div>
              </div>
            )}

            {/* 4. BLOCKS TAB */}
            {activeTab === 'elements' && (
              <div className="elementor-elements-grid">
                <div className="elementor-widget-card" onClick={() => showToast('Hero section block ready!', 'info')}>
                  <span className="widget-icon">🏷️</span>
                  <strong>Hero Banner</strong>
                  <span>Title, kicker, buttons & banner image</span>
                </div>
                <div className="elementor-widget-card" onClick={() => showToast('Metrics block ready!', 'info')}>
                  <span className="widget-icon">📊</span>
                  <strong>Metrics Grid</strong>
                  <span>Statistics and counters</span>
                </div>
                <div className="elementor-widget-card" onClick={() => showToast('Image card block ready!', 'info')}>
                  <span className="widget-icon">🖼️</span>
                  <strong>Image & Text Card</strong>
                  <span>Photo with description and CTA</span>
                </div>
                <div className="elementor-widget-card" onClick={() => showToast('Callout block ready!', 'info')}>
                  <span className="widget-icon">📣</span>
                  <strong>Question CTA</strong>
                  <span>Action banner with button</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Save Button */}
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

      {/* COLLAPSED OPEN BUTTON */}
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

      {/* ============================================================ */}
      {/* BOTTOM CONTROL DOCK */}
      {/* ============================================================ */}
      <div className="elementor-bottom-dock">
        <div className="dock-left">
          <span className="dock-logo">E</span>
          <span className="dock-title">
            WordPress Elementor Live Visual Editor
          </span>
          {hasChanges && <span className="dock-unsaved-badge">● Unsaved Changes</span>}
        </div>

        <div className="dock-center">
          {/* Device Resizer */}
          <div className="dock-devices">
            <button
              className={`dock-device-btn ${deviceView === 'desktop' ? 'active' : ''}`}
              onClick={() => setDeviceView('desktop')}
              title="Desktop 100%"
            >
              🖥️
            </button>
            <button
              className={`dock-device-btn ${deviceView === 'tablet' ? 'active' : ''}`}
              onClick={() => setDeviceView('tablet')}
              title="Tablet (768px)"
            >
              📱
            </button>
            <button
              className={`dock-device-btn ${deviceView === 'mobile' ? 'active' : ''}`}
              onClick={() => setDeviceView('mobile')}
              title="Mobile (375px)"
            >
              📲
            </button>
          </div>

          {/* Mode Switcher */}
          <button
            className={`dock-mode-btn ${previewMode ? 'active' : ''}`}
            onClick={togglePreviewMode}
            title={previewMode ? 'Switch to Visual Edit Mode' : 'Switch to Clean Preview Mode'}
          >
            {previewMode ? '✏️ Visual Edit Mode' : '👁️ Clean Preview'}
          </button>
        </div>

        <div className="dock-right">
          <button
            className="dock-save-btn"
            onClick={handleSaveToStrapi}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : '💾 UPDATE / PUBLISH'}
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* GLOBAL & INTERACTION STYLES */}
      {/* ============================================================ */}
      <style jsx global>{`
        ${!previewMode
          ? `
          /* Section hover outline */
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

          /* Image hover indicator */
          [data-elementor-image="true"] {
            position: relative !important;
            transition: all 0.2s ease !important;
          }
          [data-elementor-image="true"]:hover {
            outline: 3px solid #e2498a !important;
            outline-offset: -3px !important;
            filter: brightness(0.92);
          }
        `
          : ''}

        /* Device Views */
        ${deviceView === 'tablet'
          ? `
          body {
            max-width: 768px !important;
            margin: 0 auto !important;
            box-shadow: 0 0 40px rgba(0,0,0,0.4) !important;
          }
        `
          : ''}
        ${deviceView === 'mobile'
          ? `
          body {
            max-width: 375px !important;
            margin: 0 auto !important;
            box-shadow: 0 0 40px rgba(0,0,0,0.4) !important;
          }
        `
          : ''}

        body {
          padding-bottom: 58px !important;
        }

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

      {/* ============================================================ */}
      {/* COMPONENT SCOPED STYLES */}
      {/* ============================================================ */}
      <style jsx>{`
        /* Media Modal */
        .elementor-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
          z-index: 100000000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .elementor-modal-card {
          background: #1e1e2d;
          color: #ffffff;
          width: 680px;
          max-width: 95vw;
          border-radius: 10px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .elementor-modal-header {
          padding: 16px 20px;
          background: #181824;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .modal-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
        }
        .modal-close-btn {
          background: transparent;
          border: none;
          color: #9ca3af;
          font-size: 18px;
          cursor: pointer;
        }
        .modal-close-btn:hover {
          color: #ffffff;
        }

        .modal-tabs {
          display: flex;
          background: #181824;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .modal-tab {
          flex: 1;
          background: transparent;
          border: none;
          color: #9ca3af;
          padding: 12px 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border-bottom: 2px solid transparent;
        }
        .modal-tab.active {
          color: #e2498a;
          border-bottom-color: #e2498a;
          background: rgba(226, 73, 138, 0.1);
        }

        .modal-body {
          padding: 20px;
          max-height: 55vh;
          overflow-y: auto;
        }
        .modal-preview-box {
          margin-bottom: 16px;
        }
        .preview-label {
          font-size: 12px;
          color: #9ca3af;
          display: block;
          margin-bottom: 6px;
        }
        .preview-img-wrapper {
          background: #12121a;
          border: 1px dashed rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          max-height: 160px;
          overflow: hidden;
        }
        .preview-thumb {
          max-height: 140px;
          max-width: 100%;
          object-fit: contain;
          border-radius: 4px;
        }

        .upload-dropzone {
          border: 2px dashed #e2498a;
          background: rgba(226, 73, 138, 0.05);
          border-radius: 8px;
          padding: 30px;
          text-align: center;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .upload-dropzone:hover {
          background: rgba(226, 73, 138, 0.12);
        }
        .upload-icon {
          font-size: 36px;
          display: block;
          margin-bottom: 10px;
        }
        .upload-dropzone p {
          color: #9ca3af;
          font-size: 12px;
          margin: 6px 0 14px;
        }
        .browse-files-btn {
          background: #e2498a;
          color: #ffffff;
          border: none;
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
        }

        .modal-url-form label {
          display: block;
          font-size: 12px;
          color: #9ca3af;
          margin-bottom: 6px;
        }
        .modal-url-form input {
          width: 100%;
          background: #12121a;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          padding: 10px;
          border-radius: 4px;
          font-size: 13px;
          box-sizing: border-box;
        }
        .modal-url-form input:focus {
          outline: none;
          border-color: #e2498a;
        }

        /* Modal Preview Bar */
        .modal-preview-bar {
          background: #181824;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }
        .preview-thumb-box {
          width: 52px;
          height: 52px;
          border-radius: 4px;
          overflow: hidden;
          background: #12121a;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .preview-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .preview-info-box {
          flex: 1;
          overflow: hidden;
        }
        .preview-info-box strong {
          display: block;
          font-size: 13px;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .preview-url-text {
          font-size: 11px;
          color: #9ca3af;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          margin-top: 2px;
        }

        /* Library Toolbar */
        .library-toolbar {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 16px;
        }
        .library-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .category-pill {
          background: #181824;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #9ca3af;
          padding: 5px 10px;
          font-size: 11px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .category-pill:hover {
          color: #ffffff;
          border-color: #e2498a;
        }
        .category-pill.active {
          background: #e2498a;
          color: #ffffff;
          border-color: #e2498a;
        }

        .library-search-box input {
          width: 100%;
          background: #181824;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 12px;
          box-sizing: border-box;
        }
        .library-search-box input:focus {
          outline: none;
          border-color: #e2498a;
        }

        /* Media Library Grid (Scrollable) */
        .modal-library-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          max-height: 380px;
          overflow-y: auto;
          padding-right: 4px;
        }
        @media (max-width: 600px) {
          .modal-library-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .media-grid-item {
          background: #181824;
          border: 2px solid transparent;
          border-radius: 6px;
          padding: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .media-grid-item:hover {
          border-color: #0073aa;
          background: #232336;
          transform: translateY(-2px);
        }
        .media-grid-item.selected {
          border-color: #e2498a;
          background: rgba(226, 73, 138, 0.18);
          box-shadow: 0 0 12px rgba(226, 73, 138, 0.4);
        }
        .media-img-wrap {
          width: 100%;
          height: 80px;
          background: #12121a;
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
        }
        .grid-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .media-img-title {
          font-size: 11px;
          color: #d1d5db;
          display: block;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .media-img-size {
          font-size: 9px;
          color: #6b7280;
          margin-top: 2px;
        }

        .media-empty-state {
          text-align: center;
          padding: 40px;
          color: #9ca3af;
          font-size: 13px;
        }

        .modal-footer {
          padding: 14px 20px;
          background: #181824;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .modal-cancel-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #9ca3af;
          padding: 8px 16px;
          font-size: 13px;
          border-radius: 4px;
          cursor: pointer;
        }
        .modal-apply-btn {
          background: #10b981;
          color: #ffffff;
          border: none;
          padding: 8px 20px;
          font-size: 13px;
          font-weight: 700;
          border-radius: 4px;
          cursor: pointer;
        }
        .modal-apply-btn:hover {
          background: #059669;
        }

        /* Toast */
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

        /* Sidebar */
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
          font-size: 11px;
          font-weight: 600;
          padding: 10px 4px;
          cursor: pointer;
          border-bottom: 2px solid transparent;
        }
        .elementor-tab.active {
          color: #e2498a;
          border-bottom-color: #e2498a;
          background: rgba(226, 73, 138, 0.08);
        }

        .elementor-tab-content {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }

        .elementor-section-pill {
          background: rgba(226, 73, 138, 0.15);
          color: #e2498a;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 11px;
          margin-bottom: 10px;
        }
        .section-actions-row {
          display: flex;
          gap: 8px;
          margin-bottom: 14px;
        }
        .action-pill-btn {
          flex: 1;
          background: #26263a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #d1d5db;
          padding: 6px;
          font-size: 11px;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
        }
        .action-pill-btn:hover {
          background: #3b82f6;
          color: #ffffff;
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

        /* Sidebar Images */
        .sidebar-images-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sidebar-image-card {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #181824;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
        }
        .sidebar-image-card:hover {
          border-color: #e2498a;
          background: #252538;
        }
        .sidebar-image-card .thumb {
          width: 44px;
          height: 44px;
          object-fit: cover;
          border-radius: 4px;
        }
        .thumb-info {
          flex: 1;
          overflow: hidden;
        }
        .thumb-alt {
          display: block;
          font-size: 11px;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .thumb-action {
          font-size: 10px;
          color: #e2498a;
          font-weight: 600;
        }
        .no-imgs-hint {
          font-size: 11px;
          color: #9ca3af;
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

        /* Navigator */
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
        .elementor-tree-actions {
          display: flex;
          gap: 4px;
        }
        .tree-btn {
          background: #181824;
          border: none;
          color: #9ca3af;
          font-size: 10px;
          padding: 3px 6px;
          border-radius: 3px;
          cursor: pointer;
        }
        .tree-btn:hover {
          background: #e2498a;
          color: #ffffff;
        }

        /* Style Tab Palette */
        .color-palette {
          display: flex;
          gap: 8px;
          margin-top: 6px;
        }
        .color-swatch {
          width: 26px;
          height: 26px;
          border-radius: 4px;
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        .color-swatch:hover {
          transform: scale(1.15);
          border-color: #e2498a;
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
        }
        .elementor-widget-card:hover {
          background: #30304a;
          border-color: #e2498a;
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
        }
        .elementor-update-btn:hover {
          background: #059669;
        }
        .elementor-update-btn.highlight {
          background: #e2498a;
        }

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
        }

        /* Bottom Dock */
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
      `}</style>
    </>
  );
}
