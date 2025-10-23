import { test, expect } from '@fixtures/auth.fixture';
import { LoginPage, DashboardPage, createLoginPage, createDashboardPage } from '@pages';

/**
 * Login functionality tests using Page Object Models
 * Tests the happy path login scenario for EBMS application
 * Demonstrates POM pattern for maintainable test automation
 */

test.describe('User Authentication', () => {
  test.beforeEach(async ({ unauthenticatedPage }) => {
    // Ensure clean state before each test
    const loginPage = createLoginPage(unauthenticatedPage);
    await loginPage.goto();
  });

  test('should successfully login with valid credentials', async ({ unauthenticatedPage }) => {
    const loginPage = createLoginPage(unauthenticatedPage);
    const dashboardPage = createDashboardPage(unauthenticatedPage);
    
    // Verify we're on the login page
    await loginPage.validateWelcomeText();
    await loginPage.validateLoginFormElements();
    
    // Perform login using page object
    await loginPage.loginWithDefaultCredentials();
    
    // Verify successful login using dashboard page object
    await dashboardPage.validateUserAuthentication();
    await dashboardPage.validateDashboardUrl();
  });

  test('should display login form elements correctly', async ({ unauthenticatedPage }) => {
    const loginPage = createLoginPage(unauthenticatedPage);
    
    // Verify login form elements are visible and enabled
    await loginPage.validateLoginFormElements();
    
    // Additional validation using page object methods
    expect(await loginPage.isLoginFormVisible()).toBeTruthy();
    expect(await loginPage.isForgotPasswordLinkVisible()).toBeTruthy();
  });

  test('should maintain authentication state across page navigation', async ({ authenticatedPage }) => {
    const dashboardPage = createDashboardPage(authenticatedPage);
    
    // Verify user is authenticated using page object
    await dashboardPage.validateUserAuthentication();
    
    // Navigate to different pages and verify authentication persists
    await dashboardPage.goto();
    expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
    
    await dashboardPage.navigateToProfile();
    expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
  });

  test('should handle login form interactions correctly', async ({ unauthenticatedPage }) => {
    const loginPage = createLoginPage(unauthenticatedPage);
    
    // Test form field interactions
    await loginPage.fillEmail('test@example.com');
    await loginPage.fillPassword('testpassword');
    
    // Verify field values
    expect(await loginPage.getEmailValue()).toBe('test@example.com');
    expect(await loginPage.getPasswordValue()).toBe('testpassword');
    
    // Test remember me functionality
    await loginPage.toggleRememberMe(true);
    expect(await loginPage.isRememberMeChecked()).toBeTruthy();
    
    // Clear form
    await loginPage.clearForm();
    expect(await loginPage.getEmailValue()).toBe('');
    expect(await loginPage.getPasswordValue()).toBe('');
  });

  test('should validate dashboard functionality after login', async ({ unauthenticatedPage }) => {
    const loginPage = createLoginPage(unauthenticatedPage);
    const dashboardPage = createDashboardPage(unauthenticatedPage);
    
    // Perform login
    await loginPage.loginWithDefaultCredentials();
    
    // Comprehensive dashboard validation
    await dashboardPage.validateDashboard();
    
    // Test dashboard navigation
    await dashboardPage.navigateToProfile();
    expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
    
    // Test logout functionality
    await dashboardPage.logout();
    await dashboardPage.validateLoggedOut();
  });
});

