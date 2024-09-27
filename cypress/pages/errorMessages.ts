class ErrorMessage {
    static validateErrorMessage(errorLabel: Cypress.Chainable<JQuery<HTMLElement>>, errorMessage: string) {
        errorLabel.contains(errorMessage)
    }
}

export default ErrorMessage;