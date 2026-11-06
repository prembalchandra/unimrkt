const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'staging_home_sec_1.html'), 'utf8');
console.log('Total length:', content.length);
// Find where the right column starts
const rightColIdx = content.indexOf('<div class="relative w-full max-w-[320px]');
if (rightColIdx !== -1) {
  console.log(content.slice(rightColIdx, rightColIdx + 1500));
} else {
  // Find all buttons or interactive elements
  const buttons = content.match(/<button[\s\S]*?<\/button>/gi) || [];
  console.log('Buttons:', buttons.length);
  if (buttons.length) console.log(buttons[0]);
}
