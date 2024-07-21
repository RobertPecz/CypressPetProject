import feedbackMessages from "../fixtures/feedbackMessages.json";

class ProductsPage {
    
    elements = {
        womenButton : (title: string) => cy.get(`a[title='${title}']`),
        productAvailableWithDiffOpObject : () => cy.get("span > span.available-dif").parent(),
        productNoLongerStockLabel : () => cy.get("span#availability_value.label.label-warning"),
        productInStockLabel : () => cy.get("span#availability_value.label.label-success"),
        sizeDropDowndown : () => cy.get("select#group_1"),
        quantityInput : () => cy.get("input#quantity_wanted"),
        addToCartButton : () => cy.get("button[name='Submit']"),
        proceedToCheckoutButton : () => cy.get("a[title='Proceed to checkout']"),
        tosCheckbox : () => cy.get("input#cgv"),
        bankwirePayButton : () => cy.get("a.bankwire"),
        chequePayButton : () => cy.get("a.cheque"),
        confirmMyOrderButton : () => cy.get("button[class='button btn btn-default button-medium'][type='submit']"),
        orderSuccessLabel : () => cy.get("p.alert.alert-success")
    }

    navigateToWomenDressCategory(title: string) {
        this.elements.womenButton(title).click();
    }

    selectDressWhichInStock() {
        this.elements.productAvailableWithDiffOpObject().click();
    }

    selectQuanityAndSize(quantity: string, size: "S" | "M" | "L") {
        this.elements.quantityInput().type(quantity);
        this.elements.sizeDropDowndown().select(size);
    }

    checkoutProductProcess() {
        this.elements.addToCartButton().click();
        //Proceed to checkout on the popup page
        this.elements.proceedToCheckoutButton().click();
        //01. Summary page
        this.elements.proceedToCheckoutButton().click();
        //03. Address page
        this.elements.proceedToCheckoutButton().click();
        //04. Shipping page
        this.elements.tosCheckbox().check();
        this.elements.proceedToCheckoutButton().click();
        //05. Payment page
        this.elements.bankwirePayButton().click();
        this.elements.confirmMyOrderButton().click();
        this.elements.orderSuccessLabel().should("have.text", feedbackMessages.orderConfirmedMessage)
    }

    buyProductProcess(title: string, quantity: string, size: "S" | "M" | "L") {
        this.navigateToWomenDressCategory(title);
        this.selectDressWhichInStock();
        this.selectQuanityAndSize(quantity, size);
        this.checkoutProductProcess();
    }
}

export default ProductsPage;