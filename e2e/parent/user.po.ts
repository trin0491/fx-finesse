import {browser, by, element} from 'protractor';

export class UserPage {

  navigateTo() {
    return browser.get('/parent/user');
  }

  getUserName() {
    return element(by.css('.user-name')).getText();
  }

  getSendButton() {
    return element(by.css('button'));
  }
}
