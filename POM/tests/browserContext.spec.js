// tests/browserContext.spec.js

const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const docsSearchData = require('../data/docsSearchData.json');

test.describe('Playwright Docs Navigation and Search', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto('/');
    });

    test('should search for "BrowserContext" in Docs and navigate to its class page', async ({ page }) => {
        const searchTerm = docsSearchData.browserContextSearch.searchTerm;
        const expectedResultName = docsSearchData.browserContextSearch.expectedResultName;
        const expectedUrlPartial = docsSearchData.browserContextSearch.expectedUrlPartial;

        const docsPage = await homePage.navigateToDocs();
        await docsPage.verifyPageTitle('Installation');

        await docsPage.openSearchAndSearchFor(searchTerm, expectedResultName);
        await docsPage.verifyUrlContains(expectedUrlPartial);
    });

    test('should search for "Page" in Docs and navigate to its class page', async ({ page }) => {
        const searchTerm = docsSearchData.pageSearch.searchTerm;
        const expectedResultName = docsSearchData.pageSearch.expectedResultName;
        const expectedUrlPartial = docsSearchData.pageSearch.expectedUrlPartial;

        const docsPage = await homePage.navigateToDocs();
        await docsPage.verifyPageTitle('Installation');
        await docsPage.openSearchAndSearchFor(searchTerm, expectedResultName);
        await docsPage.verifyUrlContains(expectedUrlPartial);
    });
});