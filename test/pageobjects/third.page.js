const Page = require('./page');

class ThirdPage extends Page {
    
    get savingValue(){return $('#__layout > div > div:nth-child(2) > div.slp-container > section.calculator-wrapper > article > div.form > div:nth-child(3) > div:nth-child(3) > div > div.heading > h2 > span');}
    get currentSpend(){return $('#__layout > div > div:nth-child(2) > div.slp-container > section.calculator-wrapper > article > div.form > div:nth-child(3) > div:nth-child(3) > div > div.cards > div.result-card > p');}
    get gitLabPremium(){return $('#__layout > div > div:nth-child(2) > div.slp-container > section.calculator-wrapper > article > div.form > div:nth-child(3) > div:nth-child(3) > div > div.cards > div:nth-child(3) > div.result-card.premium > p');}

    open () {
        return super.open('/?step3');
    }
}

module.exports = new ThirdPage();
