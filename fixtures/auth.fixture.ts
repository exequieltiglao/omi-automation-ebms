import { test as base, Page } from '@playwright/test';
import { loginUser, logoutUser, isUserLoggedIn } from '@helpers/auth.helper';
import { getEnvironmentConfig } from '@config/env.config';

/**
 * Custom fixtures for authentication testing
 * Extends base Playwright test with authentication capabilities
 */

export interface AuthFixtures {
  authenticatedPage: Page;
  unauthenticatedPage: Page;
}

export const test = base.extend<AuthFixtures>({
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
});

export { expect } from '@playwright/test';

