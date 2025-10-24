/**
 * Test Data Generation Helper
 * Provides functions to generate random test data for automation
 */

/**
 * Generates a random string of specified length
 * @param length - Length of the random string
 * @returns Random string
 */
function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Generates a random number as string
 * @param length - Length of the number string
 * @returns Random number string
 */
function generateRandomNumber(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

/**
 * Capitalizes the first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Generates a random first name
 * @returns Random first name
 */
export function generateFirstName(): string {
  const firstNames = [
    'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Emma',
    'Robert', 'Olivia', 'William', 'Sophia', 'Richard', 'Isabella', 'Thomas',
    'Mia', 'Charles', 'Charlotte', 'Daniel', 'Amelia', 'Matthew', 'Harper',
    'Juan', 'Maria', 'Jose', 'Ana', 'Carlos', 'Sofia', 'Miguel', 'Isabella'
  ];
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

/**
 * Generates a random last name
 * @returns Random last name
 */
export function generateLastName(): string {
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
    'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
    'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Dela Cruz', 'Santos', 'Reyes', 'Cruz', 'Bautista', 'Ocampo', 'Garcia'
  ];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}

/**
 * Generates a random email address
 * @param firstName - Optional first name to use in email
 * @param lastName - Optional last name to use in email
 * @returns Random email address
 */
export function generateEmail(firstName?: string, lastName?: string): string {
  const domains = ['example.com', 'test.com', 'mail.com', 'email.com', 'sample.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  
  if (firstName && lastName) {
    const cleanFirst = firstName.toLowerCase().replace(/\s+/g, '');
    const cleanLast = lastName.toLowerCase().replace(/\s+/g, '');
    return `${cleanFirst}.${cleanLast}${generateRandomNumber(3)}@${domain}`;
  }
  
  return `user${generateRandomNumber(6)}@${domain}`;
}

/**
 * Generates a random Philippine mobile number (without country code)
 * @returns Random Philippine mobile number in format 9XXXXXXXXX (10 digits)
 */
export function generatePhilippineContactNumber(): string {
  // Philippine mobile numbers start with 9 and have 10 digits total
  const firstDigit = '9';
  const restDigits = generateRandomNumber(9);
  return `${firstDigit}${restDigits}`;
}

/**
 * Generates a random international contact number
 * @returns Random international contact number
 */
export function generateContactNumber(): string {
  const countryCodes = ['+1', '+44', '+61', '+63', '+65', '+81', '+86'];
  const countryCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
  const number = generateRandomNumber(10);
  return `${countryCode}${number}`;
}

/**
 * User data interface for test data generation
 */
export interface UserTestData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  permissionGroup?: string;
  userStatus?: 'Active' | 'Blocked';
}

/**
 * Generates complete random user test data
 * @param overrides - Optional partial user data to override generated values
 * @returns Complete user test data
 */
export function generateUserData(overrides?: Partial<UserTestData>): UserTestData {
  const firstName = overrides?.firstName || generateFirstName();
  const lastName = overrides?.lastName || generateLastName();
  
  return {
    firstName,
    lastName,
    email: overrides?.email || generateEmail(firstName, lastName),
    contactNumber: overrides?.contactNumber || generatePhilippineContactNumber(),
    permissionGroup: overrides?.permissionGroup,
    userStatus: overrides?.userStatus || 'Active',
  };
}

/**
 * Generates a batch of random user test data
 * @param count - Number of users to generate
 * @returns Array of user test data
 */
export function generateMultipleUsers(count: number): UserTestData[] {
  const users: UserTestData[] = [];
  for (let i = 0; i < count; i++) {
    users.push(generateUserData());
  }
  return users;
}

/**
 * Generates a unique timestamp-based identifier
 * @returns Timestamp-based unique identifier
 */
export function generateUniqueId(): string {
  return `${Date.now()}_${generateRandomString(4)}`;
}

/**
 * Generates a random permission group name (for testing)
 * @returns Random permission group name
 */
export function generatePermissionGroupName(): string {
  const groups = [
    'Venue Section Head',
    'Mall Operations',
    'Finance Approver',
    'Admin',
    'Manager',
    'Supervisor',
    'Staff',
    'Coordinator'
  ];
  return groups[Math.floor(Math.random() * groups.length)];
}

