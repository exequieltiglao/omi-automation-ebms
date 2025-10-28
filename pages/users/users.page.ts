import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Users Page Object Model
 * Encapsulates all Users page functionality and locators
 * Provides methods for navigation and user management interactions
 */
export class UsersPage extends BasePage {
  private readonly createButton: Locator;
  private readonly createUserOption: Locator;
  private readonly createDropdown: Locator;
  private readonly usersTable: Locator;
  private readonly searchInput: Locator;
  private readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    
    this.pageTitle = page.getByRole('heading', { name: /users/i });
    this.createButton = page.getByRole('button', { name: /create/i });
    this.createDropdown = page.locator('[data-test="create-menu"], [data-testid="create-menu"]');
    this.createUserOption = page.locator('a, button').filter({ hasText: /create user/i }).first();
    this.usersTable = page.getByRole('table', { name: /users/i });
    this.searchInput = page.getByRole('textbox', { name: /search/i });
  }

  /**
   * Navigates to the Users page
   */
  async goto(): Promise<void> {
    await this.navigateTo('/admin/users/');
    await this.waitForPageLoad();
    await this.waitForLoadingToComplete();
  }

  /**
   * Clicks the Create button to open the dropdown menu
   */
  async clickCreateButton(): Promise<void> {
    await this.waitForElement(this.createButton);
    await this.createButton.click();
    await this.page.waitForTimeout(500); // Wait for dropdown animation
  }

  /**
   * Clicks the Create User option from the dropdown
   */
  async clickCreateUser(): Promise<void> {
    await this.waitForElement(this.createUserOption);
    await this.createUserOption.click();
  }

  /**
   * Navigates to Create User page by clicking Create > Create User
   */
  async navigateToCreateUser(): Promise<void> {
    await this.clickCreateButton();
    await this.clickCreateUser();
    await this.waitForUrl(/admin\/users\/create/, 10000);
  }

  /**
   * Validates that the Users page is loaded
   */
  async validateUsersPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
  }

  /**
   * Validates that the Create button is visible and enabled
   */
  async validateCreateButtonVisible(): Promise<void> {
    await expect(this.createButton).toBeVisible();
    await expect(this.createButton).toBeEnabled();
  }

  /**
   * Validates that the users table is visible
   */
  async validateUsersTableVisible(): Promise<void> {
    await expect(this.usersTable).toBeVisible();
  }

  /**
   * Gets the current URL
   * @returns Current URL as string
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Validates that current URL contains /admin/users
   */
  async validateUsersUrl(): Promise<void> {
    await expect(this.page).toHaveURL(/admin\/users/);
  }

  /**
   * Validates that current URL contains /admin/users/create
   */
  async validateCreateUserUrl(): Promise<void> {
    await expect(this.page).toHaveURL(/admin\/users\/create/);
  }
}

