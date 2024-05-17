import loginData from '../fixtures/login.json';
import loginPage from '../pages/mainpage.cy.js';

describe('001 Login tests', () => {
  
  it('01 Login with valid email and password', () => {
    const login = new loginPage();
    login.visit();
    const loggedUserPage = login.loginToPage(loginData.loginName, loginData.password);
    loggedUserPage.ValidateUserLoggedInURL();
    loggedUserPage.ValidateUserLoggedInUsername();
  });

});
