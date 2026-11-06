const fs = require('fs');
const code = fs.readFileSync('frontend/scripts/staging_contact_chunk.js', 'utf8');

// Match webpack module identifiers or section names
const moduleMatches = [...code.matchAll(/\/\*\*\/ "([^"]+)":/g)].map(m => m[1]);
console.log('Webpack modules in staging contact chunk:');
moduleMatches.forEach(m => console.log(' -', m));

// Check if any component function names appear
const componentNames = code.match(/function [A-Z][a-zA-Z0-9]+/g) || [];
console.log('Component names:', [...new Set(componentNames)]);
