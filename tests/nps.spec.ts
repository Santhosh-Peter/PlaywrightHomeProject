import {test, expect} from '@playwright/test';
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

    testFixture('Retirement Age Slider', async({page}) => {
        await page.locator('#pensionretirementAge').fill('70');
        await expect(page.locator('#pensionretirementAge')).toHaveValue('70');
        console.log('Retirement age set to ' + await page.locator('xpath=//input[@id="pensionretirementAge"]').getAttribute('value') + ' successfully');
        await page.screenshot({path: 'retirement-age-slider.png', fullPage: true});
    }); // End of test 3


    testFixture('Test YouTube', async({page}) => {
        await page.goto('https://www.youtube.com/');
        console.log('Launched YouTube successfully');
        console.log('Searching for term : ' + process.env.termToSearch!);
        await page.locator('xpath=//input[@name="search_query"]').fill(process.env.termToSearch!);
        await page.locator('xpath=//input[@name="search_query"]').press('Enter');
        // await page.waitForResponse(response => response.url().includes('search_query=Playwright') && response.status() === 200);
        console.log('Search results for Playwright displayed successfully');
        await page.screenshot({path: 'youtube-search-results.png', fullPage: true});

    }); // End of test 4

}); // End of describe