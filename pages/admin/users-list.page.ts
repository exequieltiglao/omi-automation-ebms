import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Users List Page Object Model
 * Encapsulates the admin users list page functionality
 * URL: /admin/users/
 */
export class UsersListPage extends BasePage {
  // Navigation elements
  private readonly smLogo: Locator;
  private readonly calendarLink: Locator;
  private readonly bookingsLink: Locator;
  private readonly phonebookLink: Locator;
  private readonly userAvatar: Locator;
  
  // Page elements
  private readonly usersTitle: Locator;
  private readonly usersTab: Locator;
  private readonly permissionGroupsTab: Locator;
  private readonly createButton: Locator;
  private readonly createDropdown: Locator;
  private readonly createUserOption: Locator;
  private readonly createPermissionGroupOption: Locator;
  
  // Search and filter
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly filterButton: Locator;
  private readonly showingText: Locator;
  
  // Table elements
  private readonly usersTable: Locator;
  private readonly tableCheckboxColumn: Locator;
  private readonly tableFirstNameColumn: Locator;
  private readonly tableLastNameColumn: Locator;
  private readonly tableEmailColumn: Locator;
  private readonly tableStatusColumn: Locator;
  private readonly tableCreatedOnColumn: Locator;
  private readonly tablePermissionGroupColumn: Locator;
  private readonly tableActionColumn: Locator;
  
  // Messages
  private readonly successBanner: Locator;
  private readonly goBackLink: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize navigation locators
    this.smLogo = page.locator('text=SM').first();
    this.calendarLink = page.getByRole('link', { name: /calendar/i });
    this.bookingsLink = page.getByRole('link', { name: /bookings/i });
    this.phonebookLink = page.getByRole('link', { name: /phonebook/i });
    this.userAvatar = page.locator('text=HS').first();
    
    // Initialize page element locators
    this.usersTitle = page.getByRole('heading', { name: /^users$/i });
    this.usersTab = page.getByRole('tab', { name: /^users$/i }).or(page.getByText(/^users$/i).first());
    this.permissionGroupsTab = page.getByRole('tab', { name: /permission groups/i });
    this.createButton = page.getByRole('button', { name: /create/i });
    this.createDropdown = page.locator('[role="menu"], .dropdown-menu').or(page.locator('div:has-text("Create User"):visible'));
    this.createUserOption = page.getByText(/^create user$/i, { exact: false }).or(page.locator('button:has-text("Create User"), a:has-text("Create User")'));
    this.createPermissionGroupOption = page.getByText(/^create permission group$/i, { exact: false });
    
    // Initialize search and filter locators
    this.searchInput = page.getByPlaceholder(/search by first name, last name or em/i).or(page.locator('input[type="text"]').first());
    this.searchButton = page.getByRole('button', { name: /search/i });
    this.filterButton = page.getByRole('button', { name: /filter/i });
    this.showingText = page.locator('text=/showing \\d+ out of \\d+ users/i');
    
    // Initialize table locators
    this.usersTable = page.locator('table').first();
    this.tableCheckboxColumn = page.locator('th', { hasText: /checkbox/i }).or(page.locator('th').first());
    this.tableFirstNameColumn = page.locator('th:has-text("FIRST NAME")');
    this.tableLastNameColumn = page.locator('th:has-text("LAST NAME")');
    this.tableEmailColumn = page.locator('th:has-text("EMAIL")');
    this.tableStatusColumn = page.locator('th:has-text("STATUS")');
    this.tableCreatedOnColumn = page.locator('th:has-text("CREATED ON")');
    this.tablePermissionGroupColumn = page.locator('th:has-text("PERMISSION GROUP")');
    this.tableActionColumn = page.locator('th:has-text("ACTION")');
    
