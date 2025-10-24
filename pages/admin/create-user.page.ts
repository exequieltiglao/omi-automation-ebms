import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';
import { UserTestData } from '@helpers/test-data.helper';

/**
 * Create User Page Object Model
 * Encapsulates the create user form functionality
 * URL: /admin/users/create/
 */
export class CreateUserPage extends BasePage {
  // Navigation
  private readonly goBackLink: Locator;
  private readonly pageTitle: Locator;
  
  // Basic Information section
  private readonly basicInfoSection: Locator;
  private readonly firstNameInput: Locator;
  private readonly firstNameLabel: Locator;
  private readonly lastNameInput: Locator;
  private readonly lastNameLabel: Locator;
  private readonly emailInput: Locator;
  private readonly emailLabel: Locator;
  private readonly countryCodeSelect: Locator;
  private readonly phoneNumberInput: Locator;
  private readonly contactNumberLabel: Locator;
  
  // Account Information section
  private readonly accountInfoSection: Locator;
  private readonly permissionGroupLabel: Locator;
  private readonly permissionGroupSelect: Locator;
  private readonly configurePermissionButton: Locator;
  
  // User Status
  private readonly userStatusLabel: Locator;
  private readonly activeRadio: Locator;
  private readonly blockedRadio: Locator;
  
  // Action buttons
  private readonly cancelButton: Locator;
  private readonly createButton: Locator;
  
  // Form elements
  private readonly form: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize navigation locators
    this.goBackLink = page.getByRole('link', { name: /go back to users/i });
    this.pageTitle = page.getByRole('heading', { name: /create user/i });
    
    // Initialize Basic Information locators
    this.basicInfoSection = page.locator('text=BASIC INFORMATION').first();
    this.firstNameLabel = page.locator('label:has-text("First Name")');
    this.firstNameInput = page.locator('input[name="first_name"]').or(page.locator('#first_name'));
    this.lastNameLabel = page.locator('label:has-text("Last Name")');
    this.lastNameInput = page.locator('input[name="last_name"]').or(page.locator('#last_name'));
    this.emailLabel = page.locator('label:has-text("Email Address")');
    this.emailInput = page.locator('input[name="email"]').or(page.locator('#email'));
    this.contactNumberLabel = page.locator('label:has-text("Contact Number")');
    this.countryCodeSelect = page.locator('select[id="country_code"]');
    this.phoneNumberInput = page.locator('input[name="phone_number"]').or(page.locator('#phone_number'));
    
    // Initialize Account Information locators
    this.accountInfoSection = page.locator('text=ACCOUNT INFORMATION').first();
    this.permissionGroupLabel = page.locator('label:has-text("Permission Group")');
    this.permissionGroupSelect = page.locator('select[id="permission_group"]');
    this.configurePermissionButton = page.getByRole('link', { name: /configure permission/i });
    
    // Initialize User Status locators
    this.userStatusLabel = page.locator('text=User Status').first();
    this.activeRadio = page.locator('input[type="radio"][value="active"]');
    this.blockedRadio = page.locator('input[type="radio"][value="blocked"]');
    
    // Initialize action button locators
    this.cancelButton = page.getByRole('button', { name: /cancel/i });
    this.createButton = page.getByRole('button', { name: /^create$/i }).last();
    
    // Initialize form locator
    this.form = page.locator('form[id="createUserForm"]');
  }

  /**
   * Navigates to the create user page
   */
  async goto(): Promise<void> {
    const url = `${this.config.adminBaseUrl}/admin/users/create/`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.waitForPageLoad();
  }

  /**
   * Waits for the create user page to be fully loaded
   */
  async waitForCreateUserPageLoad(): Promise<void> {
    await this.waitForElement(this.pageTitle);
    await this.waitForElement(this.createButton);
  }

  /**
   * Clicks the "Go Back to Users" link
   */
  async clickGoBack(): Promise<void> {
    await this.goBackLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Fills the first name field
   * @param firstName - First name value
   */
  async fillFirstName(firstName: string): Promise<void> {
    await this.waitForElement(this.firstNameInput);
    await this.firstNameInput.clear();
    await this.firstNameInput.fill(firstName);
  }

  /**
   * Fills the last name field
   * @param lastName - Last name value
   */
  async fillLastName(lastName: string): Promise<void> {
    await this.waitForElement(this.lastNameInput);
    await this.lastNameInput.clear();
    await this.lastNameInput.fill(lastName);
  }

  /**
   * Fills the email address field
   * @param email - Email address value
   */
  async fillEmail(email: string): Promise<void> {
    await this.waitForElement(this.emailInput);
    await this.emailInput.clear();
    await this.emailInput.fill(email);
  }

  /**
   * Fills the contact number field
   * @param contactNumber - Contact number value (without country code)
   */
  async fillContactNumber(contactNumber: string): Promise<void> {
    await this.waitForElement(this.phoneNumberInput);
    await this.phoneNumberInput.clear();
    await this.phoneNumberInput.fill(contactNumber);
  }

  /**
   * Fills all basic information fields
   * @param userData - User data object
   */
  async fillBasicInformation(userData: {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
  }): Promise<void> {
    await this.fillFirstName(userData.firstName);
    await this.fillLastName(userData.lastName);
    await this.fillEmail(userData.email);
    await this.fillContactNumber(userData.contactNumber);
  }

  /**
   * Selects a permission group from the dropdown
   * @param permissionGroup - Permission group name
   */
  async selectPermissionGroup(permissionGroup: string): Promise<void> {
    await this.waitForElement(this.permissionGroupSelect);
    await this.permissionGroupSelect.selectOption({ label: permissionGroup });
  }

  /**
   * Selects the first available permission group
   */
  async selectFirstPermissionGroup(): Promise<void> {
    await this.waitForElement(this.permissionGroupSelect);
    
    // Select "Admin" as the first non-placeholder option
    await this.permissionGroupSelect.selectOption({ label: 'Admin' });
  }

  /**
   * Sets the user status (Active or Blocked)
   * @param status - User status ('Active' or 'Blocked')
   */
  async setUserStatus(status: 'Active' | 'Blocked'): Promise<void> {
    const radio = status === 'Active' ? this.activeRadio : this.blockedRadio;
    await this.waitForElement(radio);
    await radio.check();
  }

  /**
   * Clicks the Cancel button
   */
  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  /**
   * Clicks the Create button to submit the form
   */
  async clickCreate(): Promise<void> {
    await this.waitForElement(this.createButton);
    await this.createButton.click();
    
    // Wait for navigation or loading to complete
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Fills the complete user form and submits
   * @param userData - Complete user test data
   */
  async createUser(userData: UserTestData): Promise<void> {
    await this.fillBasicInformation({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      contactNumber: userData.contactNumber,
    });
    
    // Select permission group if provided, otherwise use first available
    if (userData.permissionGroup) {
      await this.selectPermissionGroup(userData.permissionGroup);
    } else {
      await this.selectFirstPermissionGroup();
    }
    
    // Set user status (defaults to Active)
    await this.setUserStatus(userData.userStatus || 'Active');
    
    // Submit form
    await this.clickCreate();
  }

  /**
   * Validates the page title is displayed
   */
  async validatePageTitle(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText(/create user/i);
  }

  /**
   * Validates the form title is displayed
   */
  async validateFormTitle(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText(/create user/i);
  }

  /**
   * Validates all form sections are visible
   */
  async validateFormSections(): Promise<void> {
    await expect(this.basicInfoSection).toBeVisible();
    await expect(this.accountInfoSection).toBeVisible();
  }

  /**
   * Validates all basic information fields are visible and enabled
   */
  async validateBasicInformationFields(): Promise<void> {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.firstNameInput).toBeEnabled();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeEnabled();
    await expect(this.emailInput).toBeVisible();
    await expect(this.emailInput).toBeEnabled();
    await expect(this.phoneNumberInput).toBeVisible();
    await expect(this.phoneNumberInput).toBeEnabled();
    await expect(this.countryCodeSelect).toBeVisible();
    await expect(this.countryCodeSelect).toBeEnabled();
  }

  /**
   * Validates all account information fields are visible
   */
  async validateAccountInformationFields(): Promise<void> {
    await expect(this.permissionGroupSelect).toBeVisible();
    await expect(this.activeRadio).toBeVisible();
    await expect(this.blockedRadio).toBeVisible();
  }

  /**
   * Validates required field indicators are present
   */
  async validateRequiredFieldIndicators(): Promise<void> {
    await expect(this.firstNameLabel).toContainText('*');
    await expect(this.lastNameLabel).toContainText('*');
    await expect(this.emailLabel).toContainText('*');
    await expect(this.contactNumberLabel).toContainText('*');
  }

  /**
   * Validates the Active status is selected by default
   */
  async validateActiveStatusDefault(): Promise<void> {
    await expect(this.activeRadio).toBeChecked();
  }

  /**
   * Validates all action buttons are visible
   */
  async validateActionButtons(): Promise<void> {
    await expect(this.cancelButton).toBeVisible();
    await expect(this.cancelButton).toBeEnabled();
    await expect(this.createButton).toBeVisible();
    await expect(this.createButton).toBeEnabled();
  }

  /**
   * Validates the complete create user form
   */
  async validateCreateUserForm(): Promise<void> {
    await this.validatePageTitle();
    await this.validateFormSections();
    await this.validateBasicInformationFields();
    await this.validateAccountInformationFields();
    await this.validateActionButtons();
  }

  /**
   * Gets the current value of first name field
   */
  async getFirstNameValue(): Promise<string> {
    return await this.firstNameInput.inputValue();
  }

  /**
   * Gets the current value of last name field
   */
  async getLastNameValue(): Promise<string> {
    return await this.lastNameInput.inputValue();
  }

  /**
   * Gets the current value of email field
   */
  async getEmailValue(): Promise<string> {
    return await this.emailInput.inputValue();
  }

  /**
   * Gets the current value of contact number field
   */
  async getContactNumberValue(): Promise<string> {
    return await this.phoneNumberInput.inputValue();
  }

  /**
   * Clears all form fields
   */
  async clearForm(): Promise<void> {
    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
    await this.emailInput.clear();
    await this.phoneNumberInput.clear();
  }
}

