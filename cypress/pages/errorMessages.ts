class ErrorMessage {
    static validateErrorMessage(errorLabel: Cypress.Chainable<JQuery<HTMLElement>>, errorMessage: string) {
        errorLabel.should('contain.text', errorMessage);
    }
}

export default ErrorMessage;