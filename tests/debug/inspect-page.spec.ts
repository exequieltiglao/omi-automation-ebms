import { test, expect } from '@playwright/test';
import { createUsersListPage, createCreateUserPage } from '@pages';

/**
 * Debug test to inspect actual page structure
 * This will help us fix the locators
 */
test.describe('Debug - Inspect Page Structure', () => {
  test('inspect create user page structure', async ({ page }) => {
    const usersListPage = createUsersListPage(page);
    const createUserPage = createCreateUserPage(page);
    
    // Navigate to create user page
    await usersListPage.goto();
    await usersListPage.clickCreateUser();
    await createUserPage.waitForCreateUserPageLoad();
    
    // Wait for page to fully load
    await page.waitForTimeout(2000);
    
    // Log page title and URL
    console.log('Page Title:', await page.title());
    console.log('Current URL:', page.url());
    
    // Inspect all text content on the page
    const allText = await page.evaluate(() => {
      return document.body.innerText;
    });
    console.log('All page text:', allText);
    
    // Inspect form elements
    const formElements = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input')).map(input => ({
        type: input.type,
        name: input.name,
        id: input.id,
        placeholder: input.placeholder,
        value: input.value,
        className: input.className
      }));
      
      const selects = Array.from(document.querySelectorAll('select')).map(select => ({
        name: select.name,
        id: select.id,
        className: select.className,
        options: Array.from(select.options).map(opt => opt.textContent)
      }));
      
      const buttons = Array.from(document.querySelectorAll('button')).map(button => ({
        text: button.textContent,
        className: button.className,
        type: button.type
      }));
      
      return { inputs, selects, buttons };
    });
    
    console.log('Form Elements:', JSON.stringify(formElements, null, 2));
    
    // Inspect permission group area specifically
    const permissionGroupInfo = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const permissionElements = [];
      
      for (let el of elements) {
        const text = el.textContent?.toLowerCase() || '';
        if (text.includes('permission') || text.includes('venue') || text.includes('mall') || text.includes('finance')) {
          permissionElements.push({
            tagName: el.tagName,
            text: el.textContent,
            className: el.className,
            id: el.id,
            role: el.getAttribute('role')
          });
        }
      }
      
      return permissionElements;
    });
    
    console.log('Permission Group Elements:', JSON.stringify(permissionGroupInfo, null, 2));
    
    // Take a screenshot for visual inspection
    await page.screenshot({ path: 'debug-create-user-page.png', fullPage: true });
    
    // This test will always pass - it's just for inspection
    expect(true).toBe(true);
  });
});
