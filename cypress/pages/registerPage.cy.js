class RegisterPage {

    randomEmailString = "";

    elements = {
        registerEmailAddressInput : () => cy.get("input#email_create"),
        registerButton : () => cy.get("button#SubmitCreate"),

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
        submitRegistrationButton : () => cy.get("button#submitAccount")
    }

    CreateRandomString() {
        let result = '';
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let index = 0; index < 5; index++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));           
        }

        return result;
    }

    CreateRandomEmail() {
        let randomEmail = '';
        randomEmail += this.CreateRandomString() + "@" + this.CreateRandomString() + ".com"
        
        return randomEmail;
    }

    StartRegistration() {
        this.randomEmailString = this.CreateRandomEmail();
        this.elements.registerEmailAddressInput().type(this.randomEmailString);
        this.elements.registerButton().click();

        return new CreateAccountPage();
    }

    FillRegistrationForm(gender, firstName, lastName, pwd, dobDay, dobMonth, dobYear) {
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

        this.elements.firstNameInput().type(firstName); 
        this.elements.lastNameInput().type(lastName);
        this.elements.emailInput().should("have.text", this.randomEmailString);
        this.elements.passwordInput().type(pwd)
        this.elements.dobDayDropdown().select(dobDay);
        this.elements.dobMonthDropdown().select(dobMonth);
        this.elements.dobYearDropdown().select(dobYear);
        this.elements.submitRegistrationButton().click();
    }
}

export default RegisterPage;