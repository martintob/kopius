// tests/browserContext.spec.js

const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');

test.describe('Playwright Docs Navigation and Search', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto('/');
    });

    test('should navigate to docs, search for browserContext and verify URL', async ({ page }) => {
        const docsPage = await homePage.navigateToDocs();

        await docsPage.verifyPageTitle('Installation');

        await docsPage.openSearchAndSearchFor('browserContext');

        await docsPage.verifyUrlContains('/class-browsercontext');
    });
});