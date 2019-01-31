import { AppPage } from './app.po';
import {browser, by, element, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should add printer', async () => {
    await page.navigateTo();

    page.getAddButton().click();

    // element(by.model('printer.name')).sendKeys('e2e test printer');
    // element(by.model('printer.inetaddr')).sendKeys('255.255.255.0');
    // element(by.buttonText('Dodaj')).click();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
