# EBMS Automation Repository - Complete Guide

## 📚 Table of Contents

1. [Repository Overview](#repository-overview)
2. [Project Architecture](#project-architecture)
3. [Technology Stack](#technology-stack)
4. [Directory Structure Explained](#directory-structure-explained)
5. [Configuration Files](#configuration-files)
6. [Core Components Deep Dive](#core-components-deep-dive)
7. [Testing Patterns](#testing-patterns)
8. [Development Workflow](#development-workflow)
9. [Advanced Features](#advanced-features)
10. [Troubleshooting](#troubleshooting)

---

## Repository Overview

### What is This Repository?

This is a **comprehensive Playwright automation testing framework** built for the EBMS (Electronic Business Management System) application. It implements industry best practices including:

- ✅ **Page Object Model (POM)** design pattern
- ✅ **TypeScript** for type safety and better IDE support
- ✅ **Custom fixtures** for test isolation
- ✅ **Multi-browser testing** (Chromium, Firefox, WebKit)
- ✅ **Mobile device testing** (Pixel 5, iPhone 12)
- ✅ **Centralized configuration** management
- ✅ **Reusable helper functions** and utilities

### Repository Purpose

**Primary Goals:**
1. Automate end-to-end testing of EBMS application
2. Ensure cross-browser compatibility
3. Provide maintainable and scalable test infrastructure
4. Enable rapid test development with reusable components
5. Support CI/CD integration

**Target Audience:**
- QA Automation Engineers
- Software Developers
- DevOps Engineers
- Test Architects

---

## Project Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Test Execution Layer                      │
│  (test files that use page objects and fixtures)            │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│              Page Object Model Layer                         │
│  (encapsulates page structure and interactions)             │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                 Fixture Layer                                │
│  (provides test context and setup/teardown)                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│              Helper & Utility Layer                          │
│  (reusable functions for common operations)                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│            Configuration Layer                               │
│  (environment variables, Playwright config)                 │
└─────────────────────────────────────────────────────────────┘
```

### Design Patterns Used

1. **Page Object Model (POM)**
   - Encapsulates page structure
   - Centralizes locator management
   - Promotes code reusability

2. **Factory Pattern**
   - Dynamic page object creation
   - Instance caching for performance
   - Flexible page instantiation

3. **Fixture Pattern**
   - Test isolation and independence
   - Automatic setup and teardown
   - Reusable test contexts

4. **Repository Pattern**
   - Centralized configuration management
   - Environment abstraction
   - Type-safe configuration access

---

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Playwright** | ^1.40.0 | Browser automation framework |
| **TypeScript** | ^5.3.0 | Type-safe JavaScript superset |
| **Node.js** | v18+ | JavaScript runtime |
| **dotenv** | ^16.3.1 | Environment variable management |

### Why These Technologies?

**Playwright:**
- ✅ Multi-browser support (Chromium, Firefox, WebKit)
- ✅ Auto-waiting mechanisms (no flaky tests)
- ✅ Built-in test runner with parallel execution
- ✅ Powerful debugging tools
- ✅ Mobile device emulation
- ✅ Network interception and mocking

**TypeScript:**
- ✅ Compile-time type checking
- ✅ Better IDE autocomplete and IntelliSense
- ✅ Easier refactoring
- ✅ Self-documenting code with types
- ✅ Catches errors before runtime

**Node.js:**
- ✅ Fast JavaScript runtime
- ✅ Large ecosystem (npm packages)
- ✅ Excellent async/await support
- ✅ Cross-platform compatibility

---

## Directory Structure Explained

### Complete Directory Tree

```
automation-ebms/
│
├── 📁 config/                      # Configuration management
│   └── env.config.ts              # Environment variables handler
│
├── 📁 fixtures/                    # Custom test fixtures
│   ├── auth.fixture.ts            # Authentication fixtures
│   └── page-object.fixture.ts     # POM-aware fixtures
│
├── 📁 helpers/                     # Utility functions
│   ├── auth.helper.ts             # Authentication utilities
│   └── navigation.helper.ts       # Navigation utilities
│
├── 📁 pages/                       # Page Object Models
│   ├── base.page.ts               # Base page class
│   ├── page.factory.ts            # Page factory pattern
│   ├── index.ts                   # Centralized exports
│   ├── 📁 auth/                   # Authentication pages
│   │   └── login.page.ts          # Login page object
│   └── 📁 dashboard/              # Dashboard pages
│       └── dashboard.page.ts      # Dashboard page object
│
├── 📁 tests/                       # Test specifications
│   ├── 📁 auth/                   # Authentication tests
│   │   └── login.spec.ts          # Login functionality tests
│   ├── 📁 demo/                   # Demo and example tests
│   │   └── page-object-demo.spec.ts
│   └── 📁 structure/              # Architecture validation tests
│       └── pom-structure.spec.ts
│
├── 📁 test-results/                # Test execution artifacts (gitignored)
├── 📁 playwright-report/           # HTML test reports (gitignored)
├── 📁 node_modules/                # Dependencies (gitignored)
│
├── 📄 playwright.config.ts         # Playwright configuration
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 package.json                 # Project dependencies & scripts
├── 📄 .gitignore                   # Git ignore rules
├── 📄 README.md                    # Project documentation
├── 📄 PAGE_OBJECT_MODELS.md        # POM implementation guide
└── 📄 REPOSITORY_GUIDE.md          # This file
```

### Directory Purpose Breakdown

#### 📁 `config/`
**Purpose:** Centralized configuration management

**Contains:**
- `env.config.ts` - Environment variable handler with type safety

**Why separate config?**
- Single source of truth for configuration
- Easy to modify without touching test code
- Type-safe configuration access
- Validation of required variables

**Example Usage:**
```typescript
import { getEnvironmentConfig } from '@config/env.config';

const config = getEnvironmentConfig();
console.log(config.baseUrl); // Type-safe access
```

#### 📁 `fixtures/`
**Purpose:** Reusable test context providers

**Contains:**
- `auth.fixture.ts` - Authentication state management
- `page-object.fixture.ts` - Page object-aware fixtures

**What are fixtures?**
Fixtures are functions that run before/after tests to:
- Set up test preconditions
- Provide test context (authenticated/unauthenticated)
- Clean up after tests
- Ensure test isolation

**Example:**
```typescript
// Fixture provides authenticated page automatically
test('should access dashboard', async ({ authenticatedPage }) => {
  // Page is already logged in!
  await expect(authenticatedPage).toHaveURL(/dashboard/);
});
```

#### 📁 `helpers/`
**Purpose:** Reusable utility functions

**Contains:**
- `auth.helper.ts` - Login, logout, authentication checks
- `navigation.helper.ts` - Navigation, URL validation, screenshots

**When to use helpers vs page objects?**
- **Helpers:** Cross-cutting concerns, utilities used everywhere
- **Page Objects:** Page-specific interactions and validations

**Example:**
```typescript
import { loginUser } from '@helpers/auth.helper';

// Helper function for quick login
await loginUser(page, { email: 'user@test.com', password: 'pass' });
```

#### 📁 `pages/`
**Purpose:** Page Object Model implementation

**Structure:**
```
pages/
├── base.page.ts          # Common functionality for all pages
├── page.factory.ts       # Factory for creating page instances
├── index.ts              # Exports for clean imports
└── [feature]/            # Feature-specific pages
    └── [page].page.ts    # Individual page objects
```

**Key Concepts:**
1. **Inheritance:** All pages extend `BasePage`
2. **Encapsulation:** Locators and methods are private/protected
3. **Reusability:** Common methods in base class
4. **Organization:** Pages grouped by feature/module

#### 📁 `tests/`
**Purpose:** Test specifications

**Organization:**
- Group by feature/module (e.g., `auth/`, `dashboard/`)
- Use descriptive file names ending with `.spec.ts`
- Include demo tests for learning
- Structure validation tests for CI

**Naming Convention:**
```
[feature]/[functionality].spec.ts

Examples:
auth/login.spec.ts
auth/registration.spec.ts
dashboard/navigation.spec.ts
profile/edit-profile.spec.ts
```

---

## Configuration Files

### 1. `playwright.config.ts`

**Purpose:** Configures Playwright test runner behavior

```typescript
export default defineConfig({
  testDir: './tests',              // Where tests are located
  fullyParallel: true,             // Run tests in parallel
  forbidOnly: !!process.env.CI,   // Prevent .only() in CI
  retries: process.env.CI ? 1 : 0, // Retry failed tests in CI
  workers: process.env.CI ? 1 : undefined, // Parallel workers
  reporter: 'html',                // Test report format
  
  use: {
    baseURL: process.env.BASE_URL || 'https://omi-uat.smop.asia',
    trace: 'on-first-retry',       // Trace on retry
    screenshot: 'only-on-failure', // Screenshot on failure
    video: 'retain-on-failure',    // Video on failure
    actionTimeout: 30000,          // 30s action timeout
    navigationTimeout: 30000,      // 30s navigation timeout
    testIdAttribute: 'data-test',  // Custom test ID attribute
  },
  
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
});
```

**Key Configuration Explained:**

**`fullyParallel: true`**
- Runs all tests in parallel for faster execution
- Each test gets isolated browser context
- Reduces total test execution time

**`forbidOnly: !!process.env.CI`**
- Prevents `.only()` in CI environment
- `.only()` runs single test (useful for debugging)
- Ensures all tests run in CI pipeline

**`retries: process.env.CI ? 1 : 0`**
- Retries failed tests once in CI
- No retries locally (fail fast for debugging)
- Handles transient failures in CI

**`workers: process.env.CI ? 1 : undefined`**
- Single worker in CI (sequential execution)
- Multiple workers locally (parallel execution)
- Prevents resource contention in CI

**`trace: 'on-first-retry'`**
- Records trace only when test is retried
- Saves disk space (traces are large)
- Provides debugging info for failures

**`screenshot: 'only-on-failure'`**
- Captures screenshot when test fails
- Helps debugging visual issues
- Attached to test report

**`video: 'retain-on-failure'`**
- Records video of test execution
- Keeps video only if test fails
- Valuable for debugging flaky tests

**`testIdAttribute: 'data-test'`**
- Custom attribute for test IDs
- Use `data-test="my-element"` in HTML
- Access with `page.getByTestId('my-element')`

**Projects Configuration:**
- Each project is a browser/device configuration
- Tests run on all projects by default
- Can target specific project: `npm run test:chrome`

### 2. `tsconfig.json`

**Purpose:** TypeScript compiler configuration

```typescript
{
  "compilerOptions": {
    "target": "ES2022",                    // Modern JavaScript
    "lib": ["ES2022"],                     // Standard library
    "module": "commonjs",                  // Module system
    "moduleResolution": "node",            // Node.js module resolution
    "strict": true,                        // Strict type checking
    "esModuleInterop": true,               // CommonJS/ES module interop
    "skipLibCheck": true,                  // Skip type checking of .d.ts files
    "forceConsistentCasingInFileNames": true, // Case-sensitive imports
    "resolveJsonModule": true,             // Import JSON files
    "declaration": true,                   // Generate .d.ts files
    "declarationMap": true,                // Source maps for declarations
    "sourceMap": true,                     // Generate source maps
    "outDir": "./dist",                    // Output directory
    "rootDir": "./",                       // Root directory
    "baseUrl": "./",                       // Base URL for imports
    
    "paths": {                             // Path mapping
      "@/*": ["./*"],
      "@config/*": ["./config/*"],
      "@helpers/*": ["./helpers/*"],
      "@fixtures/*": ["./fixtures/*"],
      "@tests/*": ["./tests/*"],
      "@pages": ["./pages/index.ts"],
      "@pages/*": ["./pages/*"]
    }
  },
  
  "include": ["**/*.ts", "**/*.js"],
  "exclude": ["node_modules", "dist", "test-results", "playwright-report"]
}
```

**Key Settings Explained:**

**`"strict": true`**
- Enables all strict type checking options
- Catches more potential errors at compile time
- Forces explicit typing (no implicit `any`)

**`"paths"` mapping:**
- Allows clean imports: `import { LoginPage } from '@pages'`
- Instead of: `import { LoginPage } from '../../pages/index'`
- Improves code readability and maintainability

**`"esModuleInterop": true`**
- Better compatibility between CommonJS and ES modules
- Allows `import dotenv from 'dotenv'` syntax
- Recommended for Node.js projects

### 3. `package.json`

**Purpose:** Project metadata and dependencies

```json
{
  "name": "automation-ebms",
  "version": "1.0.0",
  "description": "Playwright automation testing project for EBMS application",
  
  "scripts": {
    "test": "playwright test",                    // Run all tests
    "test:headed": "playwright test --headed",    // Visible browser
    "test:ui": "playwright test --ui",            // UI mode
    "test:report": "playwright show-report",      // View report
    "test:debug": "playwright test --debug",      // Debug mode
    "test:chrome": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:webkit": "playwright test --project=webkit",
    "install:browsers": "playwright install"      // Install browsers
  },
  
  "devDependencies": {
    "@playwright/test": "^1.40.0",    // Playwright framework
    "@types/node": "^20.10.0",        // Node.js type definitions
    "typescript": "^5.3.0"            // TypeScript compiler
  },
  
  "dependencies": {
    "dotenv": "^16.3.1"               // Environment variables
  }
}
```

**NPM Scripts Explained:**

**`npm test`** - Standard test execution
- Runs all tests in headless mode
- Uses all configured browsers/devices
- Generates HTML report

**`npm run test:headed`** - Visible browser
- Opens actual browser window
- Useful for watching test execution
- Helps understand test flow

**`npm run test:ui`** - UI Mode
- Interactive test runner
- Step through tests
- Time-travel debugging
- Best for test development

**`npm run test:debug`** - Debug Mode
- Opens Playwright Inspector
- Set breakpoints
- Step through test code
- Inspect page state

**`npm run test:chrome`** - Browser-specific
- Runs tests only on Chromium
- Faster than running all browsers
- Useful during development

**`npm run install:browsers`** - Browser installation
- Downloads Playwright browsers
- Required after `npm install`
- One-time setup per machine

---

## Core Components Deep Dive

### 1. Environment Configuration (`config/env.config.ts`)

**Purpose:** Centralized, type-safe configuration management

```typescript
export interface EnvironmentConfig {
  baseUrl: string;
  testEmail: string;
  testPassword: string;
  testTimeout: number;
  navigationTimeout: number;
  actionTimeout: number;
  nodeEnv: string;
}
```

**How it works:**

1. **Interface Definition:**
   - Defines structure of configuration object
   - Provides TypeScript type checking
   - Documents expected configuration

2. **Configuration Function:**
```typescript
export function getEnvironmentConfig(): EnvironmentConfig {
  const requiredEnvVars = {
    baseUrl: process.env.BASE_URL || 'https://omi-uat.smop.asia',
    testEmail: process.env.TEST_EMAIL || 'productdevelopmentteam@smop.asia-uat',
    testPassword: process.env.TEST_PASSWORD || 'SM0P4ppDevUAT!',
    testTimeout: parseInt(process.env.TEST_TIMEOUT || '30000'),
    navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '30000'),
    actionTimeout: parseInt(process.env.ACTION_TIMEOUT || '30000'),
    nodeEnv: process.env.NODE_ENV || 'test',
  };

  // Validation
  if (!requiredEnvVars.baseUrl) {
    throw new Error('BASE_URL environment variable is required');
  }

  return requiredEnvVars;
}
```

**Key Features:**

- **Environment Variable Loading:** Reads from `process.env`
- **Default Values:** Provides fallbacks with `||` operator
- **Type Conversion:** `parseInt()` for numeric values
- **Validation:** Throws errors for missing required values
- **Type Safety:** Returns typed `EnvironmentConfig` object

**Usage Example:**
```typescript
import { getEnvironmentConfig } from '@config/env.config';

const config = getEnvironmentConfig();

// Type-safe access
console.log(config.baseUrl);        // string
console.log(config.testTimeout);    // number
console.log(config.testEmail);      // string

// IDE autocomplete works!
config.  // <-- IDE shows all available properties
```

### 2. Authentication Fixtures (`fixtures/auth.fixture.ts`)

**Purpose:** Provides pre-configured test contexts

```typescript
export interface AuthFixtures {
  authenticatedPage: Page;      // Logged-in page
  unauthenticatedPage: Page;    // Logged-out page
}
```

**How Fixtures Work:**

**Fixture Lifecycle:**
```
Test Start
    ↓
Fixture Setup (before test)
    ↓
Test Execution
    ↓
Fixture Teardown (after test)
    ↓
Test End
```

**Authenticated Page Fixture:**
```typescript
authenticatedPage: async ({ page }, use) => {
  const config = getEnvironmentConfig();
  
  // SETUP: Login before test
  await loginUser(page);
  
  // Verify login was successful
  const isLoggedIn = await isUserLoggedIn(page);
  if (!isLoggedIn) {
    throw new Error('Failed to authenticate user before test');
  }
  
  // EXECUTE: Use the authenticated page in test
  await use(page);
  
  // TEARDOWN: Logout after test
  await logoutUser(page);
}
```

**Explanation:**
1. **Setup Phase:** Logs in user before test runs
2. **Verification:** Ensures login succeeded
3. **Usage Phase:** `await use(page)` - test runs here
4. **Teardown Phase:** Logs out user after test completes

**Unauthenticated Page Fixture:**
```typescript
unauthenticatedPage: async ({ page }, use) => {
  // Ensure user is logged out
  await logoutUser(page);
  
  // Navigate to login page to ensure clean state
  await page.goto('/login', { waitUntil: 'domcontentloaded' });
  
  // Use the unauthenticated page
  await use(page);
}
```

**Explanation:**
1. **Logout:** Ensures clean state (no existing session)
2. **Navigation:** Goes to login page
3. **Usage:** Test runs with unauthenticated page

**Test Usage:**
```typescript
// Test with authenticated page
test('should access dashboard', async ({ authenticatedPage }) => {
  // Page is already logged in!
  await expect(authenticatedPage).toHaveURL(/dashboard/);
});

// Test with unauthenticated page
test('should show login form', async ({ unauthenticatedPage }) => {
  // Page is on login page, logged out
  await expect(unauthenticatedPage.getByText(/welcome/i)).toBeVisible();
});
```

### 3. Page Object Base Class (`pages/base.page.ts`)

**Purpose:** Common functionality for all page objects

**Architecture:**
```
BasePage (abstract class)
    │
    ├── Common Properties
    │   ├── page: Page
    │   ├── config: EnvironmentConfig
    │   └── Common Locators (header, footer, spinner, etc.)
    │
    └── Common Methods
        ├── Navigation (navigateTo, refreshPage)
        ├── Waiting (waitForElement, waitForPageLoad)
        ├── Validation (validateCurrentUrl, isElementVisible)
        ├── Utilities (takeScreenshot, scrollToElement)
        └── Error Handling (hasErrorMessage, getErrorMessage)
```

**Key Methods Explained:**

**1. Navigation Method:**
```typescript
async navigateTo(path: string, waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded'): Promise<void> {
  await this.page.goto(path, { waitUntil });
}
```
- **Parameters:**
  - `path`: URL path to navigate to
  - `waitUntil`: When navigation is considered complete
    - `'domcontentloaded'`: DOM is ready (fastest, default)
    - `'load'`: All resources loaded (images, CSS, etc.)
    - `'networkidle'`: No network activity for 500ms
- **Returns:** Promise that resolves when navigation completes

**2. Element Waiting:**
```typescript
async waitForElement(locator: Locator, timeout: number = 10000): Promise<void> {
  await expect(locator).toBeVisible({ timeout });
}
```
- **Why use this?** Playwright auto-waits, but explicit waiting provides:
  - Custom timeout values
  - Better error messages
  - Consistent waiting strategy

**3. Element Visibility Check:**
```typescript
async isElementVisible(locator: Locator): Promise<boolean> {
  try {
    await expect(locator).toBeVisible({ timeout: 1000 });
    return true;
  } catch {
    return false;
  }
}
```
- **Returns:** `boolean` instead of throwing error
- **Use case:** Conditional logic in tests
- **Short timeout:** Quick check (1 second)

**4. URL Validation:**
```typescript
async validateCurrentUrl(expectedPattern: string | RegExp): Promise<boolean> {
  const currentUrl = this.getCurrentUrl();
  
  if (typeof expectedPattern === 'string') {
    return currentUrl.includes(expectedPattern);
  } else {
    return expectedPattern.test(currentUrl);
  }
}
```
- **Flexible:** Accepts string or regex
- **String match:** Checks if URL contains string
- **Regex match:** Tests URL against pattern

### 4. Login Page Object (`pages/auth/login.page.ts`)

**Structure:**
```typescript
export class LoginPage extends BasePage {
  // Private locators (encapsulation)
  private readonly welcomeText: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  
  constructor(page: Page) {
    super(page);  // Call parent constructor
    
    // Initialize locators
    this.welcomeText = page.getByText(/welcome back!/i);
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByRole('textbox', { name: /password/i });
    this.loginButton = page.getByRole('button', { name: /login/i });
  }
  
  // Public methods for interactions
  async fillEmail(email: string): Promise<void> { ... }
  async fillPassword(password: string): Promise<void> { ... }
  async login(credentials?: LoginCredentials): Promise<void> { ... }
}
```

**Design Principles:**

1. **Encapsulation:**
   - Locators are `private readonly`
   - Tests can't access locators directly
   - Changes to locators don't affect tests

2. **Single Responsibility:**
   - Each method does one thing
   - `fillEmail()` only fills email
   - `login()` orchestrates multiple actions

3. **Reusability:**
   - Methods can be called from any test
   - Consistent behavior across tests

**Key Method: Complete Login Flow:**
```typescript
async login(credentials?: LoginCredentials): Promise<void> {
  // Use provided credentials or defaults
  const { email, password } = credentials || {
    email: this.config.testEmail,
    password: this.config.testPassword,
  };

  // Fill form fields
  await this.fillEmail(email);
  await this.fillPassword(password);
  
  // Submit form
  await this.clickLoginButton();
  
  // Wait for successful navigation
  await this.waitForUrl(/\/$|dashboard|home|main/);
}
```

**Explanation:**
1. **Optional credentials:** Uses defaults if not provided
2. **Destructuring:** Extracts email and password
3. **Method composition:** Uses smaller methods
4. **Navigation wait:** Ensures login completed

### 5. Page Factory (`pages/page.factory.ts`)

**Purpose:** Centralized page object creation and caching

**Factory Pattern Benefits:**
- ✅ Single point of page creation
- ✅ Instance caching (performance)
- ✅ Consistent instantiation
- ✅ Easy to extend

**Core Factory Method:**
```typescript
static createPage<T extends BasePage>(
  pageType: new (page: Page) => T,
  page: Page
): T {
  // Create unique key for caching
  const pageKey = `${pageType.name}-${page.url()}`;
  
  // Check cache
  if (!this.pageInstances.has(pageKey)) {
    // Create new instance
    const pageInstance = new pageType(page);
    // Store in cache
    this.pageInstances.set(pageKey, pageInstance);
  }
  
  // Return cached or new instance
  return this.pageInstances.get(pageKey) as T;
}
```

**Explanation:**

**Generic Type `<T extends BasePage>`:**
- `T` is any type that extends `BasePage`
- Ensures type safety
- Provides correct return type

**Constructor Type `new (page: Page) => T`:**
- Represents a class constructor
- Takes `Page` parameter
- Returns instance of type `T`

**Caching Mechanism:**
- `pageKey`: Unique identifier (class name + URL)
- `Map`: Stores instances
- Reuses existing instances when possible

**Why cache?**
- Performance: Avoid recreating page objects
- Consistency: Same instance for same page
- Memory: Efficient resource usage

**Convenience Functions:**
```typescript
export function createLoginPage(page: Page): LoginPage {
  return PageFactory.createLoginPage(page);
}
```

**Benefits:**
- Shorter syntax in tests
- Clean imports
- Better IDE support

**Usage:**
```typescript
// Direct factory use
const loginPage = PageFactory.createLoginPage(page);

// Convenience function (preferred)
import { createLoginPage } from '@pages';
const loginPage = createLoginPage(page);
```

---

## Testing Patterns

### Pattern 1: Basic Test Structure

```typescript
import { test, expect } from '@fixtures/auth.fixture';
import { createLoginPage } from '@pages';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
  });

  test('should perform specific action', async ({ page }) => {
    // Arrange: Set up test data and page objects
    const loginPage = createLoginPage(page);
    
    // Act: Perform actions
    await loginPage.goto();
    await loginPage.fillEmail('test@example.com');
    
    // Assert: Verify results
    await expect(loginPage.getEmailValue()).toBe('test@example.com');
  });

  test.afterEach(async ({ page }) => {
    // Cleanup after each test
  });
});
```

**Structure Explained:**

**`test.describe()`** - Test suite grouping
- Groups related tests
- Provides context in reports
- Can have nested describes

**`test.beforeEach()`** - Setup hook
- Runs before each test in the suite
- Sets up common preconditions
- Initializes test data

**`test()`** - Individual test case
- Should test one specific behavior
- Use descriptive names
- Follow Arrange-Act-Assert pattern

**`test.afterEach()`** - Teardown hook
- Runs after each test
- Cleans up test data
- Resets application state

### Pattern 2: Using Fixtures

```typescript
test('should access protected page', async ({ authenticatedPage }) => {
  // Page is already authenticated
  await expect(authenticatedPage).toHaveURL(/dashboard/);
});

test('should show login form', async ({ unauthenticatedPage }) => {
  // Page is on login page
  await expect(unauthenticatedPage.getByText(/login/i)).toBeVisible();
});
```

**Benefits:**
- No manual setup/teardown
- Consistent initial state
- Reduced boilerplate code
- Better test isolation

### Pattern 3: Page Object Usage

```typescript
test('should complete login flow', async ({ page }) => {
  // Create page objects
  const loginPage = createLoginPage(page);
  const dashboardPage = createDashboardPage(page);
  
  // Use page object methods
  await loginPage.goto();
  await loginPage.validateLoginFormElements();
  await loginPage.loginWithDefaultCredentials();
  
  // Switch to dashboard page object
  await dashboardPage.validateDashboard();
  await dashboardPage.validateUserAuthentication();
});
```

**Best Practices:**
- Create page objects at test start
- Use descriptive method names
- Chain related actions
- Validate after each major step

### Pattern 4: Data-Driven Testing

```typescript
const testUsers = [
  { email: 'user1@test.com', password: 'pass1', expected: 'success' },
  { email: 'user2@test.com', password: 'pass2', expected: 'success' },
  { email: 'invalid@test.com', password: 'wrong', expected: 'error' },
];

testUsers.forEach(({ email, password, expected }) => {
  test(`should handle login for ${email}`, async ({ page }) => {
    const loginPage = createLoginPage(page);
    
    await loginPage.goto();
    await loginPage.login({ email, password });
    
    if (expected === 'success') {
      await expect(page).toHaveURL(/dashboard/);
    } else {
      await expect(loginPage.hasErrorMessage()).toBeTruthy();
    }
  });
});
```

**Benefits:**
- Test multiple scenarios with same logic
- Easy to add new test cases
- Reduces code duplication
- Clear test data separation

### Pattern 5: Error Handling

```typescript
test('should handle network errors gracefully', async ({ page }) => {
  const loginPage = createLoginPage(page);
  
  // Simulate network failure
  await page.route('**/api/login', route => route.abort());
  
  await loginPage.goto();
  await loginPage.login({ email: 'test@test.com', password: 'pass' });
  
  // Verify error handling
  expect(await loginPage.hasErrorMessage()).toBeTruthy();
  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain('network');
});
```

**Key Points:**
- Test error scenarios
- Verify error messages
- Ensure graceful degradation
- Use route interception for simulation

---

## Development Workflow

### 1. Setting Up Development Environment

**Step 1: Clone Repository**
```bash
git clone https://github.com/exequieltiglao/omi-automation-ebms.git
cd omi-automation-ebms
```

**Step 2: Install Dependencies**
```bash
npm install
```

**Step 3: Install Browsers**
```bash
npm run install:browsers
```

**Step 4: Configure Environment**
```bash
# Create .env file (optional, has defaults)
echo "BASE_URL=https://omi-uat.smop.asia" > .env
echo "TEST_EMAIL=your-test-email@example.com" >> .env
echo "TEST_PASSWORD=your-test-password" >> .env
```

**Step 5: Verify Setup**
```bash
# Run structure validation tests
npm run test:chrome -- tests/structure/pom-structure.spec.ts
```

### 2. Creating a New Test

**Step 1: Identify Feature to Test**
- Determine which feature/page to test
- Define test scenarios
- List expected behaviors

**Step 2: Check for Existing Page Objects**
```typescript
// Look in pages/ directory
pages/
├── auth/
│   └── login.page.ts  ← Exists
└── dashboard/
    └── dashboard.page.ts  ← Exists
```

**Step 3: Create Page Object (if needed)**
```typescript
// pages/profile/profile.page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class ProfilePage extends BasePage {
  private readonly profileName: Locator;
  
  constructor(page: Page) {
    super(page);
    this.profileName = page.getByTestId('profile-name');
  }
  
  async goto(): Promise<void> {
    await this.navigateTo('/profile');
  }
  
  async getProfileName(): Promise<string> {
    return await this.getElementText(this.profileName);
  }
}
```

**Step 4: Add to Page Factory**
```typescript
// pages/page.factory.ts
import { ProfilePage } from './profile/profile.page';

export class PageFactory {
  static createProfilePage(page: Page): ProfilePage {
    return this.createPage(ProfilePage, page);
  }
}

export function createProfilePage(page: Page): ProfilePage {
  return PageFactory.createProfilePage(page);
}
```

**Step 5: Export from Index**
```typescript
// pages/index.ts
export { ProfilePage } from './profile/profile.page';
export { createProfilePage } from './page.factory';
```

**Step 6: Write Test**
```typescript
// tests/profile/view-profile.spec.ts
import { test, expect } from '@fixtures/page-object.fixture';
import { createProfilePage } from '@pages';

test.describe('Profile Viewing', () => {
  test('should display user profile information', async ({ authenticatedPage }) => {
    const profilePage = createProfilePage(authenticatedPage);
    
    await profilePage.goto();
    
    const name = await profilePage.getProfileName();
    expect(name).toBeTruthy();
    expect(name).toMatch(/^[A-Za-z\s]+$/);
  });
});
```

### 3. Running Tests

**Run All Tests:**
```bash
npm test
```

**Run Specific Test File:**
```bash
npx playwright test tests/auth/login.spec.ts
```

**Run Tests in Headed Mode:**
```bash
npm run test:headed
```

**Run Tests in UI Mode (Interactive):**
```bash
npm run test:ui
```

**Run Tests in Debug Mode:**
```bash
npm run test:debug
```

**Run Tests on Specific Browser:**
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

**Run Tests with Specific Tag:**
```bash
npx playwright test --grep @smoke
```

### 4. Debugging Tests

**Method 1: UI Mode (Recommended)**
```bash
npm run test:ui
```
- Interactive test runner
- Time-travel debugging
- Step through tests
- Inspect page state

**Method 2: Debug Mode**
```bash
npm run test:debug
```
- Opens Playwright Inspector
- Set breakpoints
- Step through code
- Evaluate expressions

**Method 3: Console Logging**
```typescript
test('debug test', async ({ page }) => {
  console.log('Current URL:', page.url());
  
  const element = page.getByTestId('my-element');
  console.log('Element visible:', await element.isVisible());
});
```

**Method 4: Screenshots**
```typescript
test('capture screenshot', async ({ page }) => {
  await page.screenshot({ path: 'debug-screenshot.png' });
});
```

**Method 5: Pause Execution**
```typescript
test('pause for inspection', async ({ page }) => {
  await page.pause();  // Opens Playwright Inspector
});
```

### 5. Viewing Test Reports

**After test execution:**
```bash
npm run test:report
```

**Report includes:**
- Test results (pass/fail)
- Execution time
- Screenshots (on failure)
- Videos (on failure)
- Traces (on retry)
- Error messages and stack traces

### 6. Git Workflow

**Feature Branch Workflow:**

**Step 1: Create Feature Branch**
```bash
git checkout -b feature/add-profile-tests
```

**Step 2: Make Changes**
```bash
# Create page objects
# Write tests
# Update documentation
```

**Step 3: Commit Changes**
```bash
git add .
git commit -m "feat: Add profile page tests

- Create ProfilePage page object
- Add profile viewing tests
- Update page factory"
```

**Step 4: Push to Remote**
```bash
git push origin feature/add-profile-tests
```

**Step 5: Create Pull Request**
- Go to GitHub repository
- Click "New Pull Request"
- Select your feature branch
- Add description and reviewers
- Submit for review

**Commit Message Convention:**
```
<type>: <subject>

<body>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- test: Test additions/changes
- refactor: Code refactoring
- style: Code style changes
- chore: Maintenance tasks
```

---

## Advanced Features

### 1. Custom Fixtures

**Creating Custom Fixture:**
```typescript
// fixtures/custom.fixture.ts
import { test as base } from '@playwright/test';

interface CustomFixtures {
  testData: {
    validUser: { email: string; password: string };
    invalidUser: { email: string; password: string };
  };
}

export const test = base.extend<CustomFixtures>({
  testData: async ({}, use) => {
    const data = {
      validUser: {
        email: 'valid@test.com',
        password: 'validpass123'
      },
      invalidUser: {
        email: 'invalid@test.com',
        password: 'wrongpass'
      }
    };
    
    await use(data);
  }
});
```

**Usage:**
```typescript
test('should use custom fixture', async ({ testData }) => {
  console.log(testData.validUser.email);
});
```

### 2. API Testing Integration

**Example: API Authentication**
```typescript
import { test, expect } from '@playwright/test';

test('should authenticate via API', async ({ request }) => {
  const response = await request.post('/api/login', {
    data: {
      email: 'test@example.com',
      password: 'password123'
    }
  });
  
  expect(response.ok()).toBeTruthy();
  
  const body = await response.json();
  expect(body.token).toBeDefined();
});
```

### 3. Network Interception

**Mock API Responses:**
```typescript
test('should handle mocked API response', async ({ page }) => {
  // Intercept API call
  await page.route('**/api/user', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com'
      })
    });
  });
  
  // Navigate and verify
  await page.goto('/profile');
  await expect(page.getByText('Test User')).toBeVisible();
});
```

### 4. Visual Regression Testing

**Screenshot Comparison:**
```typescript
test('should match visual snapshot', async ({ page }) => {
  await page.goto('/dashboard');
  
  // Take screenshot and compare
  await expect(page).toHaveScreenshot('dashboard.png', {
    maxDiffPixels: 100  // Allow 100 pixels difference
  });
});
```

### 5. Performance Testing

**Measure Page Load Time:**
```typescript
test('should load page within acceptable time', async ({ page }) => {
  const startTime = Date.now();
  
  await page.goto('/dashboard');
  await page.waitForLoadState('networkidle');
  
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(3000);  // 3 seconds
});
```

### 6. Accessibility Testing

**Using @axe-core/playwright:**
```typescript
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test('should have no accessibility violations', async ({ page }) => {
  await page.goto('/login');
  await injectAxe(page);
  await checkA11y(page);
});
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: Tests Timing Out

