import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/parent');
  }

  getCount() {
    return element(by.css('h3.statcard-number')).getText();
  }
}
