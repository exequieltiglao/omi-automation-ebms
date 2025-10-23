import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';
import { LoginCredentials } from '@helpers/auth.helper';

/**
 * Login Page Object Model
 * Encapsulates all login page functionality and locators
 * Provides methods for login form interactions and validations
 */
export class LoginPage extends BasePage {
  // Page-specific locators
  private readonly welcomeText: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly submitButton: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly rememberMeCheckbox: Locator;
  private readonly loginForm: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize login page locators
    this.welcomeText = page.getByText(/welcome back!/i);
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByRole('textbox', { name: /password/i });
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.submitButton = page.getByTestId('submit');
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: /remember me/i });
    this.loginForm = page.locator('form').first();
  }

  /**
   * Navigates to the login page
   */
  async goto(): Promise<void> {
    await this.navigateTo('/login');
    await this.waitForPageLoad();
  }

  /**
   * Waits for login page to be fully loaded
   */
  async waitForLoginPageLoad(): Promise<void> {
    await this.waitForElement(this.welcomeText);
    await this.waitForElement(this.emailInput);
    await this.waitForElement(this.passwordInput);
    await this.waitForElement(this.loginButton);
  }

  /**
   * Fills the email input field
   * @param email - Email address to enter
   */
  async fillEmail(email: string): Promise<void> {
    await this.waitForElement(this.emailInput);
    await this.emailInput.clear();
    await this.emailInput.fill(email);
  }

  /**
   * Fills the password input field
   * @param password - Password to enter
   */
  async fillPassword(password: string): Promise<void> {
    await this.waitForElement(this.passwordInput);
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }

  /**
   * Clicks the login/submit button
   */
  async clickLoginButton(): Promise<void> {
    await this.waitForElement(this.submitButton);
    await this.submitButton.click();
  }

  /**
   * Performs complete login with provided credentials
   * @param credentials - Login credentials (email and password)
   */
  async login(credentials?: LoginCredentials): Promise<void> {
    const { email, password } = credentials || {
      email: this.config.testEmail,
      password: this.config.testPassword,
    };

    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
    
    // Wait for navigation after login
    await this.waitForUrl(/\/$|dashboard|home|main/);
  }

  /**
   * Performs login with default test credentials
   */
  async loginWithDefaultCredentials(): Promise<void> {
    await this.login();
  }

  /**
   * Clicks the forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.waitForElement(this.forgotPasswordLink);
    await this.forgotPasswordLink.click();
  }

  /**
   * Toggles the remember me checkbox
   * @param checked - Whether to check or uncheck the box
   */
  async toggleRememberMe(checked: boolean = true): Promise<void> {
    await this.waitForElement(this.rememberMeCheckbox);
    
    const isChecked = await this.rememberMeCheckbox.isChecked();
    if (isChecked !== checked) {
      await this.rememberMeCheckbox.click();
    }
  }

  /**
   * Clears all form fields
   */
  async clearForm(): Promise<void> {
    await this.emailInput.clear();
    await this.passwordInput.clear();
  }

  /**
   * Validates that login form elements are visible and enabled
   */
  async validateLoginFormElements(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    
    await expect(this.emailInput).toBeEnabled();
    await expect(this.passwordInput).toBeEnabled();
    await expect(this.loginButton).toBeEnabled();
    await expect(this.submitButton).toBeEnabled();
  }

  /**
   * Validates that welcome text is displayed
   */
  async validateWelcomeText(): Promise<void> {
    await expect(this.welcomeText).toBeVisible();
  }

  /**
   * Gets the current email value
   * @returns The email input value
   */
  async getEmailValue(): Promise<string> {
    return await this.emailInput.inputValue();
  }

  /**
   * Gets the current password value
   * @returns The password input value
   */
  async getPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }

  /**
   * Checks if remember me checkbox is checked
   * @returns True if checked, false otherwise
   */
  async isRememberMeChecked(): Promise<boolean> {
    return await this.rememberMeCheckbox.isChecked();
  }

  /**
   * Checks if login form is visible
   * @returns True if form is visible, false otherwise
   */
  async isLoginFormVisible(): Promise<boolean> {
    return await this.isElementVisible(this.loginForm);
  }

  /**
   * Checks if forgot password link is visible
   * @returns True if link is visible, false otherwise
   */
  async isForgotPasswordLinkVisible(): Promise<boolean> {
    return await this.isElementVisible(this.forgotPasswordLink);
  }

  /**
   * Attempts login with invalid credentials and validates error handling
   * @param invalidCredentials - Invalid credentials to test
   */
  async attemptInvalidLogin(invalidCredentials: LoginCredentials): Promise<void> {
    await this.fillEmail(invalidCredentials.email);
    await this.fillPassword(invalidCredentials.password);
    await this.clickLoginButton();
    
    // Wait for error message or stay on login page
    await this.waitForElement(this.loginForm);
  }

  /**
   * Validates that user remains on login page (for failed login attempts)
   */
  async validateStillOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/login/);
    await expect(this.loginForm).toBeVisible();
  }
}
