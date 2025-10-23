import { test, expect } from '@playwright/test';
import { LoginPage, DashboardPage, createLoginPage, createDashboardPage } from '@pages';

/**
 * Page Object Model Structure Tests
 * Tests the POM implementation without network dependencies
 * Validates that page objects can be instantiated and methods exist
 */

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

  test('should verify page object method signatures', async ({ page }) => {
    const loginPage = createLoginPage(page);
    
    // Test method signatures without network calls
    expect(typeof loginPage.fillEmail).toBe('function');
    expect(typeof loginPage.fillPassword).toBe('function');
    expect(typeof loginPage.clickLoginButton).toBe('function');
    expect(typeof loginPage.loginWithDefaultCredentials).toBe('function');
    expect(typeof loginPage.validateWelcomeText).toBe('function');
    expect(typeof loginPage.validateLoginFormElements).toBe('function');
    expect(typeof loginPage.isLoginFormVisible).toBe('function');
    expect(typeof loginPage.getEmailValue).toBe('function');
    expect(typeof loginPage.getPasswordValue).toBe('function');
    expect(typeof loginPage.toggleRememberMe).toBe('function');
    expect(typeof loginPage.clearForm).toBe('function');
  });

  test('should verify dashboard page object method signatures', async ({ page }) => {
    const dashboardPage = createDashboardPage(page);
    
    // Test method signatures without network calls
    expect(typeof dashboardPage.validateUserAuthentication).toBe('function');
    expect(typeof dashboardPage.isUserLoggedIn).toBe('function');
    expect(typeof dashboardPage.clickLogout).toBe('function');
    expect(typeof dashboardPage.logout).toBe('function');
    expect(typeof dashboardPage.validateDashboard).toBe('function');
    expect(typeof dashboardPage.validateDashboardUrl).toBe('function');
    expect(typeof dashboardPage.navigateToProfile).toBe('function');
    expect(typeof dashboardPage.navigateToSettings).toBe('function');
    expect(typeof dashboardPage.getUserEmail).toBe('function');
    expect(typeof dashboardPage.refreshAndValidateAuth).toBe('function');
  });
});
