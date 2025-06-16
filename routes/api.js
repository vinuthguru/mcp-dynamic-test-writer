const express = require('express');
const router = express.Router();
const callLLM = require('../agent/llmInterface');
const testCafeWriter = require('../agent/automationWriterTestCafe');
const supertestWriter = require('../agent/automationWriterSupertest');

router.get('/health', (req, res) => {
  res.send({ status: 'MCP Server is up' });
});

router.post('/generate', async (req, res) => {
  const requirement = req.body.requirement || '';
  if (!requirement) {
    return res.status(400).send({ error: 'Requirement text is required in request body.' });
  }

  try {
    const { testType, testCode } = await callLLM(requirement);
    const script = testType === 'API'
      ? supertestWriter(testCode)
      : testCafeWriter(testCode);

    res.json({ type: testType, script });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to generate test case.' });
  }
});

module.exports = router;