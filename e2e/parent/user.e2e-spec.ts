import {UserPage} from './user.po';
import {server} from 'mock-http-server';

describe('User page', () => {
  let page: UserPage;

  beforeEach(async () => {
    page = new UserPage();
    await page.navigateTo();
  });

  it('should show the user', async () => {
    server.respond({
      expression: '/api/user',
      method: 'GET',
      data: {
        name: 'RogerRabbit'
      }
    });
    await page.getSendButton().click();
    expect(await page.getUserName()).toBe('RogerRabbit');
  });

});