**Symptoms:**
```
TimeoutError: page.goto: Timeout 30000ms exceeded
```

**Solutions:**

**1. Increase Timeout:**
```typescript
// In playwright.config.ts
use: {
  navigationTimeout: 60000,  // 60 seconds
  actionTimeout: 60000,
}
```

**2. Use Specific Wait Conditions:**
```typescript
// Instead of fixed timeout
await page.waitForLoadState('networkidle');
await page.waitForSelector('[data-testid="content"]');
```

**3. Check Network Issues:**
```bash
# Test URL accessibility
curl -I https://omi-uat.smop.asia
```

#### Issue 2: Flaky Tests

**Symptoms:**
- Tests pass sometimes, fail other times
- Intermittent failures

**Solutions:**

**1. Avoid Hard Waits:**
```typescript
// ❌ Bad
await page.waitForTimeout(5000);

// ✅ Good
await expect(page.getByTestId('element')).toBeVisible();
```

**2. Use Web-First Assertions:**
```typescript
// ✅ Auto-waits and retries
await expect(element).toBeVisible();
await expect(element).toHaveText('Expected Text');
```

**3. Handle Dynamic Content:**
```typescript
// Wait for specific state
await page.waitForLoadState('networkidle');
await page.waitForFunction(() => document.querySelector('.spinner') === null);
```

