const Page = require('./page');

class SecondPage extends Page {
    
    get sourceCodeManagement(){return $('input[id="sourceCodeManagement"]');}
    get continuousIntegration(){return $('input[id="continuousIntegration"]');}
    get continuousDeliverySpend(){return $('input[id="continuousDeliverySpend"]');}
    get registries(){return $('input[id="registries"]');}
    get agileProjectManagement(){return $('input[id="agileProjectManagement"]');}
    get agilePortfolioManagementSpend(){return $('input[id="agilePortfolioManagementSpend"]');}
    get applicationSecurity(){return $('input[id="applicationSecurity"]');}

    get seeYourSavings(){return $('#__layout > div > div:nth-child(2) > div.slp-container > section.calculator-wrapper > article > div.form > div:nth-child(2) > button');}
   
    async setSourceCodeManagement(amount) {
        await this.sourceCodeManagement.setValue(amount);
    }
    async setcontinuousIntegration(amount) {
        await this.continuousIntegration.setValue(amount);
    }
    async setContinuousDeliverySpend(amount) {
        await this.continuousDeliverySpend.setValue(amount);
    }
    async setAgileProjectManagement(amount) {
        await this.agileProjectManagement.setValue(amount);
    }
    async setAgilePortfolioManagementSpend(amount) {
        await this.agilePortfolioManagementSpend.setValue(amount);
    }
    async setRegistry(amount) {
        await this.registries.setValue(amount);
    }

    get search(){return $('#be-navigation-mobile > div.tablet > div > button.slp-btn.slp-ml-16.search-icon.slp-btn-icon > svg');}
    get searchBar(){return $('#be-navigation-mobile > section > div.slp-container.search__container > div > div.slp-col-md-9 > div.search-content > div.search-content__input.slp-mb-16 > input[type=text]');}
    get next(){return $('#be-navigation-desktop > section > div.slp-container.search__container > div > div.slp-col-md-9 > div > div.pagination > ul > li:nth-child(6) > button');}

    async searchThis(val) {await this.searchBar.setValue(val);}

    open () {
        return super.open('/?step2');
    }
}

module.exports = new SecondPage();
