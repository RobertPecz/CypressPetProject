import loginPage from '../pages/mainpage.cy.js';
import registerPage from '../pages/registerPage.cy.js'

describe('001 register tests', () => {

    it('05 Register user with valid email and password', () => {
        const login = new loginPage();
        login.visit();
        login.clickOnSignInButton();
        const register = new registerPage();
        register.StartRegistration();
        
    })
})