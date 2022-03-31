import { test } from '@playwright/test'
import execa from 'execa'

test.describe('User Flows - no auth provider', () => {

  /**
   * Set up stuff
   */
  test.beforeAll(async () => {
    const execaConfig: execa.SyncOptions = {
      cwd: '../../../typescript/graphql-nextjs'
    }
    console.log({ execaConfig })
    // install
    execa.execaCommandSync('npm install', execaConfig)
    // migrate dev
    execa.execaCommandSync('npx prisma migrate dev --name=init', execaConfig)
    // start app
    execa.execaCommandSync('npm run dev', execaConfig)
  })

  test('complete flow', async ({ page }) => {
    /**
     * Visit home page
     */
    await page.goto('http://localhost:3000/');

    /** 
     * signup 
     */
    await Promise.all([
      page.waitForNavigation({ url: 'http://localhost:3000/signup' }),
      page.click('text=Signup')
    ]);
    await page.click('[placeholder="Name"]');
    await page.fill('[placeholder="Name"]', 'Nikolas');
    await page.press('[placeholder="Name"]', 'Tab');
    await page.click('[placeholder="Email address"]');
    await page.fill('[placeholder="Email address"]', 'nikolas@prisma.io');
    await Promise.all([
      page.waitForNavigation({ url: 'http://localhost:3000/' }),
      page.click('input:has-text("Signup")')
    ]);
    await Promise.all([
      page.waitForNavigation({ url: 'http://localhost:3000/create' }),
      page.click('text=+ Create draft')
    ]);

    /**
     * Create draft
     */
    await page.click('[placeholder="Title"]');
    await page.fill('[placeholder="Title"]', 'Prisma 🪨s');
    await page.press('[placeholder="Title"]', 'Control+Meta+ ');
    await page.press('[placeholder="Title"]', 'Tab');
    await page.fill('[placeholder="Author (email address)"]', 'nikolas@prisma.io');
    await page.press('[placeholder="Author (email address)"]', 'Tab');
    await page.fill('textarea', 'Seriously, Prisma rocks');
    await Promise.all([
      page.waitForNavigation({ url: 'http://localhost:3000/drafts' }),
      page.click('input:has-text("Create")')
    ]);


    /** 
     * View & Publish draft
     */
    await Promise.all([
      page.waitForNavigation({ url: 'http://localhost:3000/p/5' }),
      page.click('text=Prisma rocksBy Nikolas')
    ]);
    await Promise.all([
      page.waitForNavigation({ url: 'http://localhost:3000/' }),
      page.click('text=Publish')
    ]);

    /**
     * delete draft
    */
    await Promise.all([
      page.waitForNavigation({ url: 'http://localhost:3000/drafts' }),
      page.click('text=Drafts')
    ]);
    await Promise.all([
      page.waitForNavigation({ url: 'http://localhost:3000/p/4' }),
      page.click('text=Prisma on YouTubeBy Mahmoud')
    ]);
    await Promise.all([
      page.waitForNavigation({ url: 'http://localhost:3000/' }),
      page.click('text=Delete')
    ]);

    /**
     * View existing post
     */
    await Promise.all([
      page.waitForNavigation({ url: 'http://localhost:3000/p/1' }),
      page.click('text=Join the Prisma SlackBy Alice')
    ]);
  })
})