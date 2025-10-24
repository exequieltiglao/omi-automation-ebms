import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { LoginPage } from './auth/login.page';
import { DashboardPage } from './dashboard/dashboard.page';
import { UsersListPage } from './admin/users-list.page';
import { CreateUserPage } from './admin/create-user.page';

/**
 * Page Factory Pattern
 * Provides centralized page object instantiation and management
 * Enables dynamic page creation based on current URL or context
 */
export class PageFactory {
  private static pageInstances: Map<string, BasePage> = new Map();

  /**
   * Creates a new page instance or returns existing one
   * @param pageType - Type of page to create
   * @param page - Playwright page object
   * @returns Page object instance
   */
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

  /**
   * Creates a LoginPage instance
   * @param page - Playwright page object
   * @returns LoginPage instance
   */
  static createLoginPage(page: Page): LoginPage {
    return this.createPage(LoginPage, page);
  }

  /**
   * Creates a DashboardPage instance
   * @param page - Playwright page object
   * @returns DashboardPage instance
   */
  static createDashboardPage(page: Page): DashboardPage {
    return this.createPage(DashboardPage, page);
  }

  /**
   * Creates a UsersListPage instance
   * @param page - Playwright page object
   * @returns UsersListPage instance
   */
  static createUsersListPage(page: Page): UsersListPage {
    return this.createPage(UsersListPage, page);
  }

  /**
   * Creates a CreateUserPage instance
   * @param page - Playwright page object
   * @returns CreateUserPage instance
   */
  static createCreateUserPage(page: Page): CreateUserPage {
    return this.createPage(CreateUserPage, page);
  }

  /**
   * Creates page instance based on current URL
   * @param page - Playwright page object
   * @returns Appropriate page instance based on URL
   */
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

  /**
   * Clears all cached page instances
   * Useful for cleanup between tests
   */
  static clearCache(): void {
    this.pageInstances.clear();
  }

  /**
   * Gets all cached page instances
   * @returns Map of cached page instances
   */
  static getCachedInstances(): Map<string, BasePage> {
    return new Map(this.pageInstances);
  }

  /**
   * Removes specific page instance from cache
   * @param pageType - Type of page to remove
   * @param url - URL of the page instance
   */
  static removePageInstance(pageType: string, url: string): void {
    const pageKey = `${pageType}-${url}`;
    this.pageInstances.delete(pageKey);
  }
}

/**
 * Convenience functions for common page creation patterns
 */

/**
 * Creates a LoginPage instance
 * @param page - Playwright page object
 * @returns LoginPage instance
 */
export function createLoginPage(page: Page): LoginPage {
  return PageFactory.createLoginPage(page);
}

/**
 * Creates a DashboardPage instance
 * @param page - Playwright page object
 * @returns DashboardPage instance
 */
export function createDashboardPage(page: Page): DashboardPage {
  return PageFactory.createDashboardPage(page);
}

/**
 * Creates a UsersListPage instance
 * @param page - Playwright page object
 * @returns UsersListPage instance
 */
export function createUsersListPage(page: Page): UsersListPage {
  return PageFactory.createUsersListPage(page);
}

/**
 * Creates a CreateUserPage instance
 * @param page - Playwright page object
 * @returns CreateUserPage instance
 */
export function createCreateUserPage(page: Page): CreateUserPage {
  return PageFactory.createCreateUserPage(page);
}

/**
 * Creates page instance based on current URL
 * @param page - Playwright page object
 * @returns Appropriate page instance based on URL
 */
export function createPageByUrl(page: Page): BasePage {
  return PageFactory.createPageByUrl(page);
}
