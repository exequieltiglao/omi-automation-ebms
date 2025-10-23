import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Dashboard Page Object Model
 * Encapsulates all dashboard page functionality and locators
 * Provides methods for dashboard interactions and validations
 */
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

  /**
   * Navigates to the dashboard page
   */
  async goto(): Promise<void> {
    await this.navigateTo('/dashboard');
    await this.waitForPageLoad();
  }

  /**
   * Waits for dashboard page to be fully loaded
   */
  async waitForDashboardLoad(): Promise<void> {
    await this.waitForElement(this.userEmailDisplay);
    await this.waitForLoadingToComplete();
  }

  /**
   * Validates that user is authenticated by checking email display
   */
  async validateUserAuthentication(): Promise<void> {
    await expect(this.userEmailDisplay).toBeVisible();
  }

  /**
   * Checks if user is currently logged in
   * @returns True if logged in, false otherwise
   */
  async isUserLoggedIn(): Promise<boolean> {
    try {
      await expect(this.userEmailDisplay).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Clicks the logout button
   */
  async clickLogout(): Promise<void> {
    await this.waitForElement(this.logoutButton);
    await this.logoutButton.click();
    
    // Wait for redirect to login page
    await this.waitForUrl(/login/);
  }

  /**
   * Navigates to profile page
   */
  async navigateToProfile(): Promise<void> {
    await this.waitForElement(this.profileLink);
    await this.profileLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Navigates to settings page
   */
  async navigateToSettings(): Promise<void> {
    await this.waitForElement(this.settingsLink);
    await this.settingsLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Gets the displayed user email
   * @returns The user email text
   */
  async getUserEmail(): Promise<string> {
    await this.waitForElement(this.userEmailDisplay);
    return await this.getElementText(this.userEmailDisplay);
  }

  /**
   * Validates dashboard title is displayed
   */
  async validateDashboardTitle(): Promise<void> {
    await expect(this.dashboardTitle).toBeVisible();
  }

  /**
   * Checks if navigation menu is visible
   * @returns True if navigation is visible, false otherwise
   */
  async isNavigationVisible(): Promise<boolean> {
    return await this.isElementVisible(this.navigationMenu);
  }

  /**
   * Checks if sidebar is visible
   * @returns True if sidebar is visible, false otherwise
   */
  async isSidebarVisible(): Promise<boolean> {
    return await this.isElementVisible(this.sidebar);
  }

  /**
   * Checks if main content area is visible
   * @returns True if main content is visible, false otherwise
   */
  async isMainContentVisible(): Promise<boolean> {
    return await this.isElementVisible(this.mainContent);
  }

  /**
   * Validates dashboard layout elements
   */
  async validateDashboardLayout(): Promise<void> {
    await expect(this.userEmailDisplay).toBeVisible();
    await expect(this.mainContent).toBeVisible();
    
    // Check if navigation elements are present (they might be in sidebar or header)
    const hasNavigation = await this.isNavigationVisible() || await this.isSidebarVisible();
    expect(hasNavigation).toBeTruthy();
  }

  /**
   * Performs logout and validates successful logout
   */
  async logout(): Promise<void> {
    await this.clickLogout();
    await this.validateLoggedOut();
  }

  /**
   * Validates that user is logged out
   */
  async validateLoggedOut(): Promise<void> {
    await expect(this.page).toHaveURL(/login/);
    
    // Verify user email is no longer displayed
    const isLoggedIn = await this.isUserLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  }

  /**
   * Refreshes dashboard and validates authentication persists
   */
  async refreshAndValidateAuth(): Promise<void> {
    await this.refreshPage();
    await this.waitForDashboardLoad();
    
    const isLoggedIn = await this.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  }

  /**
   * Navigates to a specific section within dashboard
   * @param section - Section name or path
   */
  async navigateToSection(section: string): Promise<void> {
    const sectionLink = this.page.getByRole('link', { name: new RegExp(section, 'i') });
    await this.waitForElement(sectionLink);
    await sectionLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Gets dashboard page title
   * @returns The page title
   */
  async getDashboardTitle(): Promise<string> {
    return await this.getPageTitle();
  }

  /**
   * Validates that dashboard URL is correct
   */
  async validateDashboardUrl(): Promise<void> {
    await expect(this.page).toHaveURL(/\/$|dashboard|home|main/);
  }

  /**
   * Performs comprehensive dashboard validation
   * Checks authentication, layout, and navigation
   */
  async validateDashboard(): Promise<void> {
    await this.validateDashboardUrl();
    await this.validateUserAuthentication();
    await this.validateDashboardLayout();
    await this.validateDashboardTitle();
  }
}
