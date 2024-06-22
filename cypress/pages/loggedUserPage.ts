import URL from "../fixtures/urls.json";

class LoggedUserPage {

    elements = {
        loggedInUsernameLabel : () => cy.get("a[title='View my customer account'] > span")
    }

    validateUserLoggedInURL() {
        const baseUrl = Cypress.config('baseUrl');
        cy.url().should("eq", baseUrl + URL.loggedInUserURL);
    }

    validateUserLoggedInUsername(username: string) {
        this.elements.loggedInUsernameLabel().should("have.text", username);
    }
}

export default LoggedUserPage;