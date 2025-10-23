# EBMS Automation Testing Project

A comprehensive Playwright automation testing project for the EBMS (Electronic Business Management System) application, built with TypeScript and following industry best practices.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository and navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npm run install:browsers
   ```

4. Copy environment configuration:
   ```bash
   cp .env.example .env
   ```

5. Update `.env` file with your test credentials and configuration

### Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Run tests for specific browser
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Debug tests
npm run test:debug

# View test report
npm run test:report
```

## 📁 Project Structure

```
automation-ebms/
├── config/                 # Environment configuration
│   └── env.config.ts      # Centralized environment management
├── fixtures/              # Custom test fixtures
│   └── auth.fixture.ts    # Authentication fixtures
├── helpers/               # Reusable utility functions
│   ├── auth.helper.ts     # Authentication utilities
│   └── navigation.helper.ts # Navigation utilities
├── tests/                 # Test specifications
│   └── auth/              # Authentication tests
│       └── login.spec.ts  # Login functionality tests
├── test-results/          # Test execution results (gitignored)
├── playwright-report/     # HTML reports (gitignored)
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies and scripts
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables

The project uses environment variables for configuration. Key variables include:

- `BASE_URL`: Application base URL (default: https://omi-uat.smop.asia)
- `TEST_EMAIL`: Test user email
- `TEST_PASSWORD`: Test user password
- `TEST_TIMEOUT`: Test timeout in milliseconds
- `NAVIGATION_TIMEOUT`: Navigation timeout in milliseconds
- `ACTION_TIMEOUT`: Action timeout in milliseconds

### Playwright Configuration

The `playwright.config.ts` file includes:

- Multi-browser testing (Chromium, Firefox, WebKit)
- Mobile device testing (Pixel 5, iPhone 12)
- Parallel test execution
- Screenshots and traces on failure
- HTML reporter configuration
- Environment-based settings

## 🧪 Test Structure

### Authentication Tests

The project includes comprehensive authentication tests:

- **Happy path login**: Tests successful login with valid credentials
- **Form validation**: Verifies login form elements are properly displayed
- **Authentication persistence**: Ensures login state is maintained across navigation

### Test Fixtures

Custom fixtures provide:

- `authenticatedPage`: Pre-authenticated page context
- `unauthenticatedPage`: Clean, logged-out page context

### Helper Functions

Reusable utilities for:

- **Authentication**: Login, logout, authentication state management
- **Navigation**: Page navigation, URL validation, element visibility checks

## 🎯 Best Practices

This project follows Playwright best practices:

- ✅ Uses role-based locators (`getByRole`, `getByLabel`, `getByText`)
- ✅ Implements proper test isolation with fixtures
- ✅ Uses web-first assertions (`toBeVisible`, `toHaveText`)
- ✅ Avoids hardcoded timeouts
- ✅ Implements proper error handling
- ✅ Uses descriptive test names
- ✅ Follows DRY principles with reusable helpers
- ✅ Includes proper TypeScript typing

## 🔍 Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@fixtures/auth.fixture';

test('should perform specific action', async ({ authenticatedPage }) => {
  // Test implementation
  await expect(authenticatedPage.getByRole('button')).toBeVisible();
});
```

### Using Helpers

```typescript
import { loginUser } from '@helpers/auth.helper';
import { navigateToPage } from '@helpers/navigation.helper';

test('should navigate and authenticate', async ({ page }) => {
  await navigateToPage(page, '/login');
  await loginUser(page);
});
```

## 📊 Reporting

The project generates comprehensive test reports:

- **HTML Report**: Detailed test results with screenshots and traces
- **Console Output**: Real-time test execution feedback
- **Screenshots**: Automatic screenshots on test failures
- **Traces**: Detailed execution traces for debugging

## 🚀 CI/CD Integration

The project is configured for CI/CD environments:

- Automatic retry on failure (1 retry in CI)
- Single worker execution in CI
- Proper environment variable handling
- Cross-browser compatibility

## 📝 Contributing

When adding new tests:

1. Follow the existing folder structure
2. Use descriptive test names
3. Implement proper error handling
4. Add JSDoc comments for helper functions
5. Use role-based locators
6. Ensure tests are isolated and reliable

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev/docs/writing-tests)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Testing Best Practices](https://playwright.dev/docs/best-practices)

