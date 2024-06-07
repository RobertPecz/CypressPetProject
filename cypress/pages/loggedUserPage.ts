import URL from "../fixtures/urls.json";

class LoggedUserPage {

    elements = {
        loggedInUsernameLabel : () => cy.get("a[title='View my customer account'] > span")
    }

    ValidateUserLoggedInURL() {
        cy.url().should("eq", URL.loggedInUserURL);
    }

    ValidateUserLoggedInUsername(username) {
        this.elements.loggedInUsernameLabel().should("have.text", username);
    }
}

export default LoggedUserPage;