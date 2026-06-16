const { chromium } = require("playwright");

async function scrapeSauceDemo(
  username,
  password
) {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  try {
    await page.goto(
      "https://www.saucedemo.com/"
    );

    await page.fill(
      "#user-name",
      username
    );

    await page.fill(
      "#password",
      password
    );

    await page.click(
      "#login-button"
    );

    await page.waitForSelector(
      ".inventory_list"
    );

    const products = await page.$$eval(
      ".inventory_item",
      (items) =>
        items.map((item) => ({
          name: item.querySelector(
            ".inventory_item_name"
          )?.innerText,

          price: item.querySelector(
            ".inventory_item_price"
          )?.innerText,

          description:
            item.querySelector(
              ".inventory_item_desc"
            )?.innerText,
        }))
    );

    return products;
  } catch (error) {
    throw new Error(
      "scraping failed"
    );
  } finally {
    await browser.close();
  }
}

module.exports = scrapeSauceDemo;