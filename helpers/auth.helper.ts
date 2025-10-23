import { Page, expect } from '@playwright/test';
import { getEnvironmentConfig } from '@config/env.config';

/**
 * Authentication helper functions
 * Provides reusable login functionality and authentication state management
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Performs user login using provided credentials
 * @param page - Playwright page object
 * @param credentials - Login credentials (email and password)
 * @returns Promise<void>
 */
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

/**
 * Checks if user is currently logged in
 * @param page - Playwright page object
 * @returns Promise<boolean> - true if logged in, false otherwise
 */
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

/**
 * Logs out the current user
 * @param page - Playwright page object
 * @returns Promise<void>
 */
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

/**
 * Gets authentication state for reuse in other tests
 * @param page - Playwright page object
 * @returns Promise<string> - Authentication state as JSON string
 */
export async function getAuthState(page: Page): Promise<string> {
  const authState = await page.context().storageState();
  return JSON.stringify(authState);
}

