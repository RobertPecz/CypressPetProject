import CreateAccountPage from './createAccountPage';
import ErrorMessage from './errorMessages';
import MainPage from './mainPage';
import feedbackMessages from "../fixtures/feedbackMessages.json";

class RegisterPage {

    randomEmailString = "";

    elements = {
        registerEmailAddressInput : () => cy.get("input#email_create"),
        registerButton : () => cy.get("button#SubmitCreate"),
    }

    createRandomString(length: number) {
        let result = '';
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let index = 0; index < length; index++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));           
        }

        return result;
    }

    createRandomEmail() {
        let randomEmail = '';
        randomEmail += this.createRandomString(5) + "@" + this.createRandomString(5) + ".com"
        
        return randomEmail;
    }

    startRegistration() {
        this.randomEmailString = this.createRandomEmail();
        this.elements.registerEmailAddressInput().type(this.randomEmailString);
        this.elements.registerButton().click();

        return new CreateAccountPage(this.randomEmailString);
    }

    startInvalidRegistration(emailInput: string, errorMessage: string) {
        this.elements.registerEmailAddressInput().type(emailInput);
        this.elements.registerButton().click();
        var mainpage = new MainPage();
        ErrorMessage.validateErrorMessage(mainpage.elements.detailErrorMessageLabel(), errorMessage);
    }
}

export default RegisterPage;