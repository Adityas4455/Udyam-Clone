import puppeteer from "puppeteer";
import fs from "fs-extra";

const UDYAM_URL = "https://udyamregistration.gov.in/UdyamRegistration.aspx";

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(UDYAM_URL, { waitUntil: "networkidle2" });

  console.log("Extracting Step 1 & Step 2 fields...");

  await page.waitForSelector("form");

  const schema = await page.evaluate(() => {
    const extractFields = (selector) => {
      return Array.from(document.querySelectorAll(selector)).map((field) => {
        const label =
          field.labels?.[0]?.innerText.trim() ||
          field.getAttribute("placeholder") ||
          "";
        const name = field.getAttribute("name") || field.id;
        const type = field.type || "text";
        const required = field.required || false;
        let validation = null;

        if (/aadhaar/i.test(label) || /aadhaar/i.test(name)) {
          validation = "^[0-9]{12}$";
        }
        if (/pan/i.test(label) || /pan/i.test(name)) {
          validation = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$";
        }
        if (/mobile/i.test(label) || /phone/i.test(name)) {
          validation = "^[6-9][0-9]{9}$";
        }

        return { label, name, type, required, validation };
      });
    };

    return {
      step1: extractFields("input, select"),
      step2: extractFields("input, select")
    };
  });

  await fs.ensureDir("./output");
  await fs.writeJson("./output/udyam-schema.json", schema, { spaces: 2 });

  console.log("✅ Schema saved to output/udyam-schema.json");
  await browser.close();
})();
