const path = require('path');
const mysql = require(path.resolve(__dirname, '../../backend/node_modules/mysql2/promise'));
const { getPageBySlug } = require('../lib/strapi');

async function testNewSections() {
  const db = await mysql.createConnection({ host: '127.0.0.1', user: 'root', password: '', database: 'unimrkt_strapi' });

  // 1. Create a Custom HTML Section component record in MySQL
  const [resHtml] = await db.query(`
    INSERT INTO components_sections_custom_html_sections (kicker, title, html_code, render_in_container, enabled)
    VALUES (
      'CMS HTML EDITOR',
      'Live Dynamic Custom HTML Section',
      '<div style=\"padding:24px;border-left:4px solid #BE2C28;background:#fff5f5;border-radius:12px;\"><h3 style=\"color:#BE2C28;margin-bottom:8px;\">Managed via Strapi Admin Panel</h3><p>This entire HTML block is editable directly in Strapi CMS without modifying code. Supports tables, lists, embeds, and custom layouts with full XSS sanitization.</p><ul><li>Instant Publish</li><li>Zero Hardcoding</li><li>Clean Execution</li></ul></div>',
      1,
      1
    )
  `);
  const htmlSecId = resHtml.insertId;
  console.log('Created custom-html-section with id:', htmlSecId);

  // 2. Create an Icon Card and Icon Cards Section
  const [resCard1] = await db.query(`
    INSERT INTO components_elements_icon_cards (title, description, icon_size, icon_color, link_url)
    VALUES ('B2B Panel Management', 'Access over 4 million verified B2B decision makers across 90+ countries.', 'medium', '#BE2C28', '/services')
  `);
  const [resCard2] = await db.query(`
    INSERT INTO components_elements_icon_cards (title, description, icon_size, icon_color, link_url)
    VALUES ('Global CATI Operations', '500+ CATI workstations operating in 22+ languages with real-time audit.', 'medium', '#BE2C28', '/services')
  `);

  const [resIconSec] = await db.query(`
    INSERT INTO components_sections_icon_cards_sections (kicker, heading, description, columns, enabled)
    VALUES ('CMS ICON MANAGEMENT', 'Custom Icon Cards Section', 'Dynamic icon cards managed through Strapi CMS.', 2, 1)
  `);
  const iconSecId = resIconSec.insertId;

  // Link cards to icon section
  await db.query(`
    INSERT INTO components_sections_icon_cards_sections_cmps (entity_id, cmp_id, component_type, field, \`order\`)
    VALUES (?, ?, 'elements.icon-card', 'cards', 1), (?, ?, 'elements.icon-card', 'cards', 2)
  `, [iconSecId, resCard1.insertId, iconSecId, resCard2.insertId]);
  console.log('Created icon-cards-section with id:', iconSecId);

  // 3. Create Banner Section
  const [resBanner] = await db.query(`
    INSERT INTO components_sections_banner_sections (kicker, title, description, alt_text, enabled)
    VALUES ('DYNAMIC BANNER', 'Next-Generation Market Intelligence', 'Custom banner with separate mobile and desktop image management.', 'Banner Alt', 1)
  `);
  const bannerSecId = resBanner.insertId;
  console.log('Created banner-section with id:', bannerSecId);

  // 4. Create or update a test dynamic CMS page 'custom-test'
  const [existingPages] = await db.query('SELECT * FROM pages WHERE slug = "custom-test"');
  let pageId;
  let documentId = 'customtestdocid1234567890';
  if (existingPages.length > 0) {
    pageId = existingPages[0].id;
    await db.query('DELETE FROM pages_cmps WHERE entity_id = ?', [pageId]);
  } else {
    const [resPage] = await db.query(`
      INSERT INTO pages (document_id, slug, title, published_at, created_at, updated_at)
      VALUES (?, 'custom-test', 'Custom Dynamic CMS Showcase', NOW(), NOW(), NOW())
    `, [documentId]);
    pageId = resPage.insertId;
  }

  // Link all 3 sections to this page in pages_cmps
  await db.query(`
    INSERT INTO pages_cmps (entity_id, cmp_id, component_type, field, \`order\`)
    VALUES
      (?, ?, 'sections.banner-section', 'sections', 1),
      (?, ?, 'sections.custom-html-section', 'sections', 2),
      (?, ?, 'sections.icon-cards-section', 'sections', 3)
  `, [pageId, bannerSecId, pageId, htmlSecId, pageId, iconSecId]);
  console.log('Linked sections to page custom-test (pageId: ' + pageId + ')');

  await db.end();

  // Test Strapi API fetching this new page
  console.log('\nTesting Strapi REST API query for /api/pages?filters[slug][$eq]=custom-test...');
  const page = await getPageBySlug('custom-test');
  console.log('Fetched Page Title:', page?.title);
  console.log('Sections Count:', page?.sections?.length);
  if (page?.sections) {
    page.sections.forEach((s, i) => {
      console.log(`[${i}] ${s.__component} - title/heading: ${s.title || s.heading}`);
      if (s.htmlCode) console.log('    htmlCode preview:', s.htmlCode.substring(0, 60) + '...');
      if (s.cards) console.log('    cards count:', s.cards.length);
    });
  }
}

testNewSections().catch(console.error);
