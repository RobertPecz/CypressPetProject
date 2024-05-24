class RegisterPage {

    elements = {
        registerEmailAddressInput : () => cy.get('input#email_create'),
        registerButton : () => cy.get('button#SubmitCreate')
    }

    CreateRandomString() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let index = 0; index < 5; index++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));           
        }

        return result;
    }

    CreateRandomEmail() {
        let randomEmail = '';
        randomEmail += this.CreateRandomString() + '@' + this.CreateRandomString() + '.com'
        
        return randomEmail;
    }

    StartRegistration() {
        this.elements.registerEmailAddressInput().type(this.CreateRandomEmail());
        this.elements.registerButton().click();

        return new CreateAccountPage();
    }
}

export default RegisterPage;