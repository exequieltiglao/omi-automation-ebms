import { test, expect } from '@fixtures/auth.fixture';
import { loginUser, isUserLoggedIn } from '@helpers/auth.helper';
import { navigateToPage, validateCurrentUrl } from '@helpers/navigation.helper';

/**
 * Login functionality tests
 * Tests the happy path login scenario for EBMS application
 */

test.describe('User Authentication', () => {
  test.beforeEach(async ({ unauthenticatedPage }) => {
    // Ensure clean state before each test
    await navigateToPage(unauthenticatedPage, '/login');
  });

  test('should successfully login with valid credentials', async ({ unauthenticatedPage }) => {
    // Verify we're on the login page
    await expect(unauthenticatedPage.getByText(/welcome back!/i)).toBeVisible();
    await expect(unauthenticatedPage.getByRole('button', { name: /login/i })).toBeVisible();
    
    // Perform login
    await loginUser(unauthenticatedPage);
    
    // Verify successful login by checking if user is authenticated
    const isLoggedIn = await isUserLoggedIn(unauthenticatedPage);
    expect(isLoggedIn).toBeTruthy();
    
    // Verify URL redirect after successful login
    await expect(unauthenticatedPage).toHaveURL(/\/$|dashboard|home|main/);
  });

  test('should display login form elements correctly', async ({ unauthenticatedPage }) => {
    // Verify login form elements are visible
    await expect(unauthenticatedPage.getByTestId('email')).toBeVisible();
    await expect(unauthenticatedPage.getByRole('textbox', { name: /password/i })).toBeVisible();
    await expect(unauthenticatedPage.getByRole('button', { name: /login/i })).toBeVisible();
    
    // Verify form elements are enabled
    await expect(unauthenticatedPage.getByTestId('email')).toBeEnabled();
    await expect(unauthenticatedPage.getByRole('textbox', { name: /password/i })).toBeEnabled();
    await expect(unauthenticatedPage.getByRole('button', { name: /login/i })).toBeEnabled();
  });

  test('should maintain authentication state across page navigation', async ({ authenticatedPage }) => {
    // Verify user is authenticated
    const isLoggedIn = await isUserLoggedIn(authenticatedPage);
    expect(isLoggedIn).toBeTruthy();
    
    // Navigate to different pages and verify authentication persists
    await navigateToPage(authenticatedPage, '/dashboard');
    expect(await isUserLoggedIn(authenticatedPage)).toBeTruthy();
    
    await navigateToPage(authenticatedPage, '/profile');
    expect(await isUserLoggedIn(authenticatedPage)).toBeTruthy();
  });
});

