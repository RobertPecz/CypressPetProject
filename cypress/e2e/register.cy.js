import loginPage from '../pages/mainpage.cy.js';
import registerPage from '../pages/registerPage.cy.js'
import registerData from '../fixtures/registration.json'

describe('001 register tests', () => {

    it('05 Register user with valid email and password', () => {
        const login = new loginPage();
        login.visit();
        login.clickOnSignInButton();
        const register = new registerPage();
        const registerForm = new register.StartRegistration();

        const loggedUserPage = registerForm.FillRegistrationForm(
            registerData.gender, registerData.firstName, registerData.lastName, registerData.pwd, 
            registerData.dobDay, registerData.dobMonth, registerData.dobYear);

        loggedUserPage.ValidateUserLoggedInURL();
        loggedUserPage.ValidateUserLoggedInUsername();
    })
})