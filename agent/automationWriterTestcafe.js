// agent/automationWriterTestCafe.js
const fs = require('fs');
const path = require('path');

module.exports = function saveTestCafeCode(code, requirement) {
  const testBlocks = code.match(/test\s*\(\s*['"][\s\S]*?\n\s*}\);/g);
  if (!testBlocks) return '// No valid testCafe test blocks found.';

  const outputDir = path.join(__dirname, '..', 'generated_tests', 'tests');
  fs.mkdirSync(outputDir, { recursive: true });

  testBlocks.forEach((block, i) => {
    const scenarioMatch = block.match(/test\s*\(\s*['"](.*?)['"]/);
    const scenario = scenarioMatch ? scenarioMatch[1] : `test_${i + 1}`;
    const fileName = scenario.replace(/\W+/g, '_').slice(0, 50) + '_testcafe.test.js';

    const importLine = `import { Selector } from 'testcafe';`;

    const finalCode = (!block.includes('Selector'))
      ? `${importLine}\n\n${block}`
      : block;

    fs.writeFileSync(path.join(outputDir, fileName), finalCode);
  });

  return `// Saved ${testBlocks.length} TestCafe test(s)`;
};
