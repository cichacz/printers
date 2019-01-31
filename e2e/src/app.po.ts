import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/') as Promise<any>;
  }

  getAddButton() {
    return element(by.buttonText('Dodaj drukarkę'));
  }
}
