import LoginPage from '../pages/mainPage';
import RegisterPage from '../pages/registerPage';
import RegisterData from '../fixtures/registration.json';

describe('001 register tests', () => {
    const Login = new LoginPage();
    beforeEach(() => {
        Login.visit();
        Login.clickOnSignInButton();
    })

    it('05 Register user with valid email and password', () => {
        const Register = new RegisterPage();
        const RegisterForm = Register.startRegistration();

        const LoggedUserPage = RegisterForm.fillRegistrationForm(
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