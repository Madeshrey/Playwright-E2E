import { test, expect } from '@playwright/test';
import { Login } from '../pages';
import { Product } from '../pages';

let page;
let context
test.describe.configure({mode:'serial'})
   test.beforeAll(async ({ browser }, testInfo) => {
      context = await browser.newContext({
         recordVideo: {
            dir: 'test-results/videos',
            size: { height: 1080, width: 1920 }
         }
      }); 
      page = await context.newPage()
      page.setDefaultTimeout(30000)
   });
   
   test.afterAll(async ({}, testInfo) => {
      // if (page.video()) {
      //    // const videoPath = testInfo.outputPath('login.webm');
      //    const videoPath = await page.video().path();
      //    await page.video().saveAs(videoPath);
      //    await testInfo.attach('video', {
      //       contentType: 'video/webm', // Correct MIME type
      //       name: 'login',
      //       path: videoPath
      //    });
      // }
     if(page) await page.close()
     if(context) await context.close()
   });

   test('SignIn functionality', async () => {
      test.setTimeout(3 *60 *1000)
      const loginJs = new Login(page)
      await loginJs.launchURL()
   });

   test('Validating username and password fields', async () => {
      test.setTimeout(3*60*3000)
      const loginJs = new Login(page)
      await loginJs.verifySignIn()
      await loginJs.wrongUsername('jhS','secret_sauce')
      await loginJs.emptyUsername('secret_sauce')
      await loginJs.emptyPassword('standard_user')
      await loginJs.wrongPassword('standard_user','jqhg')
      await loginJs.emptyUsernameAndPassword()
      await loginJs.wrongUsernameAndPassword('ugwd','ahd')
   });

   test('Login with valid credentials', async () => {
      test.setTimeout(3*60*3000)
      const loginJs = new Login(page)
      await loginJs.signInMethod('standard_user', 'secret_sauce')
   });

   test('Product Validation',async()=>{
      test.setTimeout(3 * 60 * 1000)
      const productJS=new Product(page)
      await productJS.verifyProductPage()
   })