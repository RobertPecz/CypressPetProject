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

    fillRegistrationForm(
        gender: "male" | "female", 
        firstName: string = "{backspace}", 
        lastName: string = "{backspace}", 
        email: string = "{backspace}",
        pwd: string = "{backspace}", 
        dobDay: string = "{backspace}", 
        dobMonth: string = "{backspace}", 
        dobYear: string = "{backspace}") {
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


        this.typeInElement(this.elements.firstNameInput(), firstName); 
        this.typeInElement(this.elements.lastNameInput(), lastName);
        if(email === "{backspace}") {
            this.elements.emailInput().should("have.value", this.randomEmailString);
        }
        else {
            this.typeInElement(this.elements.emailInput(), email);
        }
        this.typeInElement(this.elements.passwordInput(), pwd);
        this.selectElement(this.elements.dobDayDropdown(), dobDay);
        this.selectElement(this.elements.dobMonthDropdown(), dobMonth);
        this.selectElement(this.elements.dobYearDropdown(), dobYear);
        this.elements.submitRegistrationButton().click();
    }

    private typeInElement(element: Cypress.Chainable<JQuery<HTMLElement>>, typeMessage: string) {
        element.type(typeMessage);
    }

    private selectElement(element: Cypress.Chainable<JQuery<HTMLElement>>, option: string) {
        element.select(option);
    }

    createAccountSuccess() {
        this.elements.accountCreatedLabel().contains(feedbackMessages.accountCreatedSuccesMessage);
        return new LoggedUserPage();
    }
}

export default CreateAccountPage;