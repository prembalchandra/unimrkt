const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'build', 'strapi-2XxV9tDn.js');
const backupPath = filePath + '.bak';

if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(filePath, backupPath);
  console.log('Created backup:', backupPath);
}

let content = fs.readFileSync(backupPath, 'utf8');

// Replace light theme colors
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

// SVG icons
content = content.replace(/fill:"#4945FF"/g, 'fill:"#be2c28"');
content = content.replace(/stroke:"#4945FF"/g, 'stroke:"#be2c28"');
content = content.replace(/fill:"#F0F0FF"/g, 'fill:"#fee2e2"');
content = content.replace(/stroke:"#D9D8FF"/g, 'stroke:"#fca5a5"');
content = content.replace(/fill:"#9593FF"/g, 'fill:"#ef4444"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched strapi-2XxV9tDn.js with Unimrkt Crimson Red theme!');
