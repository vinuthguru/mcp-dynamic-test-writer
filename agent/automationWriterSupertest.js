// agent/automationWriterSupertest.js
const fs = require('fs');
const path = require('path');

module.exports = function saveSupertestCode(code, requirement) {
  const testBlocks = code.match(/test\s*\(\s*['"][\s\S]*?\n\s*}\);/g);
  if (!testBlocks) return '// No valid Supertest test blocks found.';

  const outputDir = path.join(__dirname, '..', 'generated_tests', 'api_tests');
  fs.mkdirSync(outputDir, { recursive: true });

  testBlocks.forEach((block, i) => {
    const scenarioMatch = block.match(/test\s*\(\s*['"](.*?)['"]/);
    const scenario = scenarioMatch ? scenarioMatch[1] : `api_test_${i + 1}`;
    const fileName = scenario.replace(/\W+/g, '_').slice(0, 50) + '_api.test.js';

    // Ensure required imports exist
    const importBlock = `
const request = require('supertest');
const app = require('../../app');
`;

    const finalCode = (!block.includes('request(') || !block.includes("require('../app')"))
      ? importBlock + '\n' + block
      : block;

    fs.writeFileSync(path.join(outputDir, fileName), finalCode);
  });

  return `// Saved ${testBlocks.length} Supertest API test(s)`;
};
