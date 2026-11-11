// Unimrkt Research Admin Panel UI Enhancer
(() => {
  if (window.__unimrktEnhancerLoaded) return;
  window.__unimrktEnhancerLoaded = true;

  function enhanceAdminUI() {
    // 1. Maintain document title
    if (!document.title.includes('Unimrkt Research')) {
      document.title = 'Unimrkt Research CMS';
    }

    // 2. Enhance Login Page Header & Subtitle
    const headers = document.querySelectorAll('h1, h2, span, p');
    headers.forEach(el => {
      if (el.textContent === 'Welcome to Strapi!') {
        el.textContent = 'Welcome to Unimrkt CMS!';
      }
      if (el.textContent === 'Log in to your Strapi account') {
        el.textContent = 'Log in to Unimrkt Research Content Hub';
      }
    });

    // 3. Enhance Left Navigation Sidebar Brand Header
    const brandElement = document.querySelector('[data-testid="app-nav-brand"], nav[aria-label] [aria-label*="workplace" i], nav a[href="/admin/"]');
    if (brandElement && !brandElement.dataset.unimrktBranded) {
      brandElement.dataset.unimrktBranded = 'true';
      brandElement.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; padding: 6px 8px; width: 100%;">
          <div style="width: 34px; height: 34px; border-radius: 8px; background: linear-gradient(135deg, #BE2C28 0%, #8E1B18 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(190, 44, 40, 0.4); flex-shrink: 0;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div style="display: flex; flex-direction: column; overflow: hidden; line-height: 1.2;">
            <span style="font-size: 13.5px; font-weight: 700; color: #FFFFFF; letter-spacing: 0.05em; white-space: nowrap;">UNIMRKT</span>
            <span style="font-size: 10px; font-weight: 600; color: #BE2C28; letter-spacing: 0.08em; text-transform: uppercase;">Enterprise CMS</span>
          </div>
        </div>
      `;
    }

    // 4. Enhance Folder Cards in Media Library ("sabh folder ke ander")
    const folderCards = document.querySelectorAll('[data-testid="folder-card"], div[aria-label*="folder" i]');
    folderCards.forEach(card => {
      if (!card.dataset.unimrktEnhanced) {
        card.dataset.unimrktEnhanced = 'true';
        card.style.transition = 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.border = '1px solid #E2E8F0';
        card.style.borderRadius = '12px';
      }
    });

    // 5. Enhance Dynamic Zone Component Cards & Repeatable Components
    const accordions = document.querySelectorAll('button[aria-expanded]');
    accordions.forEach((btn) => {
      const container = btn.closest('div');
      if (container && !container.dataset.unimrktDz) {
        container.dataset.unimrktDz = 'true';
        container.style.borderRadius = '10px';
      }
    });
  }

  // Run on load and observe DOM changes
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceAdminUI);
  } else {
    enhanceAdminUI();
  }

  const observer = new MutationObserver(() => {
    enhanceAdminUI();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
