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

// Page factory
export { 
  PageFactory, 
  createLoginPage, 
  createDashboardPage, 
  createPageByUrl 
} from './page.factory';

// Re-export types for convenience
export type { LoginCredentials } from '@helpers/auth.helper';
