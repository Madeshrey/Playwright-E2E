import { test, expect } from '@playwright/test';
import { Login } from '../pages';

let page;

test.describe.configure({mode:'serial'})
   test.beforeAll(async ({ browser }, testInfo) => {
      const context = await browser.newContext({
         recordVideo: {
            dir: 'test-results/videos',
            size: { height: 1080, width: 1920 }
         }
      }); 
      page = await context.newPage();
      page.setDefaultTimeout(30000);
   });
   
   test.afterAll(async ({}, testInfo) => {
      if (page.video()) {
         // const videoPath = testInfo.outputPath('login.webm');
         const videoPath = await page.video().path();
         await page.video().saveAs(videoPath);
         await testInfo.attach('video', {
            contentType: 'video/webm', // Correct MIME type
            name: 'login',
            path: videoPath
         });
      }
      await page.close();
      await context.close();
   });

   test('SignIn functionality', async () => {
      test.setTimeout(3 *60 *1000)
      const loginJs = new Login(page);
      await loginJs.launchURL();
      //await loginJs.verifySignIn();
      // await loginJs.verifyUsername('secret_sauce');
      // await loginJs.signInMethod('standard_user', 'secret_sauce');
   });

   test.fixme('Validating fields with wrong credentials', async () => {
      test.setTimeout(3*60*3000)
      const loginJs = new Login(page);
      await loginJs.verifySignIn();
      await loginJs.verifyUsername('secret_sauce');
   });

   test('Login with valid credentials', async () => {
      test.setTimeout(3*60*3000)
      const loginJs = new Login(page);
      await loginJs.signInMethod('standard_user', 'secret_sauce');
   });
