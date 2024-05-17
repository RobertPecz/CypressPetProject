import LoggedUserPage from "./loggedUserPage.cy";

class MainPage {

    visit() {
        cy.visit("http://www.automationpractice.pl/index.php");
    }

    clickOnSignInButton() {
        cy.get("a[title='Log in to your customer account']").click();
    }

    populateUserNameField(username) {
        cy.get("input#email").type(username);
    }

    populatePasswordField(password) {
        cy.get("input#passwd").type(password);
    }

    submitLoginButton() {
        cy.get("button#SubmitLogin").click();
    }

    loginToPage(username, password) {
        this.clickOnSignInButton();
        this.populateUserNameField(username);
        this.populatePasswordField(password);
        this.submitLoginButton();

        return new LoggedUserPage();
    }

    validateGeneralErrorMessage() {
        cy.get("div[class='alert alert-danger'] > p").should('have.text', 'There is 1 error');
    }

    validateInvalidPasswordError() {
        cy.get("div[class='alert alert-danger'] > ol > li").should('have.text', 'Invalid password.');
    }
}

export default MainPage;