import CreateAccountPage from './createAccountPage';

class RegisterPage {

    randomEmailString = "";

    elements = {
        registerEmailAddressInput : () => cy.get("input#email_create"),
        registerButton : () => cy.get("button#SubmitCreate"),
    }

    createRandomString() {
        let result = '';
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let index = 0; index < 5; index++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));           
        }

        return result;
    }

    createRandomEmail() {
        let randomEmail = '';
        randomEmail += this.createRandomString() + "@" + this.createRandomString() + ".com"
        
        return randomEmail;
    }

    startRegistration() {
        this.randomEmailString = this.createRandomEmail();
        this.elements.registerEmailAddressInput().type(this.randomEmailString);
        this.elements.registerButton().click();

        return new CreateAccountPage(this.randomEmailString);
    }
}

export default RegisterPage;