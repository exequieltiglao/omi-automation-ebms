# Page Object Models (POM) Documentation

Quick Start (Beginner-Friendly)
--------------------------------
- A Page Object is a small class that wraps locators and actions for one page.
- Use role/label/text locators; avoid brittle CSS/XPath.
- Keep methods short (fill, click, validate). Add one composite method if helpful.

Minimal example (Login):
```typescript
// pages/auth/login.page.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';

export class LoginPage extends BasePage {
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly submit: Locator;

  constructor(page: Page) {
    super(page);
    this.email = page.getByLabel(/email/i);
    this.password = page.getByLabel(/password/i);
    this.submit = page.getByRole('button', { name: /login|submit/i });
  }

  async goto() { await this.navigateTo('/login'); }
  async login({ email, password }: { email: string; password: string; }) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
    await expect(this.page).toHaveURL(/dashboard|admin/);
  }
}
```

Use in a test:
```typescript
import { test } from '@playwright/test';
import { createLoginPage } from '@pages';

test('login works', async ({ page }) => {
  const login = createLoginPage(page);
  await login.goto();
  await login.login({ email: 'user@test.com', password: 'pass' });
});
```

Users/Create User examples:
```typescript
// pages/users/users.page.ts (snippet)
export class UsersPage extends BasePage {
  private readonly createBtn = this.page.getByRole('button', { name: /create/i });
  async goto() { await this.navigateTo('/admin/users/'); }
  async navigateToCreateUser() {
    await this.createBtn.click();
    await this.page.getByRole('link', { name: /create user/i }).click();
  }
}
```

Tips:
- Prefer getByRole/getByLabel/getByText; avoid fixed waits.
- Reuse locators; keep methods focused; validations use `expect`.

## 📖 Table of Contents

