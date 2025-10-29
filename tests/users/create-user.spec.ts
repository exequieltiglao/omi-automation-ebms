import { test, expect } from '@playwright/test';
import { createUsersPage, createCreateUserPage, PageFactory } from '@pages';

/**
 * Create User functionality tests
 * Tests the Create User flow in the EBMS system
 * Note: These tests are designed to be executed via MCP Server
 */

/**
 * Generates unique test data for user creation to avoid conflicts
 * Uses random selection from arrays for variety and uniqueness
 * @returns Test data object with unique values
 */
function generateUniqueTestData() {
  // Array of first names to choose from
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Jessica', 'William', 'Ashley'];
  
  // Array of last names to choose from
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  // Email domains pool
  const emailDomains = ['test.com', 'gmail.com', 'yahoo.com', 'example.com', 'rocketmail.com', 'outlook.com', 'proton.me'];
  
  // Randomly select first and last name
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  // Generate random 3-digit number for email
  const randomThreeDigits = Math.floor(100 + Math.random() * 900); // 100-999
  
  // Generate random phone number (10 digits starting with 9)
  const randomPhone = Math.floor(9000000000 + Math.random() * 999999999).toString();
  
  // Default to "Admin" for now (value="1"), will enhance later
  const permissionGroups = ['Admin', 'Mall Manager', 'Client'];

  const randomGroup = permissionGroups[Math.floor(Math.random() * permissionGroups.length)];

  
  // Pick a random domain
  const domain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
  
  // Create email from firstname + lastname + random 3 digits and chosen domain
  const email = `${firstName.toLowerCase()}${lastName.toLowerCase()}${randomThreeDigits}@${domain}`;
  
  return {
    firstName,
    lastName,
    email,
    contactNumber: randomPhone,
    permissionGroup: randomGroup
  };
}

test.describe('Create User - EBMS System', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure we don't reuse stale Page Object instances across tests
    PageFactory.clearCache();
    await page.goto('/admin/users/', { waitUntil: 'domcontentloaded' });
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

  test.skip('should show Configure Permission button after selecting Permission Group', async ({ page }) => {
    // Skipping this test for now - will enhance permission group selection later
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
    const testData = generateUniqueTestData();
    
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
    await expect(page.locator('#successToast').or(page.getByText(/New User has been added!/)).first()).toBeVisible();
    
    // Verify user appears in the Users list (scoped to the row with the email)
    const row = page.getByRole('row').filter({ has: page.getByText(testData.email) });
    await expect(row).toBeVisible();
    await expect(row).toContainText(testData.firstName);
    await expect(row).toContainText(testData.lastName);
  });
});