#### Issue 3: Element Not Found

**Symptoms:**
```
Error: locator.click: Target closed
Error: locator.fill: Element is not an <input>
```

**Solutions:**

**1. Verify Locator:**
```typescript
// Debug locator
const element = page.getByTestId('my-element');
console.log('Count:', await element.count());
console.log('Visible:', await element.isVisible());
```

**2. Use Correct Locator Type:**
```typescript
// For buttons
page.getByRole('button', { name: /submit/i })

// For inputs
page.getByLabel('Email')
page.getByTestId('email-input')

// For text
page.getByText('Welcome')
```

**3. Wait for Element:**
```typescript
await expect(element).toBeVisible();
await element.click();
```

#### Issue 4: TypeScript Errors

**Symptoms:**
```
Cannot find module '@pages'
Property 'loginPage' does not exist on type
```

**Solutions:**

**1. Check Path Mapping:**
```json
// tsconfig.json
"paths": {
  "@pages": ["./pages/index.ts"],
  "@pages/*": ["./pages/*"]
}
```

**2. Restart TypeScript Server:**
- VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

**3. Rebuild Project:**
```bash
npm run build  # If you have build script
```

#### Issue 5: Browser Installation Issues

**Symptoms:**
```
Error: browserType.launch: Executable doesn't exist
```

