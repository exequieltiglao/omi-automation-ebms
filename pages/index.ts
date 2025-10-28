/**
 * Page Object Models Export
 * Centralized export of all page objects and factory
 * Provides clean imports for test files
 */

// Base page class
export { BasePage } from './base.page';

// Page objects
export { LoginPage } from './auth/login.page';
export { DashboardPage } from './dashboard/dashboard.page';
export { UsersPage } from './users/users.page';
export { CreateUserPage } from './users/create-user.page';

// Page factory
export { 
  PageFactory, 
  createLoginPage, 
  createDashboardPage,
  createUsersPage,
  createCreateUserPage,
  createPageByUrl 
} from './page.factory';

// Re-export types for convenience
export type { LoginCredentials } from '@helpers/auth.helper';
