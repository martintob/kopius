// pages/SearchComponent.js

const { expect } = require('@playwright/test');

class SearchComponent {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.searchInput = page.getByPlaceholder('Search docs');
        this.searchResults = page.locator('.DocSearch-Hits');
    }

    async typeAndSelectResult(searchText, resultName) {
        await expect(this.searchInput).toBeVisible();
        await this.searchInput.fill(searchText);

        const resultLink = this.searchResults.getByRole('link', { name: 'BrowserContext', exact: true });

        await expect(resultLink).toBeVisible();
        await resultLink.click();
    }
}

module.exports = SearchComponent;