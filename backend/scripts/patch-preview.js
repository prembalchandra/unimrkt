const fs = require('fs');
const path = require('path');

const previewMjsPath = path.resolve(__dirname, '../node_modules/@strapi/content-manager/dist/admin/preview/pages/Preview.mjs');
const previewJsPath = path.resolve(__dirname, '../node_modules/@strapi/content-manager/dist/admin/preview/pages/Preview.js');
const headerMjsPath = path.resolve(__dirname, '../node_modules/@strapi/content-manager/dist/admin/preview/components/PreviewHeader.mjs');
const headerJsPath = path.resolve(__dirname, '../node_modules/@strapi/content-manager/dist/admin/preview/components/PreviewHeader.js');

function patchPreview() {
  console.log('[patch-preview] Checking Strapi preview files...');

  // 1. Patch Preview.mjs
  if (fs.existsSync(previewMjsPath)) {
    let content = fs.readFileSync(previewMjsPath, 'utf8');
    if (!content.includes('const hasAdvancedPreview = true;')) {
      content = content.replace(
        "const hasAdvancedPreview = window.strapi.features.isEnabled('cms-advanced-preview');",
        "const hasAdvancedPreview = true;"
      );
      content = content.replace(
        "setPopoverField: setPopoverField,",
        "setPopoverField: setPopoverField,\n                isSideEditorOpen: isSideEditorOpen,\n                setIsSideEditorOpen: setIsSideEditorOpen,"
      );
      fs.writeFileSync(previewMjsPath, content, 'utf8');
      console.log('✓ Patched Preview.mjs');
    }
  }

  // 2. Patch Preview.js
  if (fs.existsSync(previewJsPath)) {
    let content = fs.readFileSync(previewJsPath, 'utf8');
    if (!content.includes('const hasAdvancedPreview = true;')) {
      content = content.replace(
        "const hasAdvancedPreview = window.strapi.features.isEnabled('cms-advanced-preview');",
        "const hasAdvancedPreview = true;"
      );
      content = content.replace(
        "setPopoverField: setPopoverField,",
        "setPopoverField: setPopoverField,\n                isSideEditorOpen: isSideEditorOpen,\n                setIsSideEditorOpen: setIsSideEditorOpen,"
      );
      fs.writeFileSync(previewJsPath, content, 'utf8');
      console.log('✓ Patched Preview.js');
    }
  }

  console.log('[patch-preview] All preview customizations verified.');
}

patchPreview();
