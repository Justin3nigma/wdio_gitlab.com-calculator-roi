module.exports = class Page {
    
    constructor() {
        this.url = "";
    }

    open() {
        return browser.url(this.url);
    }
}
