class LoggedUserPage {

    ValidateUserLoggedInURL() {
        cy.url().should('eq', 'http://www.automationpractice.pl/index.php?controller=my-account');
    }

    ValidateUserLoggedInUsername() {
        cy.get("a[title='View my customer account'] > span").should('have.text', 'Robert Pecz');
    }
}

export default LoggedUserPage;