import { test, expect } from '@playwright/test';
import { createLoginPage, createUsersPage, createCreateUserPage } from '@pages';

/**
 * Create User functionality tests
 * Tests the Create User flow in the EBMS system
 * Note: These tests are designed to be executed via MCP Server
 */

test.describe('Create User - EBMS System', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = createLoginPage(page);
    await loginPage.goto();
    await loginPage.login({
      email: 'admin@example.com',
      password: 'admin123'
    });
  });

  test('should navigate to Create User page from Users page via Create > Create User button', async ({ page }) => {
    const usersPage = createUsersPage(page);
    await usersPage.goto();
    await usersPage.validateUsersPageLoaded();
    
    await usersPage.navigateToCreateUser();
    
    const createUserPage = createCreateUserPage(page);
    await createUserPage.validateCreateUserUrl();
    await createUserPage.validateCreateUserPageLoaded();
  });

  test('should display Create User form with all required fields', async ({ page }) => {
    const createUserPage = createCreateUserPage(page);
    
    await createUserPage.goto();
    await createUserPage.waitForCreateUserPageLoad();
    
    await createUserPage.validateBasicInformationSection();
    await createUserPage.validateAccountInformationSection();
    await createUserPage.validateDefaultUserStatus();
  });

  test('should show Configure Permission button after selecting Permission Group', async ({ page }) => {
    const createUserPage = createCreateUserPage(page);
    
    await createUserPage.goto();
    await createUserPage.waitForCreateUserPageLoad();
    
    const firstOption = await page.locator('select option').nth(1).textContent();
    
    if (firstOption && firstOption.trim()) {
      await createUserPage.selectPermissionGroup(firstOption);
      await createUserPage.validateConfigurePermissionButtonVisible();
    }
  });

  test('should successfully create a user and verify in Users list', async ({ page }) => {
    const createUserPage = createCreateUserPage(page);
    
    await createUserPage.goto();
    await createUserPage.waitForCreateUserPageLoad();
    
    // Generate unique test data programmatically
    const timestamp = Date.now();
    const testData = {
      firstName: 'John',
      lastName: 'Doe',
      email: `john.doe.${timestamp}@test.com`,
      contactNumber: '9171234567',
      permissionGroup: 'Client'
    };
    
    // Fill form with programmatically generated data
    await createUserPage.fillFirstName(testData.firstName);
    await createUserPage.fillLastName(testData.lastName);
    await createUserPage.fillEmail(testData.email);
    await createUserPage.fillContactNumber(testData.contactNumber);
    await createUserPage.selectPermissionGroup(testData.permissionGroup);
    
    // Submit form
    await createUserPage.clickSubmit();
    
    // Verify success message and navigation back to Users list
    await expect(page).toHaveURL(/\/admin\/users/);
    await expect(page.getByText(/new user has been added/i)).toBeVisible();
    
    // Verify user appears in the Users list
    await expect(page.getByText(testData.email)).toBeVisible();
    await expect(page.getByText(testData.firstName)).toBeVisible();
    await expect(page.getByText(testData.lastName)).toBeVisible();
  });
});

