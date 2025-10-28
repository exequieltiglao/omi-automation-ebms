import { getEnvironmentConfig } from '@config/env.config';

/**
 * MCP Server helper functions
 * Provides wrapper functions for Playwright MCP Server operations
 * Ensures all browser automation is routed through MCP
 */

/**
 * Performs login using MCP Server
 * @param email - Email address
 * @param password - Password
 * @returns Object with navigation, fill, and click result
 */
export async function mcpLogin(email: string, password: string) {
  const config = getEnvironmentConfig();
  const loginUrl = `${config.baseUrl}/login`;
  
  // Note: This function signature is provided for documentation
  // Actual MCP calls will be made directly in test files
  return {
    loginUrl,
    email,
    password,
    message: 'MCP login should be handled directly in tests using MCP Server tools'
  };
}

/**
 * Gets the base URL from environment configuration
 * @returns Base URL string
 */
export function getBaseUrl(): string {
  const config = getEnvironmentConfig();
  return config.baseUrl;
}

/**
 * Gets admin credentials from environment configuration
 * @returns Admin credentials object
 */
export function getAdminCredentials() {
  const config = getEnvironmentConfig();
  return {
    email: config.adminEmail,
    password: config.adminPassword
  };
}

/**
 * Validates URL pattern
 * @param url - URL to validate
 * @param pattern - Pattern to match against
 * @returns True if URL matches pattern
 */
export function validateUrl(url: string, pattern: string | RegExp): boolean {
  if (typeof pattern === 'string') {
    return url.includes(pattern);
  } else {
    return pattern.test(url);
  }
}

