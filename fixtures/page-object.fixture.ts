import { test as base, Page } from '@playwright/test';
import { loginUser, logoutUser, isUserLoggedIn } from '@helpers/auth.helper';
import { getEnvironmentConfig } from '@config/env.config';
import { LoginPage, DashboardPage, createLoginPage, createDashboardPage } from '@pages';

/**
 * Enhanced fixtures for authentication testing with Page Object Models
 * Extends base Playwright test with authentication capabilities and page objects
 */

export interface AuthFixtures {
  authenticatedPage: Page;
  unauthenticatedPage: Page;
}

export interface PageObjectFixtures {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authenticatedLoginPage: LoginPage;
  authenticatedDashboardPage: DashboardPage;
}

export const test = base.extend<AuthFixtures & PageObjectFixtures>({
  /**
   * Provides an authenticated page context
   * Automatically logs in before each test and logs out after
   */
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

  /**
   * Provides an unauthenticated page context
   * Ensures user is logged out before each test
   */
  unauthenticatedPage: async ({ page }, use) => {
    // Ensure user is logged out
    await logoutUser(page);
    
    // Navigate to login page to ensure clean state
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    
    // Use the unauthenticated page
    await use(page);
  },

  /**
   * Provides a LoginPage instance for unauthenticated tests
   * Automatically navigates to login page
   */
  loginPage: async ({ unauthenticatedPage }, use) => {
    const loginPage = createLoginPage(unauthenticatedPage);
    await loginPage.goto();
    await use(loginPage);
  },

  /**
   * Provides a DashboardPage instance for authenticated tests
   * Automatically ensures user is logged in
   */
  dashboardPage: async ({ authenticatedPage }, use) => {
    const dashboardPage = createDashboardPage(authenticatedPage);
    await dashboardPage.waitForDashboardLoad();
    await use(dashboardPage);
  },

  /**
   * Provides a LoginPage instance for authenticated context
   * Useful for testing login functionality when already logged in
   */
  authenticatedLoginPage: async ({ authenticatedPage }, use) => {
    const loginPage = createLoginPage(authenticatedPage);
    await use(loginPage);
  },

  /**
   * Provides a DashboardPage instance for authenticated context
   * Automatically validates dashboard state
   */
  authenticatedDashboardPage: async ({ authenticatedPage }, use) => {
    const dashboardPage = createDashboardPage(authenticatedPage);
    await dashboardPage.validateDashboard();
    await use(dashboardPage);
  },
});

export { expect } from '@playwright/test';
