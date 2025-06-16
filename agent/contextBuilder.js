module.exports = async function buildContextFromMarkdown(filePath) {
  const fs = require('fs');
  return fs.readFileSync(filePath, 'utf-8');
};
