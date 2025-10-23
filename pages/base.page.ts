import { Page, Locator, expect } from '@playwright/test';
import { getEnvironmentConfig } from '@config/env.config';

/**
 * Base Page Object Model class
 * Provides common functionality and locators that all pages inherit
 * Follows Page Object Model pattern for maintainable test automation
 */
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

  /**
   * Navigates to a specific URL path
   * @param path - The path to navigate to (e.g., '/dashboard', '/login')
   * @param waitUntil - Wait condition for navigation
   */
  async navigateTo(path: string, waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded'): Promise<void> {
    await this.page.goto(path, { waitUntil });
  }

  /**
   * Waits for the page to be fully loaded
   * @param timeout - Maximum time to wait in milliseconds
   */
  async waitForPageLoad(timeout: number = 30000): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded', { timeout });
  }

  /**
   * Waits for a specific element to be visible
   * @param locator - The locator to wait for
   * @param timeout - Maximum time to wait in milliseconds
   */
  async waitForElement(locator: Locator, timeout: number = 10000): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }

  /**
   * Waits for loading spinner to disappear
   * @param timeout - Maximum time to wait in milliseconds
   */
  async waitForLoadingToComplete(timeout: number = 30000): Promise<void> {
    try {
      await expect(this.loadingSpinner).not.toBeVisible({ timeout });
    } catch {
      // Loading spinner might not exist, continue
    }
  }

  /**
   * Gets the current page URL
   * @returns The current URL as a string
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Gets the page title
   * @returns The page title as a string
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Checks if an element is visible
   * @param locator - The locator to check
   * @returns True if element is visible, false otherwise
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      await expect(locator).toBeVisible({ timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if an element is enabled
   * @param locator - The locator to check
   * @returns True if element is enabled, false otherwise
   */
  async isElementEnabled(locator: Locator): Promise<boolean> {
    try {
      await expect(locator).toBeEnabled({ timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Scrolls an element into view
   * @param locator - The locator to scroll to
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Takes a screenshot of the current page
   * @param name - Screenshot name (without extension)
   * @param fullPage - Whether to capture the full page
   */
  async takeScreenshot(name: string, fullPage: boolean = true): Promise<void> {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}.png`,
      fullPage
    });
  }

  /**
   * Refreshes the current page
   */
  async refreshPage(): Promise<void> {
    await this.page.reload();
    await this.waitForPageLoad();
  }

  /**
   * Validates that the current URL matches expected pattern
   * @param expectedPattern - Expected URL pattern (string or RegExp)
   * @returns True if URL matches, false otherwise
   */
  async validateCurrentUrl(expectedPattern: string | RegExp): Promise<boolean> {
    const currentUrl = this.getCurrentUrl();
    
    if (typeof expectedPattern === 'string') {
      return currentUrl.includes(expectedPattern);
    } else {
      return expectedPattern.test(currentUrl);
    }
  }

  /**
   * Waits for URL to match expected pattern
   * @param expectedPattern - Expected URL pattern (string or RegExp)
   * @param timeout - Maximum time to wait in milliseconds
   */
  async waitForUrl(expectedPattern: string | RegExp, timeout: number = 10000): Promise<void> {
    await expect(this.page).toHaveURL(expectedPattern, { timeout });
  }

  /**
   * Gets text content from an element
   * @param locator - The locator to get text from
   * @returns The text content as a string
   */
  async getElementText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  /**
   * Gets attribute value from an element
   * @param locator - The locator to get attribute from
   * @param attributeName - The name of the attribute
   * @returns The attribute value as a string or null
   */
  async getElementAttribute(locator: Locator, attributeName: string): Promise<string | null> {
    return await locator.getAttribute(attributeName);
  }

  /**
   * Checks if error message is displayed
   * @returns True if error message is visible, false otherwise
   */
  async hasErrorMessage(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Checks if success message is displayed
   * @returns True if success message is visible, false otherwise
   */
  async hasSuccessMessage(): Promise<boolean> {
    return await this.isElementVisible(this.successMessage);
  }

  /**
   * Gets error message text if visible
   * @returns Error message text or empty string
   */
  async getErrorMessage(): Promise<string> {
    if (await this.hasErrorMessage()) {
      return await this.getElementText(this.errorMessage);
    }
    return '';
  }

  /**
   * Gets success message text if visible
   * @returns Success message text or empty string
   */
  async getSuccessMessage(): Promise<string> {
    if (await this.hasSuccessMessage()) {
      return await this.getElementText(this.successMessage);
    }
    return '';
  }
}
