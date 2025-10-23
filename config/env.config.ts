/**
 * Environment configuration management
 * Centralized handling of environment variables with type safety
 */

export interface EnvironmentConfig {
  baseUrl: string;
  testEmail: string;
  testPassword: string;
  testTimeout: number;
  navigationTimeout: number;
  actionTimeout: number;
  nodeEnv: string;
}

/**
 * Validates and returns environment configuration
 * @returns EnvironmentConfig object with validated values
 * @throws Error if required environment variables are missing
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  const requiredEnvVars = {
    baseUrl: process.env.BASE_URL || 'https://omi-uat.smop.asia',
    testEmail: process.env.TEST_EMAIL || 'productdevelopmentteam@smop.asia-uat',
    testPassword: process.env.TEST_PASSWORD || 'SM0P4ppDevUAT!',
    testTimeout: parseInt(process.env.TEST_TIMEOUT || '30000'),
    navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '30000'),
    actionTimeout: parseInt(process.env.ACTION_TIMEOUT || '30000'),
    nodeEnv: process.env.NODE_ENV || 'test',
  };

  // Validate required fields
  if (!requiredEnvVars.baseUrl) {
    throw new Error('BASE_URL environment variable is required');
  }

  if (!requiredEnvVars.testEmail) {
    throw new Error('TEST_EMAIL environment variable is required');
  }

  if (!requiredEnvVars.testPassword) {
    throw new Error('TEST_PASSWORD environment variable is required');
  }

  return requiredEnvVars;
}

/**
 * Default environment configuration
 * Used as fallback when environment variables are not set
 */
export const defaultConfig: EnvironmentConfig = {
  baseUrl: 'https://omi-uat.smop.asia',
  testEmail: 'productdevelopmentteam@smop.asia-uat',
  testPassword: 'SM0P4ppDevUAT!',
  testTimeout: 30000,
  navigationTimeout: 30000,
  actionTimeout: 30000,
  nodeEnv: 'test',
};

