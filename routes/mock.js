const express = require('express');
const router = express.Router();
const callLLM = require('../agent/llmInterface');
const testCafeWriter = require('../agent/automationWriterTestCafe');
const supertestWriter = require('../agent/automationWriterSupertest');

const fakeJiraTickets = {
  'JIRA-101': 'As a user, I want to log in with valid credentials so I can access my dashboard.',
  'JIRA-102': 'As a user, I want to retrieve my profile data from the /api/profile endpoint.',
  'JIRA-103': 'As an admin, I want to deactivate a user using a DELETE API so inactive users can’t log in.'
};

router.post('/mock-jira', async (req, res) => {
  const { ticketId } = req.body;
  const requirement = fakeJiraTickets[ticketId];

  if (!requirement) {
    return res.status(404).json({ error: `Mock Jira ticket ${ticketId} not found.` });
  }

  try {
    const { testType, testCode } = await callLLM(requirement);

    if (!testCode) {
      return res.status(500).json({ error: 'LLM did not return valid test code.' });
    }

    const script = testType === 'API'
      ? supertestWriter(testCode)
      : testCafeWriter(testCode);

    res.json({ ticketId, type: testType, script });
  } catch (err) {
    console.error('❌ Error handling mock-jira:', err);
    res.status(500).send({ error: 'Failed to generate test from mock Jira' });
  }
});

module.exports = router;