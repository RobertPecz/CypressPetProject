import URL from "../fixtures/urls.json";
import loginData from '../fixtures/login.json';

class LoggedUserPage {

    elements = {
        loggedInUsernameLabel : () => cy.get("a[title='View my customer account'] > span")
    }

    ValidateUserLoggedInURL() {
        cy.url().should("eq", URL.mainpageURL);
    }

    ValidateUserLoggedInUsername() {
        this.elements.loggedInUsernameLabel.should("have.text", loginData.loggedInUserName);
    }
}

export default LoggedUserPage;