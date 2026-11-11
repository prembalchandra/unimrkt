const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'build', 'strapi-2XxV9tDn.js');
const backupPath = filePath + '.bak';

if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(filePath, backupPath);
  console.log('Created backup:', backupPath);
}

// Always start clean from backup
let content = fs.readFileSync(backupPath, 'utf8');

// Replace light theme colors to Unimrkt Red
content = content.replace(/buttonPrimary500:"#7b79ff"/g, 'buttonPrimary500:"#cc332f"');
content = content.replace(/buttonPrimary600:"#4945ff"/g, 'buttonPrimary600:"#be2c28"');
content = content.replace(/primary100:"#f0f0ff"/g, 'primary100:"#fee2e2"');
content = content.replace(/primary200:"#d9d8ff"/g, 'primary200:"#fca5a5"');
content = content.replace(/primary500:"#7b79ff"/g, 'primary500:"#cc332f"');
content = content.replace(/primary600:"#4945ff"/g, 'primary600:"#be2c28"');
content = content.replace(/primary700:"#271fe0"/g, 'primary700:"#991b1b"');

// Dark theme
content = content.replace(/primary500:"#4945ff"/g, 'primary500:"#be2c28"');
content = content.replace(/primary600:"#7b79ff"/g, 'primary600:"#cc332f"');
content = content.replace(/primary700:"#7b79ff"/g, 'primary700:"#cc332f"');

// Focus outlines
content = content.replace(/rgb\(39, 31, 224\)/g, 'rgb(190, 44, 40)');
content = content.replace(/rgba\(76, 191, 255, 0.75\)/g, 'rgba(190, 44, 40, 0.4)');

// NOTE: We deliberately DO NOT replace logo data URIs (%234945FF) so the official Strapi login logo remains 100% default!

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched strapi-2XxV9tDn.js with Unimrkt Red theme while keeping login logo default!');
