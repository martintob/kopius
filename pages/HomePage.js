// pages/HomePage.js

const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class HomePage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        this.docsLink = page.getByRole('link', { name: 'Docs', exact: true });
    }

    async navigateToDocs() {
        await expect(this.docsLink).toBeVisible();
        await this.docsLink.click();
        
        const DocsPage = require('./DocsPage');
        return new DocsPage(this.page);
    }
}

module.exports = HomePage;