import LoggedUserPage from "./loggedUserPage";
import feedbackMessages from "../fixtures/feedbackMessages.json";

class CreateAccountPage {

    randomEmailString = "";

    constructor (randomEmailString: string) {
        this.randomEmailString = randomEmailString;
    }
    
    elements = {
        //Create an account elements
        mrRadioButton : () => cy.get("input#id_gender1"),
        mrsRadioButton : () => cy.get("input#id_gender2"),
        firstNameInput : () => cy.get("input#customer_firstname"),
        lastNameInput : () => cy.get("input#customer_lastname"),
        emailInput : () => cy.get("input#email"),
        passwordInput : () => cy.get("input#passwd"),

        //Date of birth fields
        dobDayDropdown : () => cy.get("select#days"),
        dobMonthDropdown : () => cy.get("select#months"),
        dobYearDropdown : () => cy.get("select#years"),
        signUpNewsLetterCheckbox : () => cy.get("input#newsletter"),
        submitRegistrationButton : () => cy.get("button#submitAccount"),
        accountCreatedLabel : () => cy.get("p.alert.alert-success")
    }

    fillRegistrationForm(gender: "male" | "female", firstName: string, lastName: string, pwd: string, dobDay: string, dobMonth: string, dobYear: string) {
        try{
            if(gender.toLowerCase() == "male") {
                this.elements.mrRadioButton().click();
            }
            else if(gender.toLowerCase() == "female") {
                this.elements.mrsRadioButton().click();
            }
            else {
                throw new Error("Only male and female can choose as gender.");
            }
        }
        catch (error) {
            cy.log(error);
        }

        //https://github.com/cypress-io/cypress/issues/3587
        //Check which option the best to send empty string.
        this.elements.firstNameInput().type(firstName); 
        this.elements.lastNameInput().type(lastName);
        this.elements.emailInput().should("have.value", this.randomEmailString);
        this.elements.passwordInput().type(pwd);
        this.elements.dobDayDropdown().select(dobDay);
        this.elements.dobMonthDropdown().select(dobMonth);
        this.elements.dobYearDropdown().select(dobYear);
        this.elements.submitRegistrationButton().click();
    }

    createAccountSuccess() {
        this.elements.accountCreatedLabel().contains(feedbackMessages.accountCreatedSuccesMessage);
        return new LoggedUserPage();
    }
}

export default CreateAccountPage;