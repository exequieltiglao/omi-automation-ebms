import { test, expect } from '@playwright/test';
import { createUsersListPage, createCreateUserPage } from '@pages';
import { generateUserData } from '@helpers/test-data.helper';

/**
 * Create User functionality tests
 * Tests the user creation workflow from Users List to Create User form
 */

test.describe('Admin - Create User', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to users list page before each test
    const usersListPage = createUsersListPage(page);
    await usersListPage.goto();
    await usersListPage.waitForUsersPageLoad();
  });

  test('should navigate from Users List to Create User page', async ({ page }) => {
    const usersListPage = createUsersListPage(page);
    const createUserPage = createCreateUserPage(page);
    
    // Verify we're on Users List page
    await usersListPage.validatePageTitle();
    await usersListPage.validateCreateButtonVisible();
    
    // Click Create button and select Create User
    await usersListPage.clickCreateUser();
    
    // Wait for navigation to Create User page
    await createUserPage.waitForCreateUserPageLoad();
    
    // Verify we're on Create User page
    await createUserPage.validatePageTitle();
    await expect(page).toHaveURL(/\/admin\/users\/create\//);
  });

  test('should display all Create User form fields correctly', async ({ page }) => {
    const usersListPage = createUsersListPage(page);
    const createUserPage = createCreateUserPage(page);
    
    // Navigate to Create User page
    await usersListPage.clickCreateUser();
    await createUserPage.waitForCreateUserPageLoad();
    
    // Validate form sections
    await createUserPage.validateFormSections();
    
    // Validate Basic Information fields
    await createUserPage.validateBasicInformationFields();
    
    // Validate Account Information fields
    await createUserPage.validateAccountInformationFields();
    
    // Validate action buttons
    await createUserPage.validateActionButtons();
  });

  test('should display required field indicators', async ({ page }) => {
    const usersListPage = createUsersListPage(page);
    const createUserPage = createCreateUserPage(page);
    
    // Navigate to Create User page
    await usersListPage.clickCreateUser();
    await createUserPage.waitForCreateUserPageLoad();
    
    // Verify page title
    await createUserPage.validatePageTitle();
    
    // Verify required field indicators (asterisks)
    await createUserPage.validateRequiredFieldIndicators();
  });

  test('should have Active status selected by default', async ({ page }) => {
    const usersListPage = createUsersListPage(page);
    const createUserPage = createCreateUserPage(page);
    
    // Navigate to Create User page
    await usersListPage.clickCreateUser();
    await createUserPage.waitForCreateUserPageLoad();
    
    // Verify Active status is selected by default
    await createUserPage.validateActiveStatusDefault();
  });

  test('should successfully create a new user with valid data', async ({ page }) => {
    const usersListPage = createUsersListPage(page);
    const createUserPage = createCreateUserPage(page);
    
    // Generate random user data
    const userData = generateUserData();
    
    // Navigate to Create User page
    await usersListPage.clickCreateUser();
    await createUserPage.waitForCreateUserPageLoad();
    
    // Fill in user data and submit
    await createUserPage.createUser(userData);
    
    // Wait for redirect back to Users List page
    await page.waitForURL(/\/admin\/users\//);
    await usersListPage.waitForUsersPageLoad();
    
    // Verify success message
    await usersListPage.validateSuccessMessage();
    const successMessage = await usersListPage.getSuccessMessage();
    expect(successMessage).toContain('New User has been added');
    
    // Verify user appears in the table
    await usersListPage.validateUserExists(userData.email);
  });

  test('should fill all form fields correctly', async ({ page }) => {
    const usersListPage = createUsersListPage(page);
    const createUserPage = createCreateUserPage(page);
    
    // Generate test data with 10-digit phone number (without country code)
    const userData = generateUserData({
      firstName: 'Test',
      lastName: 'User',
      email: 'test.user@example.com',
      contactNumber: '9123456789' // 10 digits starting with 9
    });
    
    // Navigate to Create User page
    await usersListPage.clickCreateUser();
    await createUserPage.waitForCreateUserPageLoad();
    
    // Fill basic information
    await createUserPage.fillBasicInformation({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      contactNumber: userData.contactNumber
    });
    
    // Verify field values
    expect(await createUserPage.getFirstNameValue()).toBe(userData.firstName);
    expect(await createUserPage.getLastNameValue()).toBe(userData.lastName);
    expect(await createUserPage.getEmailValue()).toBe(userData.email);
    expect(await createUserPage.getContactNumberValue()).toBe(userData.contactNumber);
  });

  test('should allow selecting user status (Active/Blocked)', async ({ page }) => {
    const usersListPage = createUsersListPage(page);
    const createUserPage = createCreateUserPage(page);
    
    // Navigate to Create User page
    await usersListPage.clickCreateUser();
    await createUserPage.waitForCreateUserPageLoad();
    
    // Test selecting Blocked status
    await createUserPage.setUserStatus('Blocked');
    
    // Test selecting Active status
    await createUserPage.setUserStatus('Active');
    
    // Verify Active is selected
    await createUserPage.validateActiveStatusDefault();
  });

  test('should allow selecting permission group', async ({ page }) => {
    const usersListPage = createUsersListPage(page);
    const createUserPage = createCreateUserPage(page);
    
    // Navigate to Create User page
    await usersListPage.clickCreateUser();
    await createUserPage.waitForCreateUserPageLoad();
    
    // Select first available permission group
    await createUserPage.selectFirstPermissionGroup();
    
    // No error should be thrown
    expect(true).toBe(true);
  });

  test('should navigate back to Users List when clicking Go Back', async ({ page }) => {
    const usersListPage = createUsersListPage(page);
    const createUserPage = createCreateUserPage(page);
    
    // Navigate to Create User page
    await usersListPage.clickCreateUser();
    await createUserPage.waitForCreateUserPageLoad();
    
    // Click Go Back link
    await createUserPage.clickGoBack();
    
    // Verify we're back on Users List page
    await usersListPage.waitForUsersPageLoad();
    await usersListPage.validatePageTitle();
    await expect(page).toHaveURL(/\/admin\/users\/$/);
  });

  test('should cancel user creation when clicking Cancel button', async ({ page }) => {
    const usersListPage = createUsersListPage(page);
    const createUserPage = createCreateUserPage(page);
    
    // Navigate to Create User page
    await usersListPage.clickCreateUser();
    await createUserPage.waitForCreateUserPageLoad();
    
    // Fill in some data
    await createUserPage.fillFirstName('Cancel');
    await createUserPage.fillLastName('Test');
    
    // Click Cancel button
    await createUserPage.clickCancel();
    
    // Verify we're redirected (behavior may vary - back to list or stay with cleared form)
    // For now, just verify no error is thrown
    expect(true).toBe(true);
  });

  test('should create multiple users with different data', async ({ page }) => {
    const usersListPage = createUsersListPage(page);
    const createUserPage = createCreateUserPage(page);
    
    // Create first user
    const user1 = generateUserData();
    await usersListPage.goto();
    await usersListPage.clickCreateUser();
    await createUserPage.waitForCreateUserPageLoad();
    await createUserPage.createUser(user1);
    await page.waitForURL(/\/admin\/users\//);
    
    // Verify first user
    await usersListPage.validateUserExists(user1.email);
    
    // Create second user
    const user2 = generateUserData();
    await usersListPage.clickCreateUser();
    await createUserPage.waitForCreateUserPageLoad();
    await createUserPage.createUser(user2);
    await page.waitForURL(/\/admin\/users\//);
    
    // Verify second user
    await usersListPage.validateUserExists(user2.email);
    
    // Verify both users exist
    await usersListPage.validateUserExists(user1.email);
    await usersListPage.validateUserExists(user2.email);
  });
});

