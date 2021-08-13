import { test, expect, chromium } from '@playwright/test'
const baseURL = 'http://localhost:3000/'
const numberOfPosts = 3
test.describe('Home page', () => {
  test('We should be able to see webpage title', async ({ page }) => {
    await page.goto(baseURL)
    const name = await page.innerText('h1')
    expect(name).toBe('My Blog')
  })

  test('We should have a list of posts with Title', async ({ page }) => {
    await page.goto(baseURL)
    const posts = await page.$$('.post div h2')
    expect(posts?.length).toBe(numberOfPosts)
  })

  test('Each Post should have an author', async ({ page }) => {
    await page.goto(baseURL)
    const authors = await page.$$('.post div small')
    expect(authors?.length).toBe(numberOfPosts)
  })

  test('Each Post should have a content', async ({ page }) => {
    await page.goto(baseURL)
    const contents = await page.$$('.post div p')
    expect(contents?.length).toBe(numberOfPosts)
  })
})

test.describe('Sign up page', () => {
  test('We should be able to signup and redirect back to base URL', async ({ page }) => {
    await page.goto(baseURL + 'signup')
    await page.type('#name', 'testUser')
    await page.type('#email', 'testUser@gmail.com')
    await page.click("#submit");
    await page.waitForURL(baseURL);
    const url = await page.url();
    expect(url).toBe(baseURL)
  })
})

test.describe('Drafts page', () => {
  test('We should be able to see one draft that is created by seeds', async ({ page }) => {
    await page.goto(baseURL + 'drafts')
    const draftTitle = await page.innerText('main div.post div h2')
    const draftAuthor = await page.innerText('main div.post div small')
    const draftContent = await page.innerText('main div.post div p')
    expect(draftTitle).toBeTruthy();
    expect(draftAuthor).toBeTruthy();
    expect(draftContent).toBeTruthy();
  })
})

test.describe('Create Draft page', () => {
  test('We should be able to create a draft', async ({ page }) => {
    await page.goto(baseURL + 'create')
    await page.type('#title', 'testTitle')
    await page.type('#email', 'alice@prisma.io')
    await page.type('#content', 'testContent')
    await page.click("#submit");
    await page.goto(baseURL + 'drafts');
    const draftTitle = await page.innerText('main div.post:last-child div h2')
    const draftAuthor = await page.innerText('main div.post:last-child div small')
    const draftContent = await page.innerText('main div.post:last-child div p')
    expect(draftTitle).toBe('testTitle')
    expect(draftAuthor).toBe('By Alice')
    expect(draftContent).toBe('testContent')
  })
})

test.describe('Post detail page', () => {
  test('We should be able to publish a draft', async ({ page }) => {
    await page.goto(baseURL + 'drafts');
    await page.click("main div.post:first-child div");

    const draftTitle = await page.innerText('main div.post:first-child div h2')
    const draftAuthor = await page.innerText('main div.post:first-child div small')
    const draftContent = await page.innerText('main div.post:first-child div p')

    await page.waitForURL(/http:\/\/localhost:3000\/p*/)

    await page.click('#publish')

    await page.goto(baseURL);

    const publishedTitle = await page.innerText('main div.post:last-child div h2')
    const publishedAuthor = await page.innerText('main div.post:last-child div small')
    const publishedContent = await page.innerText('main div.post:last-child div p')

    expect(draftTitle).toBe(publishedTitle)
    expect(draftAuthor).toBe(publishedAuthor)
    expect(draftContent).toBe(publishedContent)
  })
})