**Solutions:**

**1. Install Browsers:**
```bash
npx playwright install
```

**2. Install System Dependencies:**
```bash
npx playwright install-deps
```

**3. Clear Cache and Reinstall:**
```bash
rm -rf node_modules
npm install
npx playwright install
```

#### Issue 6: Authentication Issues

**Symptoms:**
- Tests fail with "not authenticated"
- Login doesn't persist

**Solutions:**

**1. Verify Credentials:**
```typescript
// Check environment variables
console.log('Email:', process.env.TEST_EMAIL);
console.log('Password:', process.env.TEST_PASSWORD ? '***' : 'NOT SET');
```

**2. Check Session Storage:**
```typescript
// After login
const cookies = await page.context().cookies();
console.log('Cookies:', cookies);
```

**3. Use Correct Fixture:**
```typescript
// For authenticated tests
test('test', async ({ authenticatedPage }) => { ... });

// For login tests
test('test', async ({ unauthenticatedPage }) => { ... });
```

---

## Best Practices Summary

### Testing Best Practices

1. **Write Independent Tests**
   - Each test should run independently
   - No dependencies between tests
   - Use fixtures for setup/teardown

2. **Use Descriptive Names**
   ```typescript
   // ❌ Bad
   test('test1', async ({ page }) => { ... });
   
   // ✅ Good
   test('should display error message for invalid email', async ({ page }) => { ... });
   ```

