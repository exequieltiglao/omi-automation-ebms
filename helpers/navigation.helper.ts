import { Page, expect } from '@playwright/test';
import { getEnvironmentConfig } from '@config/env.config';

/**
 * Navigation helper functions
 * Provides common navigation utilities and URL validation
 */

/**
 * Navigates to a specific page within the application
 * @param page - Playwright page object
 * @param path - Path to navigate to (e.g., '/dashboard', '/profile')
 * @returns Promise<void>
 */
export async function navigateToPage(page: Page, path: string): Promise<void> {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
}

/**
 * Validates that the current page URL matches expected pattern
 * @param page - Playwright page object
 * @param expectedPattern - Expected URL pattern (string or RegExp)
 * @returns Promise<boolean> - true if URL matches, false otherwise
 */
export async function validateCurrentUrl(page: Page, expectedPattern: string | RegExp): Promise<boolean> {
  const currentUrl = page.url();
  
  if (typeof expectedPattern === 'string') {
    return currentUrl.includes(expectedPattern);
  } else {
    return expectedPattern.test(currentUrl);
  }
}

/**
 * Waits for page to be fully loaded
 * @param page - Playwright page object
 * @returns Promise<void>
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Checks if a specific element is visible on the page
 * @param page - Playwright page object
 * @param selector - Element selector (role, text, label, etc.)
 * @param timeout - Maximum time to wait in milliseconds
 * @returns Promise<boolean> - true if element is visible, false otherwise
 */
export async function isElementVisible(
  page: Page, 
  selector: string
): Promise<boolean> {
  try {
    await expect(page.locator(selector)).toBeVisible();
    return true;
  } catch {
    return false;
  }
}

/**
 * Scrolls to a specific element on the page
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns Promise<void>
 */
export async function scrollToElement(page: Page, selector: string): Promise<void> {
  await page.locator(selector).scrollIntoViewIfNeeded();
}

/**
 * Takes a screenshot of the current page
 * @param page - Playwright page object
 * @param name - Screenshot name (without extension)
 * @returns Promise<void>
 */
export async function takeScreenshot(page: Page, name: string): Promise<void> {
  await page.screenshot({ 
    path: `test-results/screenshots/${name}.png`,
    fullPage: true 
  });
}

/**
 * Gets the page title
 * @param page - Playwright page object
 * @returns Promise<string> - Page title
 */
export async function getPageTitle(page: Page): Promise<string> {
  return await page.title();
}

/**
 * Refreshes the current page
 * @param page - Playwright page object
 * @returns Promise<void>
 */
export async function refreshPage(page: Page): Promise<void> {
  await page.reload();
  await waitForPageLoad(page);
}

