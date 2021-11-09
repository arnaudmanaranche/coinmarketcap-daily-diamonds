require("dotenv").config();

const puppeteer = require("puppeteer-extra");
const userAgent = require("user-agents");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent(userAgent.toString());

  // Visit URL
  await page.goto("https://coinmarketcap.com/");

  // Click on login button
  const [loginButtonModal] = await page.$x(
    "/html/body/div/div/div[1]/div[1]/div[1]/div/div[2]/button[1]"
  );
  await loginButtonModal.click();

  // Wait modal is loaded
  await page.waitForTimeout(2000);

  const [modal] = await page.$x("/html/body/div[3]");

  if (modal) {
    // Fulfill login credentials
    await page.focus("input[type=email]");
    await page.keyboard.type(process.env.EMAIL);
    await page.focus("input[type=password]");
    await page.keyboard.type(process.env.PASSWORD);

    // Perform login
    await page.keyboard.press("Enter");
  }

  // Wait login call is finished
  await page.waitForTimeout(2000);

  await page.goto("https://coinmarketcap.com/account/my-diamonds/");

  // Click on claim diamonds button
  const [claimDiamondsButton] = await page.$x(
    "/html/body/div[1]/div/div/div[2]/div/div/div/div[2]/div/div[2]/div[2]/div[1]/button"
  );
  await claimDiamondsButton.click();
  await page.waitForTimeout(5000);

  await browser.close();
})();