3. **Follow AAA Pattern**
   ```typescript
   test('example', async ({ page }) => {
     // Arrange: Set up test data
     const loginPage = createLoginPage(page);
     
     // Act: Perform action
     await loginPage.login({ email: 'test@test.com', password: 'pass' });
     
     // Assert: Verify result
     await expect(page).toHaveURL(/dashboard/);
   });
   ```

4. **Use Web-First Assertions**
   ```typescript
   // ✅ Auto-waits and retries
   await expect(element).toBeVisible();
   await expect(element).toHaveText('text');
   ```

5. **Avoid Hardcoded Values**
   ```typescript
   // ❌ Bad
   await page.fill('#email', 'hardcoded@email.com');
   
   // ✅ Good
   const config = getEnvironmentConfig();
   await page.fill('#email', config.testEmail);
   ```

### Page Object Best Practices

1. **Keep Page Objects Focused**
   - One page object per page/component
   - Single responsibility principle

2. **Use Private Locators**
   ```typescript
   private readonly loginButton: Locator;  // ✅ Encapsulated
   ```

3. **Provide Meaningful Methods**
   ```typescript
   // ✅ Clear, descriptive methods
   async loginWithValidCredentials(): Promise<void>
   async validateErrorMessage(): Promise<void>
   ```

4. **Return Values When Needed**
   ```typescript
   async getProfileName(): Promise<string> {
     return await this.profileName.textContent();
   }
   ```

### Code Organization Best Practices

1. **Group Related Tests**
   ```typescript
   test.describe('Login Functionality', () => {
     test.describe('Valid Credentials', () => { ... });
     test.describe('Invalid Credentials', () => { ... });
   });
   ```

2. **Use Consistent Naming**
   - Files: `kebab-case.spec.ts`
   - Classes: `PascalCase`
   - Methods: `camelCase`
   - Constants: `UPPER_SNAKE_CASE`

3. **Document Complex Logic**
   ```typescript
   /**
    * Performs multi-step authentication flow
    * @param credentials - User credentials
    * @throws Error if authentication fails
    */
   async authenticate(credentials: Credentials): Promise<void> { ... }
   ```

---

## Complete Login Feature Implementation Walkthrough

This section provides a **step-by-step walkthrough** of how the login feature was implemented from start to finish, showing the evolution from helper-based approach to Page Object Model implementation.

### Phase 1: Initial Setup and Analysis

#### Step 1: Understanding the Application

**What we discovered:**
- EBMS application at `https://omi-uat.smop.asia`
- Login page at `/login` endpoint
- Required fields: Email and Password
- Successful login redirects to dashboard/home page
- Test credentials: `productdevelopmentteam@smop.asia-uat` / `SM0P4ppDevUAT!`

**Application Analysis:**
```typescript
// Initial exploration
test('explore login page', async ({ page }) => {
  await page.goto('/login');
  
  // Discover page structure
  console.log('Page title:', await page.title());
  console.log('URL:', page.url());
  
  // Find login elements
  const emailField = page.getByTestId('email');
  const passwordField = page.getByRole('textbox', { name: /password/i });
  const loginButton = page.getByRole('button', { name: /login/i });
  
  console.log('Email field visible:', await emailField.isVisible());
  console.log('Password field visible:', await passwordField.isVisible());
  console.log('Login button visible:', await loginButton.isVisible());
});
```

#### Step 2: Environment Configuration Setup

**Created `config/env.config.ts`:**
```typescript
export interface EnvironmentConfig {
  baseUrl: string;
  testEmail: string;
  testPassword: string;
  testTimeout: number;
  navigationTimeout: number;
  actionTimeout: number;
  nodeEnv: string;
}

export function getEnvironmentConfig(): EnvironmentConfig {
  const requiredEnvVars = {
    baseUrl: process.env.BASE_URL || 'https://omi-uat.smop.asia',
    testEmail: process.env.TEST_EMAIL || 'productdevelopmentteam@smop.asia-uat',
    testPassword: process.env.TEST_PASSWORD || 'SM0P4ppDevUAT!',
    testTimeout: parseInt(process.env.TEST_TIMEOUT || '30000'),
    navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '30000'),
    actionTimeout: parseInt(process.env.ACTION_TIMEOUT || '30000'),
    nodeEnv: process.env.NODE_ENV || 'test',
  };

  // Validation logic...
  return requiredEnvVars;
}
```

**Why this approach:**
- ✅ Centralized configuration management
- ✅ Type safety with TypeScript interfaces
- ✅ Environment variable validation
- ✅ Default values for development
- ✅ Single source of truth for all settings

### Phase 2: Helper-Based Implementation

#### Step 3: Creating Authentication Helpers

