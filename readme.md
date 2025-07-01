===================================================
===================================================
===================================================
     PLAYWRIGHT TEST AUTOMATION PROJECT                                                   
===================================================
===================================================
===================================================

This repository contains a web test automation project developed using Playwright and JavaScript. Its primary goal is to ensure the robust functionality of the official Playwright documentation website.

===================================================
PROJECT OVERVIEW
===================================================

This project includes automated tests for some key user flows on https://playwright.dev/. For instance, one of the primary automated scenarios simulates a user's interaction with the documentation search feature. This includes navigating to the Docs section, confirming the page title, interacting with the search bar to type a term (like "browserContext" or "Page"), clicking a specific search result, and finally verifying the resulting URL. The design allows for easy expansion to cover additional test scenarios as the project evolves.

===================================================
GETTING STARTED (INSTALLATION)
===================================================

To set up and run this project locally, ensure you have Node.js (version 18+ recommended) and npm (included with Node.js) installed.

1.  **Clone the repository:**
    ```
    git clone [https://github.com/martintob/kopius.git](https://github.com/martintob/kopius.git)
    cd kopius
    ```

2.  **Install dependencies:**
    ```
    npm install
    ```

3.  **Install Playwright browsers:**
    ```
    npx playwright install
    ```

===================================================
RUNNING THE TESTS
===================================================

Once setup is complete, you can execute the automated tests:

* **To run all configured tests** (across Chrome, Firefox, and Safari) in headless mode:
    ```
    npx playwright test
    ```

* **To run a specific test file or scenario** (e.g., only the tests in `tests/browserContext.spec.js` on Chrome, with the browser UI visible):
    ```
    npx playwright test tests/browserContext.spec.js --project=chromium --headed
    ```

* **To view the interactive HTML report** from the last test run:
    ```
    npx playwright show-report
    ```

===================================================
CODE ORGANIZATION (PAGE OBJECT MODEL)
===================================================

The project adheres to the **Page Object Model (POM)** design pattern, which significantly enhances code readability, maintainability, and reusability. Each significant web page or reusable component has a corresponding "Page Object" (a JavaScript class) that encapsulates its selectors and actions.

The main `playwright.config.js` file centralizes Playwright's global settings, including the base URL and browser configurations.

The `pages/` directory houses the Page Objects (`HomePage.js`, `DocsPage.js`, `BasePage.js`, `SearchComponent.js`), acting as dedicated "robots" for different parts of the website. `BasePage.js` provides common functionalities, while `SearchComponent.js` handles the reusable search bar logic.

Test scenarios are defined within the `tests/` directory (`.spec.js` files). These tests interact with the website by calling high-level methods on the Page Objects, making the test scripts clear and easy to follow (e.g., `homePage.navigateToDocs()`).

External data for tests, such as search terms and expected results, is stored in `data/docsSearchData.json`. This approach promotes data-driven testing and allows for easy addition of new test scenarios without modifying the core test logic.

===================================================
COMMON ISSUES & SOLUTIONS
===================================================

During the project's development, we ran into a couple of typical automation challenges:

* **Search Icon Not Found:** Initially, Playwright would sometimes time out or fail to locate the search icon. This was resolved by refining the selector to `.DocSearch-Button`, which proved to be more precise and reliable for identifying the element.

* **Ambiguous Search Results:** When searching, Playwright occasionally identified multiple elements matching a broad query, leading to "strict mode violation" errors. To fix this, we made our selectors more specific within the `SearchComponent.js`, ensuring Playwright clicked the exact intended result (e.g., by matching the full name like "BrowserContext").


===================================================
EXTRA EXPLANATION: HOWs and WHYs
===================================================


For finding things on the page ('selectors'):
-- I told Playwright to find things how a human would see them. For example:
    -- For a button or link, I say: page.getByRole('link', { name: 'Docs' }) 
        (find the link that says 'Docs').
    -- For a search icon: page.locator('.DocSearch-Button') 
        (find the magnifying glass).

For checking that everything worked ('validations'):
-- After every important step, the test 'checks' if things are as they should be. I use Playwright's expect, which is like saying: "I expect this to be true." For example:
    -- docsPage.verifyPageTitle('Installation'): Checks if the page title is 'Installation'.
    -- docsPage.verifyUrlContains(expectedUrlPartial): Looks if the web address (URL) is what we expect.