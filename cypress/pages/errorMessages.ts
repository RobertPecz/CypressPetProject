class ErrorMessage {
    static validateErrorMessage(errorLabel: Cypress.Chainable<JQuery<HTMLElement>>, errorMessage: string) {
        errorLabel.should("have.text", errorMessage)
    }
}

export default ErrorMessage;