import LoginPage from '../pages/mainPage';
import RegisterPage from '../pages/registerPage';
import RegisterData from '../fixtures/registration.json';
import ErrorMessage from '../pages/errorMessages';
import FeedbackMessages from "../fixtures/feedbackMessages.json";
import LoginData from "../fixtures/login.json";

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
            gender.male, RegisterData.firstName, RegisterData.lastName, null, RegisterData.pwd, 
            RegisterData.dobDay, RegisterData.dobMonth, RegisterData.dobYear);
        
        const LoggedUserPage = RegisterForm.createAccountSuccess();
        LoggedUserPage.validateUserLoggedInURL();
        LoggedUserPage.validateUserLoggedInUsername(RegisterData.fullName);
    })

    it('06 Register user with invalid email and valid password', () => {
        const register = new RegisterPage();
        register.startInvalidRegistration(register.createRandomString(5), FeedbackMessages.invalidEmailAddressErrorMessage);
    })

    it('07 Register user with valid email and invalid password', () => {
        const Register = new RegisterPage();
        const mainpage = new LoginPage();
        const RegisterForm = Register.startRegistration();

        RegisterForm.fillRegistrationForm(
            gender.male, RegisterData.firstName, RegisterData.lastName, null, Register.createRandomString(3), 
            RegisterData.dobDay, RegisterData.dobMonth, RegisterData.dobYear);
            
        ErrorMessage.validateErrorMessage(mainpage.elements.detailErrorMessageLabel(), FeedbackMessages.invalidRegistrationPasswordErrorMessage);
    })

    it('08 Register user with valid email and empty password', () => {
        const Register = new RegisterPage();
        const mainpage = new LoginPage();
        const RegisterForm = Register.startRegistration();
        
        //Cypress not accept empty string with type.
        RegisterForm.fillRegistrationForm(
            gender.male, RegisterData.firstName, RegisterData.lastName, null, "{backspace}", 
            RegisterData.dobDay, RegisterData.dobMonth, RegisterData.dobYear);
            
        ErrorMessage.validateErrorMessage(mainpage.elements.detailErrorMessageLabel(), FeedbackMessages.missingRegistrationPasswordErrorMessage);
    })

    it('09 Register user with empty email and valid password', () => {
        const Register = new RegisterPage();
        const mainpage = new LoginPage();
        const RegisterForm = Register.startRegistration();
        
        //Cypress not accept empty string with type.
        RegisterForm.fillRegistrationForm(
            gender.male, RegisterData.firstName, RegisterData.lastName, "{selectall}{del}", RegisterData.pwd, 
            RegisterData.dobDay, RegisterData.dobMonth, RegisterData.dobYear);

        ErrorMessage.validateErrorMessage(mainpage.elements.detailErrorMessageLabel(), FeedbackMessages.emailRequiredErrorMessage);
    })

    it('10 Register user with email what is already registered', () => {
        const register = new RegisterPage();
        register.startInvalidRegistration(LoginData.loginName, FeedbackMessages.emailAlreadyRegisteredErrorMessage);
    })

    it('11 Register user without selecting gender', () => {
        const Register = new RegisterPage();
        const RegisterForm = Register.startRegistration();

        RegisterForm.fillRegistrationFormNoGender(RegisterData.firstName, RegisterData.lastName, null, RegisterData.pwd, 
            RegisterData.dobDay, RegisterData.dobMonth, RegisterData.dobYear)

        const LoggedUserPage = RegisterForm.createAccountSuccess();
        LoggedUserPage.validateUserLoggedInURL();
        LoggedUserPage.validateUserLoggedInUsername(RegisterData.fullName);
    })

    it('12 Register user without input first name', () => {
        const Register = new RegisterPage();
        const mainpage = new LoginPage();
        const RegisterForm = Register.startRegistration();

        RegisterForm.fillRegistrationForm(
            gender.male, "{backspace}", RegisterData.lastName, null, RegisterData.pwd, 
            RegisterData.dobDay, RegisterData.dobMonth, RegisterData.dobYear);
        
        ErrorMessage.validateErrorMessage(mainpage.elements.detailErrorMessageLabel(), FeedbackMessages.firstNameRequiredErrorMessage);
    })

    it('13 Register user without input last name', () => {
        const Register = new RegisterPage();
        const mainpage = new LoginPage();
        const RegisterForm = Register.startRegistration();

        RegisterForm.fillRegistrationForm(
            gender.male, RegisterData.firstName, "{backspace}", null, RegisterData.pwd, 
            RegisterData.dobDay, RegisterData.dobMonth, RegisterData.dobYear);
        
        ErrorMessage.validateErrorMessage(mainpage.elements.detailErrorMessageLabel(), FeedbackMessages.lastNameRequiredErrorMessage);
    })

    it('14 Register user with email changed', () => {
        const Register = new RegisterPage();
        const RegisterForm = Register.startRegistration();

        RegisterForm.fillRegistrationForm(
            gender.male, RegisterData.firstName, RegisterData.lastName, Register.createRandomEmail(), RegisterData.pwd, 
            RegisterData.dobDay, RegisterData.dobMonth, RegisterData.dobYear);

        const LoggedUserPage = RegisterForm.createAccountSuccess();
        LoggedUserPage.validateUserLoggedInURL();
        LoggedUserPage.validateUserLoggedInUsername(RegisterData.fullName);
    })

    it('15 Register user with invalid email changed', () => {
        const Register = new RegisterPage();
        const mainpage = new LoginPage();
        const RegisterForm = Register.startRegistration();

        RegisterForm.fillRegistrationForm(
            gender.male, RegisterData.firstName, RegisterData.lastName, Register.createRandomString(5), RegisterData.pwd, 
            RegisterData.dobDay, RegisterData.dobMonth, RegisterData.dobYear);

        ErrorMessage.validateErrorMessage(mainpage.elements.detailErrorMessageLabel(), FeedbackMessages.emailIsInvalidErrorMessage);
    })

    it('16 Register user without select date of birth day', () => {
        const Register = new RegisterPage();
        const mainpage = new LoginPage();
        const RegisterForm = Register.startRegistration();

        RegisterForm.fillRegistrationForm(
            gender.male, RegisterData.firstName, RegisterData.lastName, null, RegisterData.pwd, 
            '-', RegisterData.dobMonth, RegisterData.dobYear);

        ErrorMessage.validateErrorMessage(mainpage.elements.detailErrorMessageLabel(), FeedbackMessages.invalidDobErrorMessage);
    })

    it('17 Register user without select date of birth month', () => {
        const Register = new RegisterPage();
        const mainpage = new LoginPage();
        const RegisterForm = Register.startRegistration();

        RegisterForm.fillRegistrationForm(
            gender.male, RegisterData.firstName, RegisterData.lastName, null, RegisterData.pwd, 
            RegisterData.dobDay, '-', RegisterData.dobYear);

        ErrorMessage.validateErrorMessage(mainpage.elements.detailErrorMessageLabel(), FeedbackMessages.invalidDobErrorMessage);
    })

    it('18 Register user without select date of birth year', () => {
        const Register = new RegisterPage();
        const mainpage = new LoginPage();
        const RegisterForm = Register.startRegistration();

        RegisterForm.fillRegistrationForm(
            gender.male, RegisterData.firstName, RegisterData.lastName, null, RegisterData.pwd, 
            RegisterData.dobDay, RegisterData.dobMonth, '-');

        const LoggedUserPage = RegisterForm.createAccountSuccess();
        LoggedUserPage.validateUserLoggedInURL();
        LoggedUserPage.validateUserLoggedInUsername(RegisterData.fullName);
    })

    it('19 Register user without date of birth', () => {
        const Register = new RegisterPage();
        const RegisterForm = Register.startRegistration();

        RegisterForm.fillRegistrationForm(
            gender.male, RegisterData.firstName, RegisterData.lastName, null, RegisterData.pwd, 
            '-', '-', '-');
        
        const LoggedUserPage = RegisterForm.createAccountSuccess();
        LoggedUserPage.validateUserLoggedInURL();
        LoggedUserPage.validateUserLoggedInUsername(RegisterData.fullName);
    })
})