<!-- b8fbd386-6dd4-4e25-b6e3-2cb910f017bc 5c3bbcc6-b47a-4fec-9b9c-b05b6895e374 -->
# EBMS Create User Automation Tests

## Implementation Strategy

This plan implements end-to-end tests for the Create User flow in the EBMS system using the Playwright MCP Server to handle all browser interactions.

## Changes Required

### 1. Update Environment Configuration

**File**: `config/env.config.ts`

- Add new staging URLs (http://52.76.90.136:8000)
- Add Super Admin credentials (admin@example.com / admin123)

### 2. Create Users Page Object Model

**File**: `pages/users/users.page.ts` (new file)

- Extend `BasePage` class
- Add locators for Create button and dropdown menu
- Implement `clickCreateUser()` method to navigate to Create User page
- Add validation methods for Users page elements

### 3. Create User Form Page Object Model

**File**: `pages/users/create-user.page.ts` (new file)

- Extend `BasePage` class
- Define locators for all form fields:
- Basic Information: First Name, Last Name, Email Address, Contact Number
- Account Information: Permission Group dropdown, User Status radio buttons
- Implement methods to interact with form fields
- Add validation for Configure Permission button visibility after Permission Group selection
- Add form submission and validation methods

### 4. Update Page Factory

**File**: `pages/index.ts`

- Export new `UsersPage` class
- Export new `CreateUserPage` class
- Add factory functions `createUsersPage()` and `createCreateUserPage()`

### 5. Create Users Test Specification with MCP Integration

**File**: `tests/users/create-user.spec.ts` (new file)

- Use Playwright MCP Server for all browser interactions
- Test 1: Navigate to Create User page via Create > Create User button
  - Navigate to Users page
  - Click Create dropdown
  - Click Create User option
  - Validate URL is `/admin/users/create`
- Test 2: Validate Create User form structure
  - Verify Basic Information section with required fields
  - Verify Account Information section with required fields
  - Verify default User Status is "Active"
- Test 3: Validate Permission Group Configure button behavior
  - Select a Permission Group from dropdown
  - Verify Configure Permission button appears
  - Validate button is visible only after selection
- Test 4: Create User submission and verification
- Generate completely unique test data programmatically to avoid conflicts
- Use `generateUniqueTestData()` helper function that creates:
  - First name: Randomly selected from array ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Jessica', 'William', 'Ashley']
  - Last name: Randomly selected from array ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
  - Email: `{firstname}{lastname}{3-digit-random}@test.com` (e.g., johndoe234@test.com, sarahgarcia567@test.com)
  - Phone number: Random 10-digit number starting with 9 (e.g., 9154783621)
  - Permission group: Randomly selected from ['Admin', 'Client', 'Mall Manager']
- Fill all required fields with generated data
- Click Submit/Create button to create the user
- Assert success toast/message appears ("New User has been added!")
- Verify redirect to Users list page (/admin/users/)
- Assert the new user appears in the Users list table
- Verify First Name, Last Name, and Email are visible

### 6. Create MCP Integration Helper

**File**: `helpers/mcp.helper.ts` (new file)

- Wrapper functions for MCP Server operations
- Login with MCP navigate and fill/click actions
- Navigation helpers using MCP
- Screenshot and validation utilities
- Error handling for MCP operations

### 7. Update .env Configuration

**File**: `.env` (create if missing)

- Set BASE_URL=http://52.76.90.136:8000
- Set ADMIN_EMAIL=admin@example.com
- Set ADMIN_PASSWORD=admin123

## Test Flow Execution

1. **Setup**: MCP Server navigates to staging URL and authenticates as Super Admin
2. **Navigate to Users Page**: MCP clicks through navigation to reach Users page
3. **Access Create User**: MCP clicks Create > Create User
4. **Validate Form**: MCP captures page state and validates all form elements
5. **Fill Form with Programmatically Generated Data**: Use timestamp-based unique email
6. **Submit Form**: Click Submit/Create button to create the user
7. **Verify Success**: Check success message and redirect to Users list
8. **Verify in List**: Assert new user appears in the table with correct data
9. **Teardown**: MCP closes browser session

## Key Implementation Details

- All browser automation routed through MCP Server (no static simulation)
- Use `mcp_playwright-mcp-server_playwright_navigate` for page navigation
- Use `mcp_playwright-mcp-server_playwright_click` for button/link clicks
- Use `mcp_playwright-mcp-server_playwright_fill` for form inputs
- Use `mcp_playwright-mcp-server_playwright_get_visible_html` for element validation
- Use `mcp_playwright-mcp-server_playwright_screenshot` for visual verification
- Page Object Models follow existing patterns (BasePage, role-based locators)
- Tests use fixtures for authentication state management
- Test data is generated programmatically to ensure uniqueness (timestamp-based emails)

### Implementation Status

- [x] Update env.config.ts to support staging URLs and Super Admin credentials
- [x] Create mcp.helper.ts with wrapper functions for MCP Server operations
- [x] Create users.page.ts Page Object Model with Create User navigation
- [x] Create create-user.page.ts Page Object Model with form fields and validations
- [x] Update pages/index.ts to export new page objects and factory functions
- [x] Update test URLs to use `/admin/users/` and `/admin/users/create/`
- [x] Implement create-user.spec.ts with test for form submission and user creation
- [ ] Run tests to validate MCP Server handles all browser automation correctly
