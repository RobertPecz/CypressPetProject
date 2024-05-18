import LoggedUserPage from "./loggedUserPage.cy";
import URL from "../fixtures/urls.json";
import errorMessages from "../fixtures/errorMessages.json";

class MainPage {

    elements = {
        signInButton : () => cy.get("a[title='Log in to your customer account']"),
        usernameTextbox : () => cy.get("input#email"),
        passwordTextbox : () => cy.get("input#passwd"),
        loginButton : () => cy.get("button#SubmitLogin"),
        generalErrorLabel : () => cy.get("div[class='alert alert-danger'] > p"),
        invalidPasswordErrorLabel : () => cy.get("div[class='alert alert-danger'] > ol > li")
    }

    visit() {
        cy.visit(URL.loggedInUserURL);
    }

    clickOnSignInButton() {
        this.elements.signInButton.click();
    }

    populateUserNameField(username) {
        this.elements.usernameTextbox.type(username);
    }

    populatePasswordField(password) {
        this.elements.passwordTextbox.type(password);
    }

    submitLoginButton() {
        this.elements.loginButton.click();
    }

    loginToPage(username, password) {
        this.clickOnSignInButton();
        this.populateUserNameField(username);
        this.populatePasswordField(password);
        this.submitLoginButton();

        return new LoggedUserPage();
    }

    validateGeneralErrorMessage() {
        this.elements.generalErrorLabel.should("have.text", errorMessages.generalErrorMessage);
    }

    validateInvalidPasswordError() {
        this.elements.invalidPasswordErrorLabel.should("have.text", errorMessages.invalidPasswordErrorMessage);
    }
}

export default MainPage;