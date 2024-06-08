import URL from "../fixtures/urls.json";

class LoggedUserPage {

    elements = {
        loggedInUsernameLabel : () => cy.get("a[title='View my customer account'] > span")
    }

    validateUserLoggedInURL() {
        cy.url().should("eq", URL.loggedInUserURL);
    }

    validateUserLoggedInUsername(username: string) {
        this.elements.loggedInUsernameLabel().should("have.text", username);
    }
}

export default LoggedUserPage;