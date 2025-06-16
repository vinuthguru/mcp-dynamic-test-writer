# MCP Dynamic Test Writer 🤖🧪

An AI-powered test automation generator that creates **TestCafe UI tests** and **Supertest API tests** from natural language requirements — with optional mock Jira integration.

---

## ✨ Features

- 🧠 Generates tests using OpenAI (gpt-3.5 or gpt-4)
- ✍️ Accepts plain-text or mock Jira tickets as input
- 🧪 Generates Supertest + Jest API tests
- 🖱️ Generates TestCafe UI tests with meaningful locators and actions
- 📁 Saves tests into organized folders (`api_tests/` and `tests/`)
- ✅ Auto-inserts required imports and test wrappers
- 🔐 Includes a dummy Express app with basic auth to test against

---

## 🛠️ Project Structure

mcp-dynamic-test-writer/
├── agent/ # LLM interface + test writers
├── routes/ # Express routes (/api, /mock-jira)
├── generated_tests/ # Output test files
│ ├── api_tests/
│ └── tests/
├── app.js # Dummy Express API for Supertest
├── index.js # MCP server entry point
├── .env # OpenAI API Key
└── package.json

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/mcp-dynamic-test-writer.git
cd mcp-dynamic-test-writer
2. Install dependencies
bash
Copy
Edit
npm install
3. Add your OpenAI key
Create a .env file with:

ini
Copy
Edit
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
4. Start the MCP server
bash
Copy
Edit
node index.js
🧪 Running Tests
✅ API Tests (Supertest)
bash
Copy
Edit
npm run test:api
✅ UI Tests (TestCafe in Chrome)
bash
Copy
Edit
npm run test:ui
If you don’t have TestCafe installed globally:

bash
Copy
Edit
npm install -g testcafe
🧾 Example Usage
Generate from plain text
bash
Copy
Edit
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"requirement": "As a user, I want to retrieve my profile from the /api/profile endpoint"}'
Generate from a mock Jira ticket
bash
Copy
Edit
curl -X POST http://localhost:3000/api/mock-jira \
  -H "Content-Type: application/json" \
  -d '{"ticketId": "JIRA-102"}'
Mock ticket options:

JIRA-101 – Login feature

JIRA-102 – Retrieve profile data

JIRA-103 – Admin deactivates user via DELETE

📌 Roadmap
 ✅ Real Jira integration

 📤 Publish results to TestRail

 🔁 Support for Cypress or Playwright

 ⚙️ GitHub Actions or GitLab CI pipelines