1. [Introduction](#introduction)
2. [Why Page Object Models?](#why-page-object-models)
3. [Architecture Overview](#architecture-overview)
4. [Core Components](#core-components)
5. [Code Explanations](#code-explanations)
6. [Usage Guide](#usage-guide)
7. [Creating New Page Objects](#creating-new-page-objects)
8. [Best Practices](#best-practices)
9. [Migration Guide](#migration-guide)
10. [Examples](#examples)

---

## Introduction

Page Object Model (POM) is a design pattern that creates an object repository for storing all web elements. It helps reduce code duplication and improves test case maintenance. In this implementation, we've structured our Playwright tests to follow POM principles for better scalability and maintainability.

### What is a Page Object?

A Page Object is a class that represents a web page in your application. It encapsulates:
- **Locators**: All element selectors for that page
- **Actions**: Methods to interact with page elements
- **Validations**: Methods to verify page state

---

## Why Page Object Models?

### Problems with Traditional Approach

**Before POM (Helper-based approach):**
```typescript
// Test file with inline locators
test('should login', async ({ page }) => {
  await page.getByTestId('email').fill('user@example.com');
  await page.getByRole('textbox', { name: /password/i }).fill('password');
  await page.getByRole('button', { name: /login/i }).click();
});

// If the UI changes, you need to update locators in EVERY test
```

**Issues:**
- ❌ Locators scattered across multiple test files
- ❌ Duplicated code in every test
- ❌ Hard to maintain when UI changes
- ❌ Tests become verbose and hard to read

### Benefits with POM

**After POM:**
```typescript
// Clean, readable test
test('should login', async ({ page }) => {
  const loginPage = createLoginPage(page);
  await loginPage.loginWithDefaultCredentials();
});

// UI changes? Update ONLY the page object class
```

**Benefits:**
- ✅ Centralized locator management
- ✅ Reusable methods across tests
- ✅ Easy maintenance - change once, affect all
- ✅ Better test readability
- ✅ Separation of concerns

---

## Architecture Overview

### Directory Structure

```
automation-ebms/
├── pages/                          # Page Object Models
│   ├── base.page.ts               # Base class with common functionality
│   ├── auth/                      # Authentication-related pages
│   │   └── login.page.ts          # Login page object
│   ├── dashboard/                 # Dashboard-related pages
│   │   └── dashboard.page.ts      # Dashboard page object
│   ├── page.factory.ts            # Factory pattern for page creation
│   └── index.ts                   # Centralized exports
│
├── fixtures/
│   ├── auth.fixture.ts            # Original authentication fixtures
│   └── page-object.fixture.ts     # Enhanced POM fixtures
│
└── tests/
    ├── auth/
    │   └── login.spec.ts          # Refactored tests using POM
    ├── demo/
    │   └── page-object-demo.spec.ts # POM usage examples
    └── structure/
        └── pom-structure.spec.ts  # POM architecture tests
```

### Component Hierarchy

```
BasePage (Abstract)
    ├── Common locators (header, footer, loading spinner)
    ├── Common methods (navigation, screenshots, validation)
    └── Utility functions (element visibility, URL validation)
         │
         ├── LoginPage extends BasePage
         │   ├── Login-specific locators
         │   └── Login-specific methods
         │
         └── DashboardPage extends BasePage
             ├── Dashboard-specific locators
             └── Dashboard-specific methods
```

---

## Core Components

### 1. BasePage (`pages/base.page.ts`)

The foundation class that all page objects inherit from.

**Purpose:**
- Provides common functionality used across all pages
- Defines common locators (header, footer, error messages)
- Implements utility methods for navigation and validation

**Key Features:**
- Navigation methods
- Element interaction utilities
- Screenshot capabilities
- URL validation
- Loading state management

### 2. LoginPage (`pages/auth/login.page.ts`)

Encapsulates all login page functionality.

**Responsibilities:**
- Login form interactions
- Field validations
- Authentication flow
- Error handling

**Key Methods:**
- `fillEmail()` - Fill email input
- `fillPassword()` - Fill password input
- `login()` - Complete login flow
- `validateLoginFormElements()` - Verify form state

### 3. DashboardPage (`pages/dashboard/dashboard.page.ts`)

Handles authenticated user dashboard operations.

**Responsibilities:**
- User authentication verification
- Dashboard navigation
- Logout functionality
- Content validation

**Key Methods:**
- `isUserLoggedIn()` - Check authentication state
- `logout()` - Perform logout
- `validateDashboard()` - Comprehensive validation
- `navigateToProfile()` - Navigate to user profile

### 4. PageFactory (`pages/page.factory.ts`)

Implements the Factory Pattern for dynamic page object creation.

**Purpose:**
- Centralized page object instantiation
- Page caching for performance
- Dynamic page creation based on URL

**Key Methods:**
- `createLoginPage()` - Create LoginPage instance
- `createDashboardPage()` - Create DashboardPage instance
- `createPageByUrl()` - Auto-detect and create page based on URL

---

## Code Explanations

### BasePage Implementation

```typescript
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly config = getEnvironmentConfig();

  // Common locators that appear across multiple pages
  protected readonly header: Locator;
  protected readonly footer: Locator;
  protected readonly loadingSpinner: Locator;
```

**Explanation:**
- `abstract class`: Cannot be instantiated directly, only extended
- `protected readonly page`: The Playwright page instance, accessible to child classes
- `protected readonly`: Properties can be accessed by subclasses but not modified
- Common locators are defined once and inherited by all page objects

**Key Method: navigateTo()**

```typescript
async navigateTo(path: string, waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded'): Promise<void> {
  await this.page.goto(path, { waitUntil });
}
```

**Explanation:**
- Navigates to a specific path
- `waitUntil` parameter controls when navigation is considered complete
- Default is `'domcontentloaded'` for faster test execution
- Returns a `Promise<void>` - async operation with no return value

**Key Method: waitForElement()**

```typescript
async waitForElement(locator: Locator, timeout: number = 10000): Promise<void> {
  await expect(locator).toBeVisible({ timeout });
}
```

**Explanation:**
- Waits for an element to be visible before proceeding
- Uses Playwright's web-first assertions
- Default timeout of 10 seconds (configurable)
- Throws error if element doesn't appear in time

### LoginPage Implementation

**Constructor:**

```typescript
constructor(page: Page) {
  super(page);  // Call BasePage constructor
  
  // Initialize login page locators
  this.welcomeText = page.getByText(/welcome back!/i);
  this.emailInput = page.getByTestId('email');
  this.passwordInput = page.getByRole('textbox', { name: /password/i });
  this.loginButton = page.getByRole('button', { name: /login/i });
}
```

**Explanation:**
- `super(page)`: Calls the parent class (BasePage) constructor
- Locators are initialized in the constructor for immediate availability
- Uses Playwright's recommended locators: `getByTestId`, `getByRole`, `getByText`
- Locators are stored as class properties for reuse

**Key Method: login()**

```typescript
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
```

**Explanation:**
- Optional `credentials` parameter - uses defaults if not provided
- Destructuring to extract email and password
- `||` operator: Uses config values if credentials not provided
- Breaks down login into smaller, reusable methods
- Waits for URL change to confirm successful login
- Regular expression `/\/$|dashboard|home|main/` matches multiple possible redirect URLs

**Key Method: validateLoginFormElements()**

```typescript
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
```

**Explanation:**
- Validates both visibility and enabled state of form elements
- Uses web-first assertions: `toBeVisible()`, `toBeEnabled()`
- Groups related validations together
- Reusable across multiple test scenarios

### DashboardPage Implementation

**Key Method: isUserLoggedIn()**

```typescript
async isUserLoggedIn(): Promise<boolean> {
  try {
    await expect(this.userEmailDisplay).toBeVisible({ timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}
```

**Explanation:**
- Returns boolean instead of throwing errors
- Uses try-catch to handle assertion failures gracefully
- Short timeout (5 seconds) for quick feedback
- Useful for conditional logic in tests

**Key Method: validateDashboard()**

```typescript
async validateDashboard(): Promise<void> {
  await this.validateDashboardUrl();
  await this.validateUserAuthentication();
  await this.validateDashboardLayout();
  await this.validateDashboardTitle();
}
```

**Explanation:**
- Comprehensive validation combining multiple checks
- Modular design - each validation is a separate method
- Reusable for smoke tests or initial page load verification
- Clear failure points if any validation fails

### PageFactory Implementation

**Factory Method:**

```typescript
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
```

**Explanation:**
- Generic method `<T extends BasePage>`: Works with any page type that extends BasePage
- `pageType: new (page: Page) => T`: Constructor type for creating new instances
- Caching mechanism: Stores instances in `Map` to avoid recreation
- `pageKey`: Unique identifier combining class name and URL
- Returns cached instance if exists, creates new one if not
- Type assertion `as T` ensures correct return type

**Convenience Functions:**

```typescript
export function createLoginPage(page: Page): LoginPage {
  return PageFactory.createLoginPage(page);
}

export function createDashboardPage(page: Page): DashboardPage {
  return PageFactory.createDashboardPage(page);
}
```

**Explanation:**
- Wrapper functions for cleaner imports
- Shorter syntax in tests
- Can be imported directly: `import { createLoginPage } from '@pages'`
- Provides better TypeScript IntelliSense

### Enhanced Fixtures

**Page Object Fixture:**

```typescript
loginPage: async ({ unauthenticatedPage }, use) => {
  const loginPage = createLoginPage(unauthenticatedPage);
  await loginPage.goto();
  await use(loginPage);
}
```

**Explanation:**
- Fixture automatically creates and navigates to login page
- `use(loginPage)`: Makes page object available in test
- Runs before test execution (setup)
- Cleanup happens automatically after test

**Usage in Tests:**

```typescript
test('should demonstrate login', async ({ loginPage }) => {
  // loginPage is already created and navigated to login URL
  await loginPage.validateWelcomeText();
  await loginPage.login();
});
```

**Explanation:**
- Test receives ready-to-use `loginPage` object
- No manual setup required
- Focus on test logic, not setup/teardown
- Consistent initial state for all tests

---

## Usage Guide

### Basic Usage

**1. Import Page Objects**

```typescript
import { createLoginPage, createDashboardPage } from '@pages';
```

**2. Create Page Instance**

```typescript
test('should login successfully', async ({ page }) => {
  const loginPage = createLoginPage(page);
  // ... use loginPage
});
```

**3. Use Page Object Methods**

```typescript
// Navigate to login page
await loginPage.goto();

// Fill form fields
await loginPage.fillEmail('user@example.com');
await loginPage.fillPassword('password123');

// Submit form
await loginPage.clickLoginButton();

// Or use combined method
await loginPage.login({ email: 'user@example.com', password: 'password123' });
```

### Using Fixtures

**With Page Object Fixtures:**

```typescript
import { test, expect } from '@fixtures/page-object.fixture';

test('should validate login page', async ({ loginPage }) => {
  // loginPage is automatically created and ready
  await loginPage.validateLoginFormElements();
  await loginPage.loginWithDefaultCredentials();
});
```

**Multiple Page Objects:**

```typescript
test('should handle login and dashboard', async ({ loginPage, dashboardPage }) => {
  await loginPage.loginWithDefaultCredentials();
  await dashboardPage.validateDashboard();
});
```

### Chaining Methods

```typescript
test('should perform multiple actions', async ({ page }) => {
  const loginPage = createLoginPage(page);
  
  await loginPage
    .fillEmail('test@example.com')
    .then(() => loginPage.fillPassword('password'))
    .then(() => loginPage.toggleRememberMe(true))
    .then(() => loginPage.clickLoginButton());
});
```

---

## Creating New Page Objects

### Step-by-Step Guide

**Step 1: Create Page Class File**

Create a new file in the appropriate directory:
```
pages/
└── profile/
    └── profile.page.ts
```

**Step 2: Define Page Class**

```typescript
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Profile Page Object Model
 * Encapsulates profile page functionality
 */
export class ProfilePage extends BasePage {
  // Define page-specific locators
  private readonly profileName: Locator;
  private readonly editButton: Locator;
  private readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.profileName = page.getByTestId('profile-name');
    this.editButton = page.getByRole('button', { name: /edit/i });
    this.saveButton = page.getByRole('button', { name: /save/i });
  }

  /**
   * Navigates to profile page
   */
  async goto(): Promise<void> {
    await this.navigateTo('/profile');
    await this.waitForPageLoad();
  }

  /**
   * Gets the profile name
   */
  async getProfileName(): Promise<string> {
    await this.waitForElement(this.profileName);
    return await this.getElementText(this.profileName);
  }

  /**
   * Clicks edit button
   */
  async clickEdit(): Promise<void> {
    await this.waitForElement(this.editButton);
    await this.editButton.click();
  }
}
```

**Step 3: Add to Page Factory**

Update `pages/page.factory.ts`:

```typescript
import { ProfilePage } from './profile/profile.page';

export class PageFactory {
  // ... existing code ...

  static createProfilePage(page: Page): ProfilePage {
    return this.createPage(ProfilePage, page);
  }
}

export function createProfilePage(page: Page): ProfilePage {
  return PageFactory.createProfilePage(page);
}
```

**Step 4: Export from Index**

Update `pages/index.ts`:

```typescript
export { ProfilePage } from './profile/profile.page';
export { createProfilePage } from './page.factory';
```

**Step 5: Use in Tests**

```typescript
import { createProfilePage } from '@pages';

test('should display profile information', async ({ authenticatedPage }) => {
  const profilePage = createProfilePage(authenticatedPage);
  await profilePage.goto();
  
  const name = await profilePage.getProfileName();
  expect(name).toBeTruthy();
});
```

---

## Best Practices

### 1. Locator Strategy

**✅ DO: Use role-based and semantic locators**

```typescript
// Good - uses semantic locators
this.loginButton = page.getByRole('button', { name: /login/i });
this.emailInput = page.getByLabel('Email');
this.heading = page.getByRole('heading', { name: 'Welcome' });
```

**❌ DON'T: Use CSS selectors or XPath**

```typescript
// Bad - fragile selectors
this.loginButton = page.locator('.btn-primary');
this.emailInput = page.locator('#email-input');
```

### 2. Method Granularity

**✅ DO: Create small, reusable methods**

```typescript
// Good - small, focused methods
async fillEmail(email: string): Promise<void> {
  await this.emailInput.fill(email);
}

async fillPassword(password: string): Promise<void> {
  await this.passwordInput.fill(password);
}

async clickLoginButton(): Promise<void> {
  await this.loginButton.click();
}
```

**Also provide composite methods:**

```typescript
// Good - combines smaller methods
async login(credentials: LoginCredentials): Promise<void> {
  await this.fillEmail(credentials.email);
  await this.fillPassword(credentials.password);
  await this.clickLoginButton();
}
```

### 3. Error Handling

**✅ DO: Use try-catch for conditional checks**

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

**❌ DON'T: Suppress errors in validation methods**

```typescript
// Bad - hides validation failures
async validateLoginForm(): Promise<void> {
  try {
    await expect(this.emailInput).toBeVisible();
  } catch {
    // Silently fails - hard to debug
  }
}
```

### 4. Wait Strategies

**✅ DO: Use web-first assertions**

```typescript
// Good - automatic waiting
await expect(this.loginButton).toBeVisible();
await expect(this.emailInput).toBeEnabled();
```

**❌ DON'T: Use arbitrary timeouts**

```typescript
// Bad - flaky tests
await page.waitForTimeout(5000);
await this.loginButton.click();
```

### 5. Documentation

**✅ DO: Add JSDoc comments**

```typescript
/**
 * Performs user login with provided credentials
 * @param credentials - Login credentials (email and password)
 * @throws Error if login fails or credentials are invalid
 * @example
 * await loginPage.login({ 
 *   email: 'user@example.com', 
 *   password: 'password123' 
 * });
 */
async login(credentials: LoginCredentials): Promise<void> {
  // implementation
}
```

### 6. Initialization

**✅ DO: Initialize locators in constructor**

```typescript
constructor(page: Page) {
  super(page);
  this.loginButton = page.getByRole('button', { name: /login/i });
  this.emailInput = page.getByTestId('email');
}
```

**❌ DON'T: Create locators in methods**

```typescript
// Bad - creates new locator on each call
async clickLogin(): Promise<void> {
  const button = this.page.getByRole('button', { name: /login/i });
  await button.click();
}
```

---

## Migration Guide

### From Helper-Based to POM

**Before: Helper-Based Approach**

```typescript
import { test, expect } from '@fixtures/auth.fixture';
import { loginUser, isUserLoggedIn } from '@helpers/auth.helper';
import { navigateToPage } from '@helpers/navigation.helper';

test('should login successfully', async ({ unauthenticatedPage }) => {
  await navigateToPage(unauthenticatedPage, '/login');
  
  await expect(unauthenticatedPage.getByText(/welcome back!/i)).toBeVisible();
  await expect(unauthenticatedPage.getByTestId('email')).toBeVisible();
  
  await loginUser(unauthenticatedPage);
  
  const isLoggedIn = await isUserLoggedIn(unauthenticatedPage);
  expect(isLoggedIn).toBeTruthy();
});
```

**After: POM Approach**

```typescript
import { test, expect } from '@fixtures/auth.fixture';
import { createLoginPage, createDashboardPage } from '@pages';

test('should login successfully', async ({ unauthenticatedPage }) => {
  const loginPage = createLoginPage(unauthenticatedPage);
  const dashboardPage = createDashboardPage(unauthenticatedPage);
  
  await loginPage.goto();
  await loginPage.validateWelcomeText();
  await loginPage.validateLoginFormElements();
  
  await loginPage.loginWithDefaultCredentials();
  
  await dashboardPage.validateUserAuthentication();
});
```

**Benefits of Migration:**
- More readable and declarative
- Locators centralized in page classes
- Methods are reusable
- Easier to maintain

### Migration Steps

1. **Identify duplicate locators** across test files
2. **Create page object class** for the page
3. **Move locators** to the page class constructor
4. **Create methods** for common actions
5. **Update tests** to use page objects
6. **Remove helper functions** that are now in page objects
7. **Test thoroughly** to ensure behavior is unchanged

---

## Examples

### Example 1: Login Test

```typescript
import { test, expect } from '@fixtures/page-object.fixture';

test.describe('Login Functionality', () => {
  test('should successfully login with valid credentials', async ({ loginPage, dashboardPage }) => {
    // Validate login page
    await loginPage.validateWelcomeText();
    await loginPage.validateLoginFormElements();
    
    // Perform login
    await loginPage.loginWithDefaultCredentials();
    
    // Validate successful login
    await dashboardPage.validateUserAuthentication();
    await dashboardPage.validateDashboardUrl();
  });

  test('should handle invalid credentials', async ({ loginPage }) => {
    // Attempt login with invalid credentials
    await loginPage.attemptInvalidLogin({
      email: 'invalid@example.com',
      password: 'wrongpassword'
    });
    
    // Verify user remains on login page
    await loginPage.validateStillOnLoginPage();
    
    // Check for error message
    expect(await loginPage.hasErrorMessage()).toBeTruthy();
  });
});
```

### Example 2: Form Interaction

```typescript
test('should handle form interactions', async ({ loginPage }) => {
  // Fill form fields individually
  await loginPage.fillEmail('test@example.com');
  await loginPage.fillPassword('testpassword');
  
  // Verify field values
  expect(await loginPage.getEmailValue()).toBe('test@example.com');
  expect(await loginPage.getPasswordValue()).toBe('testpassword');
  
  // Toggle remember me
  await loginPage.toggleRememberMe(true);
  expect(await loginPage.isRememberMeChecked()).toBeTruthy();
  
  // Clear form
  await loginPage.clearForm();
  expect(await loginPage.getEmailValue()).toBe('');
});
```

### Example 3: Navigation Flow

```typescript
test('should maintain authentication across navigation', async ({ dashboardPage }) => {
  // Verify initial authentication
  await dashboardPage.validateUserAuthentication();
  
  // Navigate to different sections
  await dashboardPage.navigateToProfile();
  expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
  
  await dashboardPage.navigateToSettings();
  expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
  
  // Navigate back to dashboard
  await dashboardPage.goto();
  await dashboardPage.validateDashboard();
});
```

### Example 4: Multiple Page Objects

```typescript
test('should handle complete user flow', async ({ page }) => {
  // Login flow
  const loginPage = createLoginPage(page);
  await loginPage.goto();
  await loginPage.login({ 
    email: 'user@example.com', 
    password: 'password123' 
  });
  
  // Dashboard operations
  const dashboardPage = createDashboardPage(page);
  await dashboardPage.validateDashboard();
  await dashboardPage.navigateToProfile();
  
  // Profile operations
  const profilePage = createProfilePage(page);
  const userName = await profilePage.getProfileName();
  expect(userName).toContain('Test User');
  
  // Logout
  await dashboardPage.logout();
  await dashboardPage.validateLoggedOut();
});
```

### Example 5: Using PageFactory

```typescript
test('should dynamically create pages', async ({ page }) => {
  // Navigate to login
  await page.goto('/login');
  
  // Auto-detect and create appropriate page object
  const currentPage = createPageByUrl(page);
  
  if (currentPage instanceof LoginPage) {
    await currentPage.loginWithDefaultCredentials();
  }
  
  // After navigation, get new page object
  const dashPage = createPageByUrl(page);
  
  if (dashPage instanceof DashboardPage) {
    await dashPage.validateDashboard();
  }
});
```

---

## Summary

### Key Takeaways

1. **Encapsulation**: Page objects encapsulate page structure and behavior
2. **Reusability**: Write once, use everywhere
3. **Maintainability**: Change locators in one place
4. **Readability**: Tests become more declarative and easier to understand
5. **Scalability**: Easy to add new pages as application grows

### When to Use POM

✅ **Use POM when:**
- Application has multiple pages with complex interactions
- Multiple tests interact with the same pages
- UI changes frequently
- Team size is growing
- Long-term maintenance is expected

❌ **Consider alternatives when:**
- Very simple applications with 1-2 pages
- Temporary/throwaway test scripts
- Rapid prototyping phase

### Next Steps

1. Review existing page objects in `pages/` directory
2. Explore demo tests in `tests/demo/page-object-demo.spec.ts`
3. Create new page objects for your application pages
4. Migrate existing helper-based tests to POM
5. Establish team conventions for page object development

---

## Resources

- [Playwright Page Objects Documentation](https://playwright.dev/docs/pom)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Design Patterns: Factory Pattern](https://refactoring.guru/design-patterns/factory-method)
- [Project README](./README.md)

---

**Created**: 2025-10-23
**Last Updated**: 2025-10-23
**Version**: 1.0.0
**Author**: Automation Team

