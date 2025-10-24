import { test, expect } from '@fixtures/page-object.fixture';

/**
 * Page Object Model demonstration tests
 * Shows how to use page object fixtures for cleaner, more maintainable tests
 */

test.describe('Page Object Model Demo', () => {
  test('should demonstrate login page object usage', async ({ loginPage }) => {
    // Direct access to login page object with automatic setup
    await loginPage.validateWelcomeText();
    await loginPage.validateLoginFormElements();
    
    // Test form interactions
    await loginPage.fillEmail('demo@example.com');
    await loginPage.fillPassword('demopassword');
    
    expect(await loginPage.getEmailValue()).toBe('demo@example.com');
    expect(await loginPage.getPasswordValue()).toBe('demopassword');
    
    // Test remember me functionality
    await loginPage.toggleRememberMe(true);
    expect(await loginPage.isRememberMeChecked()).toBeTruthy();
  });

  test('should demonstrate dashboard page object usage', async ({ dashboardPage }) => {
    // Direct access to dashboard page object with automatic authentication
    await dashboardPage.validateDashboard();
    
    // Test dashboard functionality
    expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
    expect(await dashboardPage.isMainContentVisible()).toBeTruthy();
    
    // Test navigation
    await dashboardPage.navigateToProfile();
    expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
  });

  test('should demonstrate comprehensive authentication flow', async ({ loginPage, dashboardPage }) => {
    // Start with login page
    await loginPage.loginWithDefaultCredentials();
    
    // Switch to dashboard page for validation
    await dashboardPage.validateUserAuthentication();
    await dashboardPage.validateDashboardUrl();
    
    // Test logout flow
    await dashboardPage.logout();
    await dashboardPage.validateLoggedOut();
  });

  test('should demonstrate page object method chaining', async ({ loginPage }) => {
    // Method chaining for fluent API
    await loginPage
      .fillEmail('test@example.com')
      .then(() => loginPage.fillPassword('testpassword'))
      .then(() => loginPage.toggleRememberMe(true))
      .then(() => loginPage.validateLoginFormElements());
    
    // Verify state
    expect(await loginPage.getEmailValue()).toBe('test@example.com');
    expect(await loginPage.isRememberMeChecked()).toBeTruthy();
  });
});
