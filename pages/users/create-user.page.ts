import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Create User Page Object Model
 * Encapsulates all Create User form functionality and locators
 * Provides methods for form field interactions and validations
 */
export class CreateUserPage extends BasePage {
  // Basic Information section
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly contactNumberInput: Locator;
  
  // Account Information section
  private readonly permissionGroupSelect: Locator;
  private readonly configurePermissionButton: Locator;
  private readonly userStatusActiveRadio: Locator;
  private readonly userStatusBlockedRadio: Locator;
  
  // Section headers
  private readonly basicInfoSection: Locator;
  private readonly accountInfoSection: Locator;
  
  // Form buttons
  private readonly submitButton: Locator;
  private readonly cancelButton: Locator;
  
  // Page title
  private readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    
    this.pageTitle = page.getByRole('heading', { name: /create user/i });
    
    // Basic Information locators
    this.firstNameInput = page.getByLabel(/first name/i);
    this.lastNameInput = page.getByLabel(/last name/i);
    this.emailInput = page.getByLabel(/email address/i);
    this.contactNumberInput = page.locator('#input-contact-number');

    
    // Account Information locators
    this.permissionGroupSelect = page.getByLabel(/permission group/i);
    this.configurePermissionButton = page.getByRole('button', { name: /configure permission/i });
    this.userStatusActiveRadio = page.getByLabel(/active/i);
    this.userStatusBlockedRadio = page.getByLabel(/blocked/i);
    
    // Section headers
    this.basicInfoSection = page.locator('section, div').filter({ hasText: /basic information/i });
    this.accountInfoSection = page.locator('section, div').filter({ hasText: /account information/i });
    
    // Form buttons
    this.submitButton = page.getByRole('button', { name: /submit|create|save/i });
    this.cancelButton = page.getByRole('button', { name: /cancel/i });
  }

  /**
   * Navigates to the Create User page
   */
  async goto(): Promise<void> {
    await this.navigateTo('/admin/users/create/');
    await this.waitForPageLoad();
    await this.waitForLoadingToComplete();
  }

  /**
   * Waits for the Create User page to be fully loaded
   */
  async waitForCreateUserPageLoad(): Promise<void> {
    await this.waitForElement(this.pageTitle);
    await this.waitForElement(this.firstNameInput);
    await this.waitForElement(this.submitButton);
  }

  /**
   * Validates that the Create User page is loaded
   */
  async validateCreateUserPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
  }

  /**
   * Validates Basic Information section and its required fields
   */
  async validateBasicInformationSection(): Promise<void> {
    // Verify First Name field
    await expect(this.firstNameInput).toBeVisible();
    
    // Verify Last Name field
    await expect(this.lastNameInput).toBeVisible();
    
    // Verify Email Address field
    await expect(this.emailInput).toBeVisible();
    
    // Verify Contact Number field
    await expect(this.contactNumberInput).toBeVisible();
  }

  /**
   * Validates Account Information section and its fields
   */
  async validateAccountInformationSection(): Promise<void> {
    // Verify Permission Group dropdown
    await expect(this.permissionGroupSelect).toBeVisible();
    
    // Verify User Status radio buttons
    await expect(this.userStatusActiveRadio).toBeVisible();
    await expect(this.userStatusBlockedRadio).toBeVisible();
    
    // Verify default selection is Active
    await expect(this.userStatusActiveRadio).toBeChecked();
  }

  /**
   * Validates that User Status default is "Active"
   */
  async validateDefaultUserStatus(): Promise<void> {
    const isActiveChecked = await this.userStatusActiveRadio.isChecked();
    expect(isActiveChecked).toBeTruthy();
  }

  /**
   * Fills the First Name field
   * @param firstName - First name value
   */
  async fillFirstName(firstName: string): Promise<void> {
    await this.waitForElement(this.firstNameInput);
    await this.firstNameInput.clear();
    await this.firstNameInput.fill(firstName);
  }

  /**
   * Fills the Last Name field
   * @param lastName - Last name value
   */
  async fillLastName(lastName: string): Promise<void> {
    await this.waitForElement(this.lastNameInput);
    await this.lastNameInput.clear();
    await this.lastNameInput.fill(lastName);
  }

  /**
   * Fills the Email Address field
   * @param email - Email address value
   */
  async fillEmail(email: string): Promise<void> {
    await this.waitForElement(this.emailInput);
    await this.emailInput.clear();
    await this.emailInput.fill(email);
  }

  /**
   * Fills the Contact Number field
   * @param contactNumber - Contact number value
   */
  async fillContactNumber(contactNumber: string): Promise<void> {
    await this.waitForElement(this.contactNumberInput);
    await this.contactNumberInput.clear();
    await this.contactNumberInput.fill(contactNumber);
  }

  /**
   * Selects a Permission Group from the dropdown
   * @param permissionGroup - Permission group name to select
   */
  async selectPermissionGroup(permissionGroup: string): Promise<void> {
    await expect(this.permissionGroupSelect).toBeVisible();
    // Default to "Admin" (value="1") for now, will enhance later
    // await this.permissionGroupSelect.selectOption('1');

      // Wait for dropdown to be ready
  // Select by visible label (e.g., 'Mall Manager')
  await this.permissionGroupSelect.selectOption({ label: permissionGroup });

  // Optional: verify correct selection
  const selected = await this.permissionGroupSelect.inputValue();
  expect(selected).not.toBe('');
  }

  /**
   * Validates that Configure Permission button is visible
   */
  async validateConfigurePermissionButtonVisible(): Promise<void> {
    await expect(this.configurePermissionButton).toBeVisible();
    await expect(this.configurePermissionButton).toBeEnabled();
  }

  /**
   * Validates that Configure Permission button is not visible
   */
  async validateConfigurePermissionButtonNotVisible(): Promise<void> {
    await expect(this.configurePermissionButton).not.toBeVisible();
  }

  /**
   * Clicks the Configure Permission button
   */
  async clickConfigurePermission(): Promise<void> {
    await this.validateConfigurePermissionButtonVisible();
    await this.configurePermissionButton.click();
  }

  /**
   * Selects User Status radio button
   * @param status - User status ('active' or 'blocked')
   */
  async selectUserStatus(status: 'active' | 'blocked'): Promise<void> {
    if (status === 'active') {
      await this.userStatusActiveRadio.click();
    } else {
      await this.userStatusBlockedRadio.click();
    }
  }

  /**
   * Clicks the Submit button
   */
  async clickSubmit(): Promise<void> {
    await this.waitForElement(this.submitButton);
    await this.submitButton.click();
  }

  /**
   * Clicks the Cancel button
   */
  async clickCancel(): Promise<void> {
    await this.waitForElement(this.cancelButton);
    await this.cancelButton.click();
  }

  /**
   * Validates current URL is /admin/users/create
   */
  async validateCreateUserUrl(): Promise<void> {
    await expect(this.page).toHaveURL(/admin\/users\/create/);
  }

  /**
   * Gets the selected Permission Group value
   * @returns Selected permission group as string
   */
  async getSelectedPermissionGroup(): Promise<string> {
    return await this.permissionGroupSelect.inputValue();
  }

  /**
   * Gets the selected User Status
   * @returns 'active' or 'blocked'
   */
  async getSelectedUserStatus(): Promise<'active' | 'blocked'> {
    const isActiveChecked = await this.userStatusActiveRadio.isChecked();
    return isActiveChecked ? 'active' : 'blocked';
  }

  /**
   * Fills all Basic Information fields
   * @param firstName - First name
   * @param lastName - Last name
   * @param email - Email address
   * @param contactNumber - Contact number
   */
  async fillBasicInformation(
    firstName: string,
    lastName: string,
    email: string,
    contactNumber: string
  ): Promise<void> {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.fillContactNumber(contactNumber);
  }

  /**
   * Fills all form fields
   * @param firstName - First name
   * @param lastName - Last name
   * @param email - Email address
   * @param contactNumber - Contact number
   * @param permissionGroup - Permission group name
   * @param userStatus - User status
   */
  async fillCreateUserForm(
    firstName: string,
    lastName: string,
    email: string,
    contactNumber: string,
    permissionGroup: string,
    userStatus: 'active' | 'blocked' = 'active'
  ): Promise<void> {
    await this.fillBasicInformation(firstName, lastName, email, contactNumber);
    await this.selectPermissionGroup(permissionGroup);
    await this.selectUserStatus(userStatus);
  }
}

