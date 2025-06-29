// pages/DocsPage.js
const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');
const SearchComponent = require('./SearchComponent');

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

    async openSearchAndSearchFor(searchText) {
        await expect(this.searchIcon).toBeVisible();
        await this.searchIcon.click();

        await this.search.typeAndSelectResult(searchText, 'BrowserContext'); // Modificado para pasar el nombre exacto esperado
    }

    async verifyUrlContains(partialUrl) {
        await expect(this.page).toHaveURL(new RegExp(partialUrl));
    }
}

module.exports = DocsPage;