const puppeteer = require("puppeteer-extra");
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

export default async function getRecommendations(req, res) {
  const searchGenre = req.body || "fantasy";
  // Launch the browser and open a new blank page
  const searchURI = "https://html5.gamedistribution.com";
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(searchURI);
  await page.type("input#search-input", searchGenre);
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  const extractedData = await page.evaluate(() => {
    const elements = document.querySelectorAll(".list-item");
    const data = [];
    // Starting at 1 index since 0 has no relevant data
    for (let i = 1; i < 3; i++) {
      const element = elements[i];
      const gameUrl = element.querySelector("a").innerHTML;
      const name = element.querySelector("h3").innerHTML;
      const description = element.querySelector(
        ".list-item-description"
      ).innerHTML;

      data.push({ gameUrl, name, description });
    }
    return data;
  });

  await browser.close();

  return res.status(200).json(extractedData);
}

/*
    This will probably be moved into a method on the build recommendation list 
    service. it can live here for now till we get there.
*/
