// pages/docsPage.js
const { expect } = require('@playwright/test');
const BasePage = require('./basePage');
const SearchComponent = require('./searchComponent');

class DocsPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        this.pageTitle = page.locator('article h1');
        this.searchIcon = page.locator('.DocSearch-Button');

        this.search = new SearchComponent(page);
    }

    async verifyPageTitle(expectedTitle) {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageTitle).toHaveText(expectedTitle);
    }

    async openSearchAndSearchFor(searchText, expectedResultName) { 
        await expect(this.searchIcon).toBeVisible();
        await this.searchIcon.click();

        await this.search.typeAndSelectResult(searchText, expectedResultName); 
    }

    async verifyUrlContains(partialUrl) {
        await expect(this.page).toHaveURL(new RegExp(partialUrl));
    }
}

module.exports = DocsPage;