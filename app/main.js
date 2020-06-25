"use strict";
const { chromium } = require('playwright');

const getNextDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric'});
}
const login = process.argv[2];
const pass = process.argv[3];
const projectName = process.argv[4];
const date = getNextDate();


(async () => {
  const browser = await chromium.launch({headless: false, args: ['--window-size=1920,900']});
  const context = await browser.newContext({
    viewport: { width: 1920, height: 900 }
  });
  const page = await context.newPage();
  await page.goto("http://localhost:4200");
  // Login
  await page.type("#mat-input-0", `${login}`);
  await page.type("#mat-input-1", `${pass}`);
  await page.click("#loginButton > button");

  await page.click(`xpath=//a[contains(text(),'${projectName}')]`);
  await page.click("[id='mat-expansion-panel-header-1'] .menu-title");
  await page.click(".capture-btn .mat-button-wrapper");

  await page.fill('#url', '');
  await page.fill("#url", 'http://demo.rigi.io');

  await page.click(".button-text");
  await page.click(".mat-slide-toggle-bar");
  await scrollTo(page, 0, 981);
  const pages = await context.pages();

  // Converting a 'wheel' step has to be done manually at this time
  const coffeePage = pages.pop();
  await coffeePage.waitForTimeout(1000);
  await coffeePage.click(".btn-xl");
  await coffeePage.waitForTimeout(1000);
  await coffeePage.click(".btn-outline-dark");
  await scrollToElement(coffeePage, "img[placement=\"top\"]");
  await coffeePage.click("[src='assets/images/toolicon.ico']");
  await coffeePage.waitForTimeout(2000);
  await coffeePage.click("[routerlink='coffee/about']");
  await coffeePage.waitForTimeout(1000);
  await coffeePage.click("[routerlink='coffee/products']");
  await coffeePage.waitForTimeout(1000);
  await coffeePage.click("[routerlink='coffee/store']");
  await coffeePage.waitForTimeout(1000);
  await scrollToElement(coffeePage, "#dropdownBasic1");
  await coffeePage.click("#dropdownBasic1");
  await coffeePage.waitForTimeout(1000);
  await coffeePage.click("[aria-labelledby='dropdownBasic1'] > :nth-child(1)");
  await coffeePage.waitForTimeout(1000);
  await scrollTo(coffeePage, 0, 0);
  // Converting a 'wheel' step has to be done manually at this time
  await coffeePage.click("[routerlink='coffee/tips']");
  await coffeePage.waitForTimeout(1000);
  // Converting a 'wheel' step has to be done manually at this time
  await scrollToElement(coffeePage, "#dropdownBasic2");
  await coffeePage.click("#dropdownBasic2");
  await coffeePage.waitForTimeout(1500);
  await coffeePage.click(".btn-login-dark .rigiElement");
  // Converting a 'wheel' step has to be done manually at this time
  await coffeePage.type("#email", 'coffee@rigi.io');
  await coffeePage.type("#password", 'coffee');
  await coffeePage.waitForTimeout(1000);
  await coffeePage.click(".btn-block");
  await coffeePage.click("[routerlink='coffee/booking']");
  await coffeePage.waitForTimeout(1000);
  await scrollTo(coffeePage, 0, 700);
  // Converting a 'wheel' step has to be done manually at this time
  await coffeePage.click("[name='name']");
  await coffeePage.type("[name='name']", 'Rigi');
  await sendSpecialCharacter(coffeePage, ".ng-valid", 'Tab');
  await coffeePage.click(".fa");
  await coffeePage.click(`[aria-label='${date}'] .owl-dt-calendar-cell-content`);
  await coffeePage.click("#owl-dt-picker-0 > div.owl-dt-container-inner.ng-trigger.ng-trigger-fadeInPicker > div > button:nth-child(2)");
  await coffeePage.click("#owl-dt-picker-0 > div.owl-dt-container-inner.ng-trigger.ng-trigger-fadeInPicker > div > button:nth-child(2)");
  await coffeePage.click("#sitPicker");
  await coffeePage.selectOption("[id='sitPicker']", 'Couple');
  await coffeePage.click(".btn-outline-dark");
  await scrollTo(coffeePage, 0, 0);
  await coffeePage.waitForTimeout(2000);
  await coffeePage.click(".btn-login-dark");
  // Converting a 'wheel' step has to be done manually at this time
  await coffeePage.click(".btn-login-dark");
  // Converting a 'wheel' step has to be done manually at this time
  await coffeePage.click("#email");
  await coffeePage.type("#email", '123@mail.by');
  await coffeePage.click("#password");
  await coffeePage.type("#password", '123');
  await coffeePage.click(".btn-block");
  await coffeePage.waitForTimeout(5000);
  await browser.close();
})();

// move to utils.js

async function scrollTo(page, x, y) {
  await page.evaluate(([x, y]) => {
    window.scroll(x, y);
  }, [x, y]);
}

async function sendSpecialCharacter(page, selector, key) {
  const elementHandle = await page.$(selector);
  await elementHandle.press(key);
}

async function scrollToElement(page, selector) {
  await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    element.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" });
  }, selector);
}
