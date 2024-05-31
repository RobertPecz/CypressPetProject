import LoggedUserPage from "./loggedUserPage.cy";
import URL from "../fixtures/urls.json";

class MainPage {

    elements = {
        signInButton : () => cy.get("a[title='Log in to your customer account']"),
        usernameTextbox : () => cy.get("input#email"),
        passwordTextbox : () => cy.get("input#passwd"),
        loginButton : () => cy.get("button#SubmitLogin"),
        generalErrorLabel : () => cy.get("div[class='alert alert-danger'] > p"),
        detailErrorMessageLabel : () => cy.get("div[class='alert alert-danger'] > ol > li")
    }

    visit() {
        cy.visit(URL.mainpageURL);
    }

    clickOnSignInButton() {
        this.elements.signInButton().click();
    }

    populateUserNameField(username) {
        this.elements.usernameTextbox().type(username);
    }

    populatePasswordField(password) {
        this.elements.passwordTextbox().type(password);
    }

    submitLoginButton() {
        this.elements.loginButton().click();
    }

    loginToPage(username, password) {
        this.clickOnSignInButton();
        this.populateUserNameField(username);
        this.populatePasswordField(password);
        this.submitLoginButton();

        return new LoggedUserPage();
    }

    validateErrorMessage(errorLabel, errorMessage) {
        errorLabel.should("have.text", errorMessage)
    }
}

export default MainPage;