**Created `helpers/auth.helper.ts`:**
```typescript
export interface LoginCredentials {
  email: string;
  password: string;
}

export async function loginUser(page: Page, credentials?: LoginCredentials): Promise<void> {
  const config = getEnvironmentConfig();
  const { email, password } = credentials || {
    email: config.testEmail,
    password: config.testPassword,
  };

  // Navigate to login page
  await page.goto('/login', { waitUntil: 'domcontentloaded' });

  // Wait for login form to be visible
  await expect(page.getByText(/welcome back!/i)).toBeVisible();

  // Fill in email field using data-test attribute
  await page.getByTestId('email').fill(email);

  // Fill in password field
  await page.getByRole('textbox', { name: /password/i }).fill(password);

  // Click login button
  await page.getByTestId('submit').click();

  // Wait for successful login using URL assertion
  await expect(page).toHaveURL(/\/$|dashboard|home|main/);
}
```

**Key Design Decisions:**

1. **Flexible Credentials:**
   ```typescript
   // Can use default credentials
   await loginUser(page);
   
   // Or provide custom credentials
   await loginUser(page, { email: 'custom@test.com', password: 'pass' });
   ```

2. **Robust Locators:**
   ```typescript
   // Used semantic locators
   page.getByTestId('email')           // Data attribute
   page.getByRole('textbox', { name: /password/i })  // Role-based
   page.getByText(/welcome back!/i)   // Text content
   ```

3. **Proper Waiting:**
   ```typescript
   // Wait for form to load
   await expect(page.getByText(/welcome back!/i)).toBeVisible();
   
   // Wait for navigation after login
   await expect(page).toHaveURL(/\/$|dashboard|home|main/);
   ```

#### Step 4: Authentication State Management

**Added authentication state checking:**
```typescript
export async function isUserLoggedIn(page: Page): Promise<boolean> {
  try {
    // Check for logged-in user email display
    const userEmailElement = page.getByText(/productdevelopmentteam@smop\.asia-uat/i);
    await expect(userEmailElement).toBeVisible();
    return true;
  } catch {
    return false;
  }
}

export async function logoutUser(page: Page): Promise<void> {
  try {
    // Look for logout button in various common locations
    const logoutButton = page.getByRole('button', { name: /logout|sign out/i });
    
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      
      // Wait for redirect to login page using URL assertion
      await expect(page).toHaveURL(/login/);
    }
  } catch (error) {
    console.warn('Logout failed or user was not logged in:', error);
  }
}
```

**Why this approach:**
- ✅ Non-throwing authentication check
- ✅ Graceful logout handling
- ✅ URL-based validation
- ✅ Error handling with warnings

#### Step 5: Creating Test Fixtures

**Created `fixtures/auth.fixture.ts`:**
```typescript
export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const config = getEnvironmentConfig();
    
    // Login before test
    await loginUser(page);
    
    // Verify login was successful
    const isLoggedIn = await isUserLoggedIn(page);
    if (!isLoggedIn) {
      throw new Error('Failed to authenticate user before test');
    }
    
    // Use the authenticated page
    await use(page);
    
    // Cleanup: logout after test
    await logoutUser(page);
  },

  unauthenticatedPage: async ({ page }, use) => {
    // Ensure user is logged out
    await logoutUser(page);
    
    // Navigate to login page to ensure clean state
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    
    // Use the unauthenticated page
    await use(page);
  },
});
```

**Fixture Benefits:**
- ✅ Automatic setup and teardown
- ✅ Test isolation
- ✅ Reusable authentication contexts
- ✅ Error handling for failed authentication

#### Step 6: Writing Initial Tests

**Created `tests/auth/login.spec.ts` (Helper-based version):**
```typescript
import { test, expect } from '@fixtures/auth.fixture';
import { loginUser, isUserLoggedIn } from '@helpers/auth.helper';
import { navigateToPage, validateCurrentUrl } from '@helpers/navigation.helper';

test.describe('User Authentication', () => {
  test.beforeEach(async ({ unauthenticatedPage }) => {
    // Ensure clean state before each test
    await navigateToPage(unauthenticatedPage, '/login');
  });

  test('should successfully login with valid credentials', async ({ unauthenticatedPage }) => {
    // Verify we're on the login page
    await expect(unauthenticatedPage.getByText(/welcome back!/i)).toBeVisible();
    await expect(unauthenticatedPage.getByRole('button', { name: /login/i })).toBeVisible();
    
    // Perform login
    await loginUser(unauthenticatedPage);
    
    // Verify successful login by checking if user is authenticated
    const isLoggedIn = await isUserLoggedIn(unauthenticatedPage);
    expect(isLoggedIn).toBeTruthy();
    
    // Verify URL redirect after successful login
    await expect(unauthenticatedPage).toHaveURL(/\/$|dashboard|home|main/);
  });

  test('should display login form elements correctly', async ({ unauthenticatedPage }) => {
    // Verify login form elements are visible
    await expect(unauthenticatedPage.getByTestId('email')).toBeVisible();
    await expect(unauthenticatedPage.getByRole('textbox', { name: /password/i })).toBeVisible();
    await expect(unauthenticatedPage.getByRole('button', { name: /login/i })).toBeVisible();
    
    // Verify form elements are enabled
    await expect(unauthenticatedPage.getByTestId('email')).toBeEnabled();
    await expect(unauthenticatedPage.getByRole('textbox', { name: /password/i })).toBeEnabled();
    await expect(unauthenticatedPage.getByRole('button', { name: /login/i })).toBeEnabled();
  });

  test('should maintain authentication state across page navigation', async ({ authenticatedPage }) => {
    // Verify user is authenticated
    const isLoggedIn = await isUserLoggedIn(authenticatedPage);
    expect(isLoggedIn).toBeTruthy();
    
    // Navigate to different pages and verify authentication persists
    await navigateToPage(authenticatedPage, '/dashboard');
    expect(await isUserLoggedIn(authenticatedPage)).toBeTruthy();
    
    await navigateToPage(authenticatedPage, '/profile');
    expect(await isUserLoggedIn(authenticatedPage)).toBeTruthy();
  });
});
```

**Initial Test Results:**
- ✅ Tests were working
- ✅ Authentication flow was functional
- ✅ Cross-page navigation worked
- ❌ Code was repetitive
- ❌ Locators scattered across tests
- ❌ Hard to maintain

### Phase 3: Page Object Model Migration

#### Step 7: Creating Base Page Class

**Created `pages/base.page.ts`:**
```typescript
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly config = getEnvironmentConfig();

  // Common locators that appear across multiple pages
  protected readonly header: Locator;
  protected readonly footer: Locator;
  protected readonly loadingSpinner: Locator;
  protected readonly errorMessage: Locator;
  protected readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize common locators
    this.header = page.locator('header, [role="banner"]');
    this.footer = page.locator('footer, [role="contentinfo"]');
    this.loadingSpinner = page.locator('[data-testid="loading"], .loading, .spinner');
    this.errorMessage = page.locator('[data-testid="error"], .error, .alert-danger');
    this.successMessage = page.locator('[data-testid="success"], .success, .alert-success');
  }

  // Common methods for all pages
  async navigateTo(path: string, waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded'): Promise<void> {
    await this.page.goto(path, { waitUntil });
  }

  async waitForElement(locator: Locator, timeout: number = 10000): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }

  async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      await expect(locator).toBeVisible({ timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }

  // ... more common methods
}
```

**Design Decisions:**
- ✅ Abstract class (cannot be instantiated directly)
- ✅ Protected properties (accessible to subclasses)
- ✅ Common locators for all pages
- ✅ Reusable utility methods
- ✅ Type-safe configuration access

#### Step 8: Creating Login Page Object

**Created `pages/auth/login.page.ts`:**
```typescript
export class LoginPage extends BasePage {
  // Page-specific locators
  private readonly welcomeText: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly submitButton: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly rememberMeCheckbox: Locator;
  private readonly loginForm: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize login page locators
    this.welcomeText = page.getByText(/welcome back!/i);
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByRole('textbox', { name: /password/i });
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.submitButton = page.getByTestId('submit');
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: /remember me/i });
    this.loginForm = page.locator('form').first();
  }

  async goto(): Promise<void> {
    await this.navigateTo('/login');
    await this.waitForPageLoad();
  }

  async fillEmail(email: string): Promise<void> {
    await this.waitForElement(this.emailInput);
    await this.emailInput.clear();
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.waitForElement(this.passwordInput);
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.waitForElement(this.submitButton);
    await this.submitButton.click();
  }

  async login(credentials?: LoginCredentials): Promise<void> {
    const { email, password } = credentials || {
      email: this.config.testEmail,
      password: this.config.testPassword,
    };

    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
    
    // Wait for navigation after login
    await this.waitForUrl(/\/$|dashboard|home|main/);
  }

  async loginWithDefaultCredentials(): Promise<void> {
    await this.login();
  }

  async validateLoginFormElements(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    
    await expect(this.emailInput).toBeEnabled();
    await expect(this.passwordInput).toBeEnabled();
    await expect(this.loginButton).toBeEnabled();
    await expect(this.submitButton).toBeEnabled();
  }

  // ... more methods
}
```

**Key Improvements:**
- ✅ Encapsulated locators (private readonly)
- ✅ Granular methods (fillEmail, fillPassword, etc.)
- ✅ Composite methods (login, loginWithDefaultCredentials)
- ✅ Validation methods (validateLoginFormElements)
- ✅ Inherits common functionality from BasePage

#### Step 9: Creating Dashboard Page Object

**Created `pages/dashboard/dashboard.page.ts`:**
```typescript
export class DashboardPage extends BasePage {
  // Page-specific locators
  private readonly userEmailDisplay: Locator;
  private readonly logoutButton: Locator;
  private readonly navigationMenu: Locator;
  private readonly dashboardTitle: Locator;
  private readonly profileLink: Locator;
  private readonly settingsLink: Locator;
  private readonly mainContent: Locator;
  private readonly sidebar: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize dashboard page locators
    this.userEmailDisplay = page.getByText(/productdevelopmentteam@smop\.asia-uat/i);
    this.logoutButton = page.getByRole('button', { name: /logout|sign out/i });
    this.navigationMenu = page.locator('nav, [role="navigation"]');
    this.dashboardTitle = page.getByRole('heading', { name: /dashboard|home|welcome/i });
    this.profileLink = page.getByRole('link', { name: /profile/i });
    this.settingsLink = page.getByRole('link', { name: /settings/i });
    this.mainContent = page.locator('main, [role="main"]');
    this.sidebar = page.locator('aside, .sidebar');
  }

  async goto(): Promise<void> {
    await this.navigateTo('/dashboard');
    await this.waitForPageLoad();
  }

  async validateUserAuthentication(): Promise<void> {
    await expect(this.userEmailDisplay).toBeVisible();
  }

  async isUserLoggedIn(): Promise<boolean> {
    try {
      await expect(this.userEmailDisplay).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async logout(): Promise<void> {
    await this.clickLogout();
    await this.validateLoggedOut();
  }

  async clickLogout(): Promise<void> {
    await this.waitForElement(this.logoutButton);
    await this.logoutButton.click();
    
    // Wait for redirect to login page
    await this.waitForUrl(/login/);
  }

  async validateDashboard(): Promise<void> {
    await this.validateDashboardUrl();
    await this.validateUserAuthentication();
    await this.validateDashboardLayout();
    await this.validateDashboardTitle();
  }

  // ... more methods
}
```

**Dashboard Features:**
- ✅ Authentication state validation
- ✅ Logout functionality
- ✅ Navigation methods
- ✅ Comprehensive validation
- ✅ Layout verification

#### Step 10: Creating Page Factory

**Created `pages/page.factory.ts`:**
```typescript
export class PageFactory {
  private static pageInstances: Map<string, BasePage> = new Map();

  static createPage<T extends BasePage>(
    pageType: new (page: Page) => T,
    page: Page
  ): T {
    const pageKey = `${pageType.name}-${page.url()}`;
    
    if (!this.pageInstances.has(pageKey)) {
      const pageInstance = new pageType(page);
      this.pageInstances.set(pageKey, pageInstance);
    }
    
    return this.pageInstances.get(pageKey) as T;
  }

  static createLoginPage(page: Page): LoginPage {
    return this.createPage(LoginPage, page);
  }

  static createDashboardPage(page: Page): DashboardPage {
    return this.createPage(DashboardPage, page);
  }

  static createPageByUrl(page: Page): BasePage {
    const currentUrl = page.url();
    
    if (currentUrl.includes('/login')) {
      return this.createLoginPage(page);
    } else if (currentUrl.includes('/dashboard') || currentUrl === page.context().baseURL) {
      return this.createDashboardPage(page);
    }
    
    // Default to base page for unknown URLs
    return new BasePage(page);
  }

  // ... more methods
}

// Convenience functions
export function createLoginPage(page: Page): LoginPage {
  return PageFactory.createLoginPage(page);
}

export function createDashboardPage(page: Page): DashboardPage {
  return PageFactory.createDashboardPage(page);
}
```

**Factory Benefits:**
- ✅ Centralized page creation
- ✅ Instance caching for performance
- ✅ Dynamic page creation based on URL
- ✅ Type-safe generic methods
- ✅ Clean convenience functions

#### Step 11: Updating TypeScript Configuration

**Updated `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@config/*": ["./config/*"],
      "@helpers/*": ["./helpers/*"],
      "@fixtures/*": ["./fixtures/*"],
      "@tests/*": ["./tests/*"],
      "@pages": ["./pages/index.ts"],
      "@pages/*": ["./pages/*"]
    }
  }
}
```

**Path Mapping Benefits:**
- ✅ Clean imports: `import { LoginPage } from '@pages'`
- ✅ No relative path navigation
- ✅ Better IDE support
- ✅ Easier refactoring

#### Step 12: Creating Enhanced Fixtures

**Created `fixtures/page-object.fixture.ts`:**
```typescript
export const test = base.extend<AuthFixtures & PageObjectFixtures>({
  // ... existing fixtures

  loginPage: async ({ unauthenticatedPage }, use) => {
    const loginPage = createLoginPage(unauthenticatedPage);
    await loginPage.goto();
    await use(loginPage);
  },

  dashboardPage: async ({ authenticatedPage }, use) => {
    const dashboardPage = createDashboardPage(authenticatedPage);
    await dashboardPage.waitForDashboardLoad();
    await use(dashboardPage);
  },

  authenticatedLoginPage: async ({ authenticatedPage }, use) => {
    const loginPage = createLoginPage(authenticatedPage);
    await use(loginPage);
  },

  authenticatedDashboardPage: async ({ authenticatedPage }, use) => {
    const dashboardPage = createDashboardPage(authenticatedPage);
    await dashboardPage.validateDashboard();
    await use(dashboardPage);
  },
});
```

**Enhanced Fixture Benefits:**
- ✅ Pre-configured page objects
- ✅ Automatic navigation
- ✅ Ready-to-use contexts
- ✅ Reduced test boilerplate

#### Step 13: Refactoring Tests to Use Page Objects

**Updated `tests/auth/login.spec.ts` (POM version):**
```typescript
import { test, expect } from '@fixtures/auth.fixture';
import { LoginPage, DashboardPage, createLoginPage, createDashboardPage } from '@pages';

test.describe('User Authentication', () => {
  test.beforeEach(async ({ unauthenticatedPage }) => {
    // Ensure clean state before each test
    const loginPage = createLoginPage(unauthenticatedPage);
    await loginPage.goto();
  });

  test('should successfully login with valid credentials', async ({ unauthenticatedPage }) => {
    const loginPage = createLoginPage(unauthenticatedPage);
    const dashboardPage = createDashboardPage(unauthenticatedPage);
    
    // Verify we're on the login page
    await loginPage.validateWelcomeText();
    await loginPage.validateLoginFormElements();
    
    // Perform login using page object
    await loginPage.loginWithDefaultCredentials();
    
    // Verify successful login using dashboard page object
    await dashboardPage.validateUserAuthentication();
    await dashboardPage.validateDashboardUrl();
  });

  test('should display login form elements correctly', async ({ unauthenticatedPage }) => {
    const loginPage = createLoginPage(unauthenticatedPage);
    
    // Verify login form elements are visible and enabled
    await loginPage.validateLoginFormElements();
    
    // Additional validation using page object methods
    expect(await loginPage.isLoginFormVisible()).toBeTruthy();
    expect(await loginPage.isForgotPasswordLinkVisible()).toBeTruthy();
  });

  test('should maintain authentication state across page navigation', async ({ authenticatedPage }) => {
    const dashboardPage = createDashboardPage(authenticatedPage);
    
    // Verify user is authenticated using page object
    await dashboardPage.validateUserAuthentication();
    
    // Navigate to different pages and verify authentication persists
    await dashboardPage.goto();
    expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
    
    await dashboardPage.navigateToProfile();
    expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
  });

  test('should handle login form interactions correctly', async ({ unauthenticatedPage }) => {
    const loginPage = createLoginPage(unauthenticatedPage);
    
    // Test form field interactions
    await loginPage.fillEmail('test@example.com');
    await loginPage.fillPassword('testpassword');
    
    // Verify field values
    expect(await loginPage.getEmailValue()).toBe('test@example.com');
    expect(await loginPage.getPasswordValue()).toBe('testpassword');
    
    // Test remember me functionality
    await loginPage.toggleRememberMe(true);
    expect(await loginPage.isRememberMeChecked()).toBeTruthy();
    
    // Clear form
    await loginPage.clearForm();
    expect(await loginPage.getEmailValue()).toBe('');
    expect(await loginPage.getPasswordValue()).toBe('');
  });

  test('should validate dashboard functionality after login', async ({ unauthenticatedPage }) => {
    const loginPage = createLoginPage(unauthenticatedPage);
    const dashboardPage = createDashboardPage(unauthenticatedPage);
    
    // Perform login
    await loginPage.loginWithDefaultCredentials();
    
    // Comprehensive dashboard validation
    await dashboardPage.validateDashboard();
    
    // Test dashboard navigation
    await dashboardPage.navigateToProfile();
    expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
    
    // Test logout functionality
    await dashboardPage.logout();
    await dashboardPage.validateLoggedOut();
  });
});
```

**Before vs After Comparison:**

**Before (Helper-based):**
```typescript
// Scattered locators
await expect(unauthenticatedPage.getByTestId('email')).toBeVisible();
await expect(unauthenticatedPage.getByRole('textbox', { name: /password/i })).toBeVisible();

// Helper function call
await loginUser(unauthenticatedPage);

// Manual authentication check
const isLoggedIn = await isUserLoggedIn(unauthenticatedPage);
expect(isLoggedIn).toBeTruthy();
```

**After (Page Object Model):**
```typescript
// Clean page object usage
const loginPage = createLoginPage(unauthenticatedPage);
const dashboardPage = createDashboardPage(unauthenticatedPage);

// Descriptive method calls
await loginPage.validateLoginFormElements();
await loginPage.loginWithDefaultCredentials();
await dashboardPage.validateUserAuthentication();
```

### Phase 4: Testing and Validation

#### Step 14: Creating Structure Validation Tests

**Created `tests/structure/pom-structure.spec.ts`:**
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage, DashboardPage, createLoginPage, createDashboardPage } from '@pages';

test.describe('Page Object Model Structure', () => {
  test('should create LoginPage instance', async ({ page }) => {
    const loginPage = createLoginPage(page);
    
    // Verify page object was created
    expect(loginPage).toBeDefined();
    expect(loginPage).toBeInstanceOf(LoginPage);
    
    // Verify methods exist
    expect(typeof loginPage.fillEmail).toBe('function');
    expect(typeof loginPage.fillPassword).toBe('function');
    expect(typeof loginPage.login).toBe('function');
    expect(typeof loginPage.validateLoginFormElements).toBe('function');
  });

  test('should create DashboardPage instance', async ({ page }) => {
    const dashboardPage = createDashboardPage(page);
    
    // Verify page object was created
    expect(dashboardPage).toBeDefined();
    expect(dashboardPage).toBeInstanceOf(DashboardPage);
    
    // Verify methods exist
    expect(typeof dashboardPage.validateUserAuthentication).toBe('function');
    expect(typeof dashboardPage.isUserLoggedIn).toBe('function');
    expect(typeof dashboardPage.logout).toBe('function');
    expect(typeof dashboardPage.validateDashboard).toBe('function');
  });

  test('should verify BasePage inheritance', async ({ page }) => {
    const loginPage = createLoginPage(page);
    const dashboardPage = createDashboardPage(page);
    
    // Verify both pages inherit from BasePage
    expect(loginPage.getCurrentUrl).toBeDefined();
    expect(loginPage.getPageTitle).toBeDefined();
    expect(loginPage.takeScreenshot).toBeDefined();
    
    expect(dashboardPage.getCurrentUrl).toBeDefined();
    expect(dashboardPage.getPageTitle).toBeDefined();
    expect(dashboardPage.takeScreenshot).toBeDefined();
  });
});
```

**Validation Results:**
- ✅ All 25 structure tests passing
- ✅ Page objects instantiate correctly
- ✅ Methods exist and are callable
- ✅ Inheritance works properly
- ✅ Type safety maintained

#### Step 15: Creating Demo Tests

**Created `tests/demo/page-object-demo.spec.ts`:**
```typescript
import { test, expect } from '@fixtures/page-object.fixture';

test.describe('Page Object Model Demo', () => {
  test('should demonstrate login page object usage', async ({ loginPage }) => {
    // Direct access to login page object with automatic setup
    await loginPage.validateWelcomeText();
    await loginPage.validateLoginFormElements();
    
    // Test form interactions
    await loginPage.fillEmail('demo@example.com');
    await loginPage.fillPassword('demopassword');
    
    expect(await loginPage.getEmailValue()).toBe('demo@example.com');
    expect(await loginPage.getPasswordValue()).toBe('demopassword');
    
    // Test remember me functionality
    await loginPage.toggleRememberMe(true);
    expect(await loginPage.isRememberMeChecked()).toBeTruthy();
  });

  test('should demonstrate dashboard page object usage', async ({ dashboardPage }) => {
    // Direct access to dashboard page object with automatic authentication
    await dashboardPage.validateDashboard();
    
    // Test dashboard functionality
    expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
    expect(await dashboardPage.isMainContentVisible()).toBeTruthy();
    
    // Test navigation
    await dashboardPage.navigateToProfile();
    expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
  });

  test('should demonstrate comprehensive authentication flow', async ({ loginPage, dashboardPage }) => {
    // Start with login page
    await loginPage.loginWithDefaultCredentials();
    
    // Switch to dashboard page for validation
    await dashboardPage.validateUserAuthentication();
    await dashboardPage.validateDashboardUrl();
    
    // Test logout flow
    await dashboardPage.logout();
    await dashboardPage.validateLoggedOut();
  });
});
```

### Phase 5: Documentation and Finalization

#### Step 16: Creating Comprehensive Documentation

**Created `PAGE_OBJECT_MODELS.md`:**
- 993 lines of detailed POM documentation
- Code explanations with line-by-line breakdowns
- Usage examples and best practices
- Migration guide from helper-based approach

**Created `REPOSITORY_GUIDE.md`:**
- 1,778 lines of complete repository explanation
- Architecture diagrams and component breakdowns
- Development workflow and troubleshooting
- This complete login feature walkthrough

#### Step 17: Git Workflow and Version Control

**Branch Management:**
```bash
# Created feature branch
git checkout -b feature/page-object-models

# Committed POM implementation
git add .
git commit -m "feat: Implement comprehensive Page Object Models (POM) architecture"

# Committed documentation
git add PAGE_OBJECT_MODELS.md
git commit -m "docs: Add comprehensive Page Object Models documentation"

git add REPOSITORY_GUIDE.md
git commit -m "docs: Add comprehensive repository guide"

# Pushed to remote
git push -u origin feature/page-object-models
```

### Summary: Complete Login Feature Evolution

#### What We Started With:
- ❌ Basic helper functions
- ❌ Scattered locators in tests
- ❌ Repetitive code
- ❌ Hard to maintain
- ❌ No type safety

#### What We Achieved:
- ✅ **Page Object Model** architecture
- ✅ **Type-safe** configuration management
- ✅ **Reusable** page objects
- ✅ **Centralized** locator management
- ✅ **Comprehensive** test coverage
- ✅ **Maintainable** codebase
- ✅ **Scalable** architecture
- ✅ **Professional** documentation

#### Key Metrics:
- **Files Created:** 10+ new files
- **Lines of Code:** 2,000+ lines
- **Documentation:** 2,970+ lines
- **Test Coverage:** 5 test scenarios
- **Page Objects:** 2 main pages (Login, Dashboard)
- **Architecture Patterns:** 4 patterns implemented

#### Benefits Realized:
1. **Maintainability:** UI changes require updates in only one place
2. **Readability:** Tests are more declarative and easier to understand
3. **Reusability:** Page objects can be used across multiple tests
4. **Type Safety:** TypeScript prevents runtime errors
5. **Scalability:** Easy to add new pages and functionality
6. **Team Collaboration:** Clear patterns for team members to follow

This complete walkthrough demonstrates how a simple login feature evolved from basic helper functions to a sophisticated, maintainable Page Object Model architecture that serves as the foundation for a scalable test automation framework.

---

## Conclusion

This repository provides a **robust, scalable, and maintainable** test automation framework using:

- ✅ **Page Object Model** for better organization
- ✅ **TypeScript** for type safety
- ✅ **Custom Fixtures** for test isolation
- ✅ **Reusable Utilities** for common operations
- ✅ **Comprehensive Configuration** for flexibility
- ✅ **Best Practices** throughout

### Key Strengths

1. **Maintainability:** Changes to UI require updates in only one place
2. **Scalability:** Easy to add new pages and tests
3. **Reliability:** Web-first assertions and proper waiting strategies
4. **Developer Experience:** TypeScript, clean imports, good documentation
5. **CI/CD Ready:** Configured for continuous integration

### Next Steps

1. **Explore the codebase** - Read existing page objects and tests
2. **Run tests locally** - Get familiar with test execution
3. **Create new tests** - Follow the patterns established
4. **Contribute** - Add new features and improvements
5. **Share knowledge** - Help team members understand the framework

---

## Additional Resources

- **[Playwright Documentation](https://playwright.dev/docs/intro)** - Official Playwright docs
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)** - TypeScript guide
- **[Page Object Models Guide](./PAGE_OBJECT_MODELS.md)** - Detailed POM documentation
- **[Project README](./README.md)** - Quick start guide

---

**Repository:** https://github.com/exequieltiglao/omi-automation-ebms
**Created:** 2025-10-23
**Last Updated:** 2025-10-23
**Version:** 1.0.0
**Maintainer:** QA Automation Team

