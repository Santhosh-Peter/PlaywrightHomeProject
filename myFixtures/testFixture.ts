import {test as baseTest, Page} from '@playwright/test'


export const testFixture = baseTest.extend<{page : Page}>({ // Whatever you put inside the extend<>, you should implement it below and expose it using use.
    
    page : async({context}, use) => { // you can use any available fixture from playwright like context, browser, etc. and you can also use your own custom fixtures here.
    
        const page = await context.newPage();
        console.log('New page created successfully');
        await page.goto('https://npstrust.org.in/nps-calculator');
        console.log('Navigated to NPS calculator page successfully');

        await use(page);

        await page.close();
        console.log('Page closed successfully');
    },

});
