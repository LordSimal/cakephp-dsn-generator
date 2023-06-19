import { test, expect } from '@playwright/test'

test('empty form should not generate', async ({ page }) => {
  await page.goto('/')
  await page.locator('form button').press('Enter');
  await expect(page.locator('.result-container')).toBeHidden();
})

test('simple mysql/mariadb', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Server').fill('mysql.server.local');
  await page.getByLabel('Username').fill('myusername');
  await page.getByLabel('Password').fill('somepassword');
  await page.getByLabel('Database').fill('db');
  await page.locator('form button').press('Enter');

  let result = page.locator('.result-container');
  await expect(result).toBeVisible();
  await expect(result).toContainText('mysql://myusername:somepassword@mysql.server.local:3306/db')
})

test('simple postgresql', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('DBMS').selectOption('postgres');
  await page.getByLabel('Server').fill('psql.server.local');
  await page.getByLabel('Username').fill('myusername');
  await page.getByLabel('Password').fill('somepassword');
  await page.getByLabel('Database').fill('db');
  await page.locator('form button').press('Enter');

  let result = page.locator('.result-container');
  await expect(result).toBeVisible();
  await expect(result).toContainText('postgres://myusername:somepassword@psql.server.local:5432/db')
})

test('simple sqlite', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('DBMS').selectOption('sqlite');
  await page.getByLabel('Server').fill('localhost');
  await expect(page.getByLabel('Username')).toBeHidden();
  await expect(page.getByLabel('Password')).toBeHidden();
  await page.getByLabel('Database').fill('db');
  await page.locator('form button').press('Enter');

  let result = page.locator('.result-container');
  await expect(result).toBeVisible();
  await expect(result).toContainText('sqlite://localhost/db')
})

test('simple ms sql server', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('DBMS').selectOption('sqlserver');
  await page.getByLabel('Server').fill('mssql.server.local');
  await page.getByLabel('Username').fill('myusername');
  await page.getByLabel('Password').fill('somepassword');
  await page.getByLabel('Database').fill('db');
  await page.locator('form button').press('Enter');

  let result = page.locator('.result-container');
  await expect(result).toBeVisible();
  await expect(result).toContainText('sqlserver://myusername:somepassword@mssql.server.local:1433/db')
})

test('postgresql with custom schema', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('DBMS').selectOption('postgres');
  await page.getByLabel('Server').fill('psql.server.local');
  await page.getByLabel('Username').fill('myusername');
  await page.getByLabel('Password').fill('somepassword');
  await page.getByLabel('Database').fill('db');

  await page.getByText('Optional').click();
  await page.getByLabel('Schema').fill('non_app');

  await page.locator('form button').press('Enter');

  let result = page.locator('.result-container');
  await expect(result).toBeVisible();
  await expect(result).toContainText('postgres://myusername:somepassword@psql.server.local:5432/db?schema=non_app')
})

test('mysql/mariadb with timezone', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Server').fill('mysql.server.local');
  await page.getByLabel('Username').fill('myusername');
  await page.getByLabel('Password').fill('somepassword');
  await page.getByLabel('Database').fill('db');

  await page.getByText('Optional').click();
  await page.getByLabel('Timezone').selectOption('Europe/Vienna');

  await page.locator('form button').press('Enter');

  let result = page.locator('.result-container');
  await expect(result).toBeVisible();
  await expect(result).toContainText('mysql://myusername:somepassword@mysql.server.local:3306/db?timezone=Europe/Vienna')
})

test('mysql/mariadb with SQL init command', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Server').fill('mysql.server.local');
  await page.getByLabel('Username').fill('myusername');
  await page.getByLabel('Password').fill('somepassword');
  await page.getByLabel('Database').fill('db');

  await page.getByText('Optional').click();
  await page.getByLabel('SQL init command').fill('SET sql_mode=""');

  await page.locator('form button').press('Enter');

  let result = page.locator('.result-container');
  await expect(result).toBeVisible();
  await expect(result).toContainText('mysql://myusername:somepassword@mysql.server.local:3306/db?init[]=SET sql_mode=""')
})

test('mysql/mariadb with enable query logging', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Server').fill('mysql.server.local');
  await page.getByLabel('Username').fill('myusername');
  await page.getByLabel('Password').fill('somepassword');
  await page.getByLabel('Database').fill('db');

  await page.getByText('Optional').click();
  await page.getByLabel('Enable query logging').check();

  await page.locator('form button').press('Enter');

  let result = page.locator('.result-container');
  await expect(result).toBeVisible();
  await expect(result).toContainText('mysql://myusername:somepassword@mysql.server.local:3306/db?log=true')
})