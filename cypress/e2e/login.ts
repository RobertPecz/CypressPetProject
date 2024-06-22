import LoginData from '../fixtures/login.json';
import LoginPage from '../pages/mainpage';
import feedbackMessages from "../fixtures/feedbackMessages.json";

describe('001 Login tests', () => {
  const Login = new LoginPage();
  beforeEach(() => {
      Login.visit();
  })

  it('01 Login with valid email and password', () => {
    const LoggedUserPage = Login.loginToPage(LoginData.loginName, LoginData.password);
    LoggedUserPage.validateUserLoggedInURL();
    LoggedUserPage.validateUserLoggedInUsername(LoginData.loggedInUserName);
  });

  it('02 Login with valid email and invalid password', () => {  
    const LoggedUserPage = Login.loginToPage(LoginData.loginName, LoginData.invalidPassword);
    Login.validateErrorMessage(Login.elements.generalErrorLabel(), feedbackMessages.generalErrorMessage);
    Login.validateErrorMessage(Login.elements.detailErrorMessageLabel(), feedbackMessages.invalidPasswordErrorMessage);
  });

  it('03 Login with invalid email and valid password', () => { 
    const LoggedUserPage = Login.loginToPage(LoginData.invalidEmail, LoginData.password);
    Login.validateErrorMessage(Login.elements.generalErrorLabel(), feedbackMessages.generalErrorMessage);
    Login.validateErrorMessage(Login.elements.detailErrorMessageLabel(), feedbackMessages.autheticationErrorMessage);
  })

  it('04 Login with valid email and empty password', () => {
    Login.clickOnSignInButton();
    Login.populateUserNameField(LoginData.loginName);
    Login.submitLoginButton();
    Login.validateErrorMessage(Login.elements.generalErrorLabel(), feedbackMessages.generalErrorMessage);
    Login.validateErrorMessage(Login.elements.detailErrorMessageLabel(), feedbackMessages.passwordRequiredErrorMessage);
  })
});
