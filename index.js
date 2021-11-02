require("dotenv").config();

const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );

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

  await page.goto("https://coinmarketcap.com/account/my-diamonds/");

  // TODO
  // Add instructions for clicking on claim button

  await browser.close();
})();
