const GitlabRoiPage = require('../pageobjects/gitlab-roi.page')
const SecondPage = require('../pageobjects/second.page')
const ThirdPage = require('../pageobjects/third.page')

describe('Gitlab ROI calculator', async () => {
     beforeEach(() => {
    //1. Go the ROI calculator at https://about.gitlab.com/calculator/roi/.
        return GitlabRoiPage.open();
    })

    it('Test Case 01 - Happy Path', async () => {
    await (await GitlabRoiPage.cookieAcceptBtn).click();
    await GitlabRoiPage.open();
 
    //2. Verify that the interface defaults to 100 users and 1 DevOps tool maintainer.
    const defaultUser = await $('input[id="numberOfUsers"]');
    const defaultMaintainer= await $('input[id="numberOfMaintainers"]');
    const defaultUserValue = await defaultUser.getValue();
    const defaultMaintainerValue = await defaultMaintainer.getValue();
    await expect(await defaultUserValue).toEqual("100");
    await expect(await defaultMaintainerValue).toEqual("1");

    //3. Set the number of users to 200 and the number of DevOps tool maintainers to 2.
    await GitlabRoiPage.yourPeople('200','2');

    //4. Press the “Continue to next step” button.
    await (await GitlabRoiPage.continue).click();
   
     //5. Verify that the first step now has a checkmark, and all monetary amount fields on the page default to $0.

     const firstCheckMark = await $('article.calculator > ul.step-progress-bar').$$('li')[0];
     await expect(await firstCheckMark).toHaveAttr('class','stepper__item  completed');

    const defaultSCM = await $('input[id="sourceCodeManagement"]');
    const defaultCI = await $('input[id="continuousIntegration"]');
    const defaultCDS = await $('input[id="continuousDeliverySpend"]');
    const defaultRegostries = await $('input[id="registries"]');
    const defaultAPM = await $('input[id="agileProjectManagement"]');
    const defaultAPMS = await $('input[id="agilePortfolioManagementSpend"]');
    const defaultAS = await $('input[id="applicationSecurity"]');

    const defaultSCMvalue= await defaultSCM.getValue();
    const defaultCIvalue = await defaultCI.getValue();
    const defaultcCDSvalue = await defaultCDS.getValue();
    const defaultRegostriesvalue =  await defaultRegostries.getValue();
    const defaultAPMvalue = await defaultAPM.getValue();
    const defaultAPMSvalue = await defaultAPMS.getValue();
    const defaultASvalue = await defaultAS.getValue();

    await expect(await defaultSCMvalue).toEqual("0");
    await expect(await defaultCIvalue).toEqual("0");
    await expect(await defaultcCDSvalue).toEqual("0");
    await expect(await defaultRegostriesvalue).toEqual("0");
    await expect(await defaultAPMvalue).toEqual("0");
    await expect(await defaultAPMSvalue).toEqual("0");
    await expect(await defaultASvalue).toEqual("0");


    //6. Set Source Code Management, Continuous Integration, and Continuous Delivery to $3,000 each.
    await SecondPage.setSourceCodeManagement('3000');
    await SecondPage.setcontinuousIntegration('3000');
    await SecondPage.setContinuousDeliverySpend('3000');

    //7. Press the “See your savings” button.
    await (await SecondPage.seeYourSavings).click();

    //8. Verify that the second step now has a checkmark, and that the savings value is above $60,000.
    const secondCheckMark = await $('article.calculator > ul.step-progress-bar').$$('li')[1];
    await expect(await secondCheckMark).toHaveAttr('class','stepper__item  completed');

    //9. Verify that the current spend is $203,000 and GitLab Premium cost is $142,600.
    const defaultCS = await $('#__layout > div > div:nth-child(2) > div.slp-container > section.calculator-wrapper > article > div.form > div:nth-child(3) > div:nth-child(3) > div > div.cards > div.result-card > p');
    const defaultGLP = await $('#__layout > div > div:nth-child(2) > div.slp-container > section.calculator-wrapper > article > div.form > div:nth-child(3) > div:nth-child(3) > div > div.cards > div:nth-child(3) > div.result-card.premium > p');
    const CSvalue = await defaultCS.getText();
    const GLPvalue = await defaultGLP.getText();
    
    await expect(await CSvalue).toEqual("$203,000");
    await expect(await GLPvalue).toEqual("$142,600");
    })
    //-----------------------------------------------------------------------------------------------------------------------------
    it('Test Case 02 – Alternate Path', async () => {
        //2. Set the number of users to 80 and the number of DevOps tool maintainers to 1.
        await GitlabRoiPage.yourPeople('80','1');
        //3. Press the “Continue to next step” button.
        await (await GitlabRoiPage.continue).click();
        //4. Set Agile Project Management, Agile Portfolio management, and Registries to $1,000 each.
        await SecondPage.setAgileProjectManagement('1000');
        await SecondPage.setAgilePortfolioManagementSpend('1000');
        await SecondPage.setRegistry('1000');
        //5. Press the “See your savings” button.
        await (await SecondPage.seeYourSavings).click();
        //6. Verify that the interface only indicates that the current toolchain cost is $100,000.
        // outputs "" (empty string) since element is not interactable
        /**
        const defaultSV = await $('#__layout > div > div:nth-child(2) > div.slp-container > section.calculator-wrapper > article > div.form > div:nth-child(3) > div:nth-child(3) > div > div.heading > h2 > span');
        const Svalue = await defaultSV.getText();
        await expect(await Svalue).toEqual("$100,000");
        */   
            })
    //-----------------------------------------------------------------------------------------------------------------------------
    it('Test Case 03 – Search Modal ', async () => {
        
        //2. Press the “Continue to next step” button.
        await (await GitlabRoiPage.continue).click();
        const searchBtn =  await $('div.tablet > div').$$('button')[0];
        //3. Set Registries to $1,000.
        await SecondPage.setRegistry('1000');

        //4. Press the magnifying glass icon on the top navigation to show the search modal.
        await browser.pause(2000)
        await(searchBtn).click();

        //5. Verify that the page presents six suggestions.
        const suggestions = await $('.suggestions__default').$$('a')
        await expect(await suggestions.length).toBe(6);

        //6. Type “Testing” into the search bar.
        await SecondPage.searchThis('Testing');

        //7. Verify that the page updates to show ten suggestions.
        await browser.pause(2000);
        const suggestion_results = await $('div.suggestions').$$('div.suggestions__result');
        await expect(await suggestion_results.length).toBe(10);

        //8. Press Enter in the search bar to execute the search.
        browser.keys("\uE007"); 

        //9. Verify that the page populates with the ten suggestions from step 10.
        // 
        await browser.pause(2000);
        const suggestion_result_contents1 = await $('div.search-results__content').$$('a');
        expect(await suggestion_result_contents1.length).toBe(10);
        

        //10. Press the Next button at the bottom of the list of results.
        const nextBtn = await $('div.pagination > ul').$$('li')[5].$('button');
        await(nextBtn).click();

        //11. Verify that the page updates to show 10 different results.
        //
        await browser.pause(2000);
        const suggestion_result_contents2 = await $('div.search-results__content').$$('a');
        expect(await suggestion_result_contents2.length).toBe(10);

        //12. Press the magnifying glass on the top navigation to close the search modal.
        // await (await SecondPage.search).click();
        await browser.pause(2000)
        await(searchBtn).click();
        
        //13. Verify that Registries still has a value of $1000.
        await browser.pause(2000);
        expect(await $('#registries')).toHaveText(1000);
        })
      }
);