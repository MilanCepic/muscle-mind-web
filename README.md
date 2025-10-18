🧪 MuscleMind Web Automation Tests
Complete end-to-end test automation suite for MuscleMind web application using Playwright with Page Object Model design pattern.

🚀 Quick Start
Prerequisites
Node.js 18 or higher
npm 9 or higher

Installation & Setup

# Clone the repository
git clone https://github.com/MilanCepic/muscle-mind-web.git
cd muscle-mind-web

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install


🧪 Running Tests
Local Development
# Run all tests with visible browser
npm test

CI/Headless Mode
# Run tests without browser UI (for CI)
npm run test:ci



📁 Project Structure
text
muscle-mind-web/
├── 📁 tests/
│   └── full_user_journie.spec.js      # Complete user journey test
├── 📁 page-objects/                   # Page Object Models
│   ├── HomePage.js
│   ├── ContactPage.js
│   ├── ProgramsPage.js
│   ├── Footer.js
│   ├── FAQ.js
│   ├── AboutUs.js
│   ├── BlogPage.js
│   ├── Purchase.js
│   └── PaymentPage.js
├── 📁 data/
│   └── cardDetails.js                 # Test data for payments
├── 📁 utils/
│   ├── lighthouse-helper.js           # Performance testing utilities
│   └── isDesktopViewport.js           # Responsive viewport detection
└── 📄 playwright.config.ts            # Playwright configuration

🎯 Test Coverage
Full User Journey Test
✅ Language switching (English/Serbian)

✅ Contact form validation and submission

✅ Complete website navigation

✅ Blog interactions and random post selection

✅ Program browsing and selection

✅ FAQ section testing

✅ Social media links verification

✅ Stripe payment form testing

✅ Responsive design (Desktop & Mobile)

⚙️ Configuration
Browser Support
Chromium (Desktop)
Mobile Chrome (375x812 viewport)

📊 Test Reports
Viewing Reports

# Generate and view HTML report
npx playwright show-report

# View trace for failed tests
npx playwright show-trace test-results/*/trace.zip


CI Artifacts
After each CI run, comprehensive test reports are available as downloadable artifacts in GitHub Actions, including:
HTML test reports
Screenshots of failures
Execution traces
Performance metrics


🔄 CI/CD Pipeline
Automated testing on every:
Push to main branch
Pull request to main/master branches
Scheduled runs for regression testing


🛠️ Development
Adding New Tests
Create Page Object in page-objects/ directory
Follow existing Page Object Model patterns
Add test methods with proper error handling
Update main test file if adding new user flows

Example Page Object Structure
javascript:

export class ExamplePage {
  constructor(page) {
    this.page = page;
    this.someElement = page.locator('.selector');
  }
  
  async performAction() {
    await this.someElement.click();
  }
}


🐛Common Issues & Solutions

# Browsers not installed
npx playwright install
# Dependency issues
npm ci
# Test timeouts
npx playwright test --timeout=120000
# Debug mode
npx playwright test --debug

CI-Specific Fixes
Social media tests handle redirects gracefully
Payment form tests include stability waits
Mobile navigation uses burger menu pattern

🤝 Contributing
Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request



Automation tests maintained with ❤️ by ...
