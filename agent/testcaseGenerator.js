module.exports = function generateTestCases(llmOutput) {
  return llmOutput.split(/\n\s*\n/); // Splits on empty lines between scenarios
};