    // Initialize message locators
    this.successBanner = page.locator('.alert-success, [role="alert"]').or(page.locator('text=/new user has been added/i'));
    this.goBackLink = page.getByRole('link', { name: /go back/i });
  }

  /**
   * Navigates to the users list page
   */
  async goto(): Promise<void> {
    const url = `${this.config.adminBaseUrl}/admin/users/`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.waitForPageLoad();
  }

  /**
   * Waits for the users list page to be fully loaded
   */
  async waitForUsersPageLoad(): Promise<void> {
    await this.waitForElement(this.usersTitle);
    await this.waitForElement(this.createButton);
  }

  /**
   * Clicks the Create button to open dropdown
   */
  async clickCreateButton(): Promise<void> {
    await this.waitForElement(this.createButton);
    await this.createButton.click();
    
    // Wait for dropdown to be visible
    await this.page.waitForTimeout(500); // Small wait for dropdown animation
  }

  /**
   * Clicks "Create User" option from the dropdown
   */
  async clickCreateUser(): Promise<void> {
    await this.clickCreateButton();
    await this.createUserOption.click();
  }

  /**
   * Clicks "Create Permission Group" option from the dropdown
   */
  async clickCreatePermissionGroup(): Promise<void> {
    await this.clickCreateButton();
    await this.createPermissionGroupOption.click();
  }

  /**
   * Searches for a user by name or email
   * @param searchTerm - The search term
   */
  async searchUser(searchTerm: string): Promise<void> {
    await this.waitForElement(this.searchInput);
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Clicks the filter button
   */
  async clickFilter(): Promise<void> {
    await this.filterButton.click();
  }

  /**
   * Validates that the success message is displayed
   * @param expectedMessage - Optional expected message text
   */
  async validateSuccessMessage(expectedMessage?: string): Promise<void> {
    await expect(this.successBanner).toBeVisible();
    
    if (expectedMessage) {
      await expect(this.successBanner).toContainText(expectedMessage);
    }
  }

  /**
   * Gets the success message text
   * @returns Success message text
   */
  async getSuccessMessage(): Promise<string> {
    await this.waitForElement(this.successBanner);
    return await this.getElementText(this.successBanner);
  }

  /**
   * Validates the users table structure
   */
  async validateTableStructure(): Promise<void> {
    await expect(this.usersTable).toBeVisible();
    await expect(this.tableFirstNameColumn).toBeVisible();
    await expect(this.tableLastNameColumn).toBeVisible();
    await expect(this.tableEmailColumn).toBeVisible();
    await expect(this.tableStatusColumn).toBeVisible();
    await expect(this.tableCreatedOnColumn).toBeVisible();
    await expect(this.tablePermissionGroupColumn).toBeVisible();
    await expect(this.tableActionColumn).toBeVisible();
  }

  /**
   * Gets user data from the table by email
   * @param email - User email to search for
   * @returns Object with user data or null if not found
   */
  async getUserByEmail(email: string): Promise<{
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    permissionGroup: string;
  } | null> {
    const row = this.page.locator(`tr:has-text("${email}")`);
    
    if (!(await row.isVisible())) {
      return null;
    }
    
    const cells = row.locator('td');
    
    return {
      firstName: await cells.nth(1).textContent() || '',
      lastName: await cells.nth(2).textContent() || '',
      email: await cells.nth(3).textContent() || '',
      status: await cells.nth(4).textContent() || '',
      permissionGroup: await cells.nth(6).textContent() || '',
    };
  }

  /**
   * Validates that a user exists in the table
   * @param email - User email to validate
   */
  async validateUserExists(email: string): Promise<void> {
    const row = this.page.locator(`tr:has-text("${email}")`);
    await expect(row).toBeVisible();
  }

  /**
   * Clicks edit button for a user
   * @param email - User email
   */
  async clickEditUser(email: string): Promise<void> {
    const row = this.page.locator(`tr:has-text("${email}")`);
    const editButton = row.locator('[aria-label="edit"], button:has-text("edit")').first();
    await editButton.click();
  }

  /**
   * Clicks delete button for a user
   * @param email - User email
   */
  async clickDeleteUser(email: string): Promise<void> {
    const row = this.page.locator(`tr:has-text("${email}")`);
    const deleteButton = row.locator('[aria-label="delete"], button:has-text("delete")').first();
    await deleteButton.click();
  }

  /**
   * Gets the total count of users from the "Showing X out of Y users" text
   * @returns Total user count
   */
  async getTotalUserCount(): Promise<number> {
    const text = await this.showingText.textContent();
    const match = text?.match(/showing \d+ out of (\d+) users/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  /**
   * Validates the page title
   */
  async validatePageTitle(): Promise<void> {
    await expect(this.usersTitle).toBeVisible();
    await expect(this.usersTitle).toHaveText(/users/i);
  }

  /**
   * Validates the Users tab is active
   */
  async validateUsersTabActive(): Promise<void> {
    await expect(this.usersTab).toBeVisible();
  }

  /**
   * Clicks on Permission Groups tab
   */
  async clickPermissionGroupsTab(): Promise<void> {
    await this.permissionGroupsTab.click();
    await this.waitForPageLoad();
  }

  /**
   * Validates the create button is visible
   */
  async validateCreateButtonVisible(): Promise<void> {
    await expect(this.createButton).toBeVisible();
    await expect(this.createButton).toBeEnabled();
  }
}

