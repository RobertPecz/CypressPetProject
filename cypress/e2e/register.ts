import LoginPage from '../pages/mainpage';
import RegisterPage from '../pages/registerPage';
import RegisterData from '../fixtures/registration.json';

describe('001 register tests', () => {

    it('05 Register user with valid email and password', () => {
        const login = new LoginPage();
        login.visit();
        login.clickOnSignInButton();
        const register = new RegisterPage();
        const registerForm = register.startRegistration();

        const LoggedUserPage = registerForm.fillRegistrationForm(
            RegisterData.gender, RegisterData.firstName, RegisterData.lastName, RegisterData.pwd, 
            RegisterData.dobDay, RegisterData.dobMonth, RegisterData.dobYear);

        LoggedUserPage.validateUserLoggedInURL();
        LoggedUserPage.validateUserLoggedInUsername(RegisterData.fullName);
    })

    it('06 Register user with invalid email and valid password.', () => {
        const login = new LoginPage();
        login.visit();
        login.clickOnSignInButton();
        const register = new RegisterPage();
        register.startInvalidEmailRegistration();
    })
})