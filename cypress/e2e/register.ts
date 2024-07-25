import LoginPage from '../pages/mainPage';
import RegisterPage from '../pages/registerPage';
import RegisterData from '../fixtures/registration.json';
import ErrorMessage from '../pages/errorMessages';
import MainPage from '../pages/mainPage';
import feedbackMessages from "../fixtures/feedbackMessages.json";

const enum gender {
    male = "male",
    female = "female"
}

describe('001 register tests', () => {
    const Login = new LoginPage();
    beforeEach(() => {
        Login.visit();
        Login.clickOnSignInButton();
    })

    it('05 Register user with valid email and password', () => {
        const Register = new RegisterPage();
        const RegisterForm = Register.startRegistration();

        RegisterForm.fillRegistrationForm(
            gender.male, RegisterData.firstName, RegisterData.lastName, RegisterData.pwd, 
            RegisterData.dobDay, RegisterData.dobMonth, RegisterData.dobYear);
        
        const LoggedUserPage = RegisterForm.createAccountSuccess();
        LoggedUserPage.validateUserLoggedInURL();
        LoggedUserPage.validateUserLoggedInUsername(RegisterData.fullName);
    })

    it('06 Register user with invalid email and valid password', () => {
        const login = new LoginPage();
        login.visit();
        login.clickOnSignInButton();
        const register = new RegisterPage();
        register.startInvalidEmailRegistration();
    })

    it('07 Register user with valid email and invalid password', () => {
        const Register = new RegisterPage();
        const mainpage = new MainPage();
        const RegisterForm = Register.startRegistration();

        RegisterForm.fillRegistrationForm(
            gender.male, RegisterData.firstName, RegisterData.lastName, Register.createRandomString(3), 
            RegisterData.dobDay, RegisterData.dobMonth, RegisterData.dobYear);
            
        ErrorMessage.validateErrorMessage(mainpage.elements.detailErrorMessageLabel(), feedbackMessages.invalidRegistrationPasswordMessage);
    })

    it('08 Register user with valid email and empty password', () => {
        const Register = new RegisterPage();
        const mainpage = new MainPage();
        const RegisterForm = Register.startRegistration();
        const enum pwdd {long='long', short = 'short'};
        RegisterForm.fillRegistrationForm(
            gender.male, RegisterData.firstName, RegisterData.lastName, '', 
            RegisterData.dobDay, RegisterData.dobMonth, RegisterData.dobYear);
            
        ErrorMessage.validateErrorMessage(mainpage.elements.detailErrorMessageLabel(), feedbackMessages.missingRegistrationPasswordMessage);
    })
})