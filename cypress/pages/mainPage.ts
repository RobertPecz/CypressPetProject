import LoggedUserPage from "./loggedUserPage";
import URL from "../fixtures/urls.json";

class MainPage {

    elements = {
        signInButton : () => cy.get("a[title='Log in to your customer account']"),
        usernameTextbox : () => cy.get("input#email"),
        passwordTextbox : () => cy.get("input#passwd"),
        loginButton : () => cy.get("button#SubmitLogin"),
        generalErrorLabel : () => cy.get("div[class='alert alert-danger'] > p"),
        detailErrorMessageLabel : () => cy.get("div[class='alert alert-danger'] > ol > li"),
        generalWarningLabel : () => cy.get("p.alert.alert-warning")
    }

    visit() {
        cy.visit('/');
    }

    clickOnSignInButton() {
        this.elements.signInButton().click();
    }

    populateUserNameField(username: string) {
        this.elements.usernameTextbox().type(username);
    }

    populatePasswordField(password: string) {
        this.elements.passwordTextbox().type(password);
    }

    submitLoginButton() {
        this.elements.loginButton().click();
    }

    loginToPage(username: string, password: string) {
        this.clickOnSignInButton();
        this.populateUserNameField(username);
        this.populatePasswordField(password);
        this.submitLoginButton();

        return new LoggedUserPage();
    }
}

export default MainPage;