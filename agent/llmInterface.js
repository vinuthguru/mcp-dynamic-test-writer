// agent/llmInterface.js
const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function callLLM(requirementText) {
  const prompt = `
You're a senior test automation engineer using JavaScript.

Based on the user story below:
- First, determine whether the test type is "UI" or "API"
- Then generate multiple **self-contained** JavaScript tests including both:
    - Positive (valid inputs / expected outcomes)
    - Negative (invalid inputs / error handling)
- Use:
    - TestCafe (for UI scenarios): include meaningful locators, selectors, and actions (e.g. await t.click, typeText, expect), and import statements like \`import { Selector } from 'testcafe'\`
    - Supertest + Jest (for API scenarios): each file must begin with:
        \`const request = require('supertest');\`
        \`const app = require('../app');\`

  Use valid endpoints and HTTP verbs. Add multiple test cases using \`test(...)\` blocks and clear assertions.

User story:
"${requirementText}"

Respond in this format:
TYPE: [UI or API]

CODE:
<multiple complete JavaScript test cases here using test(...) blocks>
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
    });

    const result = response.choices[0].message.content?.trim();
    const typeMatch = result?.match(/TYPE:\s*(UI|API)/i);
    const testType = typeMatch ? typeMatch[1].toUpperCase() : 'UI';

    const codeSection = result?.split(/CODE:\s*/i);
    const testCode = codeSection && codeSection.length > 1 ? codeSection[1].trim() : '';

    if (!testCode) {
      throw new Error('LLM response did not include a CODE block.');
    }

    return { testType, testCode };
  } catch (err) {
    console.error('❌ Error in callLLM:', err.message);
    throw err;
  }
};
