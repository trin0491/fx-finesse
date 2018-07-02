import {AppPage} from './app.po';

describe('fx-finesse App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display a 0 count', async () => {
    await page.navigateTo();
    expect(await page.getCount()).toEqual('0');
  });
});
