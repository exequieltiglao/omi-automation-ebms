/**
 * Environment configuration management
 * Centralized handling of environment variables with type safety
 */

export interface EnvironmentConfig {
  baseUrl: string;
  adminBaseUrl: string;
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
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    adminBaseUrl: process.env.ADMIN_BASE_URL || 'http://localhost:8001',
    testEmail: process.env.TEST_EMAIL || 'test@example.com',
    testPassword: process.env.TEST_PASSWORD || 'password123',
    testTimeout: parseInt(process.env.TEST_TIMEOUT || '30000'),
    navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '30000'),
    actionTimeout: parseInt(process.env.ACTION_TIMEOUT || '30000'),
    nodeEnv: process.env.NODE_ENV || 'development',
  };

  // Validate required fields
  if (!requiredEnvVars.baseUrl) {
    throw new Error('BASE_URL environment variable is required');
  }

  if (!requiredEnvVars.adminBaseUrl) {
    throw new Error('ADMIN_BASE_URL environment variable is required');
  }

  return requiredEnvVars;
}

/**
 * Default environment configuration
 * Used as fallback when environment variables are not set
 */
export const defaultConfig: EnvironmentConfig = {
  baseUrl: 'http://localhost:3000',
  adminBaseUrl: 'http://localhost:8001',
  testEmail: 'test@example.com',
  testPassword: 'password123',
  testTimeout: 30000,
  navigationTimeout: 30000,
  actionTimeout: 30000,
  nodeEnv: 'development',
};

