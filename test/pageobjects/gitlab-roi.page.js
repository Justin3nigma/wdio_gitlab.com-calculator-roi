const Page = require('./page');

class GitlabRoiPage extends Page {

    constructor() {
        super();
        this.url = '/calculator/roi';
    }

    get cookieAcceptBtn () { return $('#onetrust-accept-btn-handler');}
    get numOfUsers(){return $('input[id="numberOfUsers"]');}
    get numOfMaintainers(){return $('input[id="numberOfMaintainers"]');}
    get continue(){return $('#__layout > div > div:nth-child(2) > div.slp-container > section.calculator-wrapper > article > div.form > div:nth-child(1) > button');}
   
    async yourPeople(val1, val2) {
        await this.numOfUsers.setValue(val1);
        await this.numOfMaintainers.setValue(val2);
    }

    open () {
        return super.open('/');
    }
}

module.exports = new GitlabRoiPage();
