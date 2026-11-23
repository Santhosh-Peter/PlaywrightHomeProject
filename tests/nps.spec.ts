import {test, Page, chromium, BrowserContext, Browser} from '@playwright/test';
import {testFixture} from '../myFixtures/testFixture';


test.describe('NPS Test suite', () =>{

    // let page: Page;
    // let browser: Browser;
    // let context: BrowserContext;

    // test.beforeAll(async() => {
    //     browser = await chromium.launch({channel: 'msedge', headless: false});
    //     console.log('Browser launched successfully');
    //     context = await browser.newContext();
    //     console.log('Browser context created successfully');
    // }); // End of beforeAll

    // test.beforeEach(async() => {
    //     page = await context.newPage();
    //     console.log('New page created successfully');
    //     await page.goto('https://npstrust.org.in/nps-calculator');
    //     console.log('Navigated to NPS calculator page successfully');
    // }); // End of beforeEach

    // test.afterEach(async() => {
    //     await page.close();
    //     console.log('Page closed successfully');
    // }); // End of afterEach

    // test.afterAll(async() => {
    //     await context.close();
    //     console.log('Browser context closed successfully');
    //     await browser.close();
    //     console.log('Browser closed successfully');
    // }); // End of afterAll


    testFixture('Subscriber Sector is Non Government', async({page}) => {
        await page.locator('xpath=//input[@type="radio" and @value="non_government"]/parent::div').click();
        console.log('Clicked on Non Government radio button successfully');
    }); // End of test 1

    testFixture('Subscriber Sector is Government', async({page}) => {
        await page.locator('xpath=//input[@type="radio" and @value="government"]/parent::div').click();
        console.log('Clicked on Government radio button successfully');
    }); // End of test 2

    testFixture('About NPS Trust', async({page}) => {
        await page.locator('xpath=//div[@id="block-nps-main-menu"]//li/a[text()="NPS Architecture"]').hover();
        await page.locator('xpath=//div[@id="block-nps-main-menu"]//a[text()="NPS Trust"]/parent::li').click();
        await page.locator('xpath=//div[@id="block-nps-main-menu"]//a[text()="About NPS Trust"]').click();
        await page.waitForLoadState('networkidle');
        console.log('Navigated to About NPS Trust page successfully');
    }


}); // End of describe