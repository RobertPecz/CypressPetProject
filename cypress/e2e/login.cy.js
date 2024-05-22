import loginData from '../fixtures/login.json';
import loginPage from '../pages/mainpage.cy.js';
import errorMessages from "../fixtures/errorMessages.json";

describe('001 Login tests', () => {
  
  it('01 Login with valid email and password', () => {
    const login = new loginPage();
    login.visit();
    const loggedUserPage = login.loginToPage(loginData.loginName, loginData.password);
    loggedUserPage.ValidateUserLoggedInURL();
    loggedUserPage.ValidateUserLoggedInUsername();
  });

  it('02 Login with valid email and invalid password', () => {
    const login = new loginPage();
    login.visit();
    const loggedUserPage = login.loginToPage(loginData.loginName, loginData.invalidPassword);
    login.validateErrorMessage(login.elements.generalErrorLabel(), errorMessages.generalErrorMessage)
    login.validateErrorMessage(login.elements.detailErrorMessageLabel(), errorMessages.invalidPasswordErrorMessage)
  });

  it('03 Login with invalid email and valid password', () => {
    const login = new loginPage();
    login.visit();
    const loggedUserPage = login.loginToPage(loginData.invalidEmail, loginData.password);
    login.validateErrorMessage(login.elements.generalErrorLabel(), errorMessages.generalErrorMessage)
    login.validateErrorMessage(login.elements.detailErrorMessageLabel(), errorMessages.autheticationErrorMessage)
  })
});
