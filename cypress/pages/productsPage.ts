import feedbackMessages from "../fixtures/feedbackMessages.json";

class ProductsPage {
    
    elements = {
        womenButton : (title: string) => cy.get(`a[title='${title}']`), 
        productAvailableObject : (productTitle : string) => cy.get(`div[class='right-block'] > h5 > a[title='${productTitle}']`),       
        productNoLongerStockLabel : () => cy.get("span#availability_value.label.label-warning"),
        productInStockLabel : () => cy.get("span#availability_value.label.label-success"),
        sizeDropDowndown : () => cy.get("select#group_1"),
        quantityInput : () => cy.get("input#quantity_wanted"),
        addToCartButton : () => cy.get("button[name='Submit']"),
        proceedToCheckoutPopupButton : () => cy.get("a[class='btn btn-default button button-medium'][title='Proceed to checkout']"),
        proceedToCheckoutButton : () => cy.get("a[class='button btn btn-default standard-checkout button-medium'][title='Proceed to checkout']"),
        proceedToCheckoutAddressButton : () => cy.get("button[name='processAddress']"),
        proceedToCheckoutShippingButton : () => cy.get("button[name='processCarrier']"),
        tosCheckbox : () => cy.get("input#cgv"),
        bankwirePayButton : () => cy.get("a.bankwire"),
        chequePayButton : () => cy.get("a.cheque"),
        confirmMyOrderButton : () => cy.get("button[class='button btn btn-default button-medium'][type='submit']"),
        orderSuccessLabel : () => cy.get("p.alert.alert-success")
    }

    navigateToWomenDressCategory(title: string) {
        this.elements.womenButton(title).click();
    }

    selectDressWhichInStock(productTitle : string) {
        this.elements.productAvailableObject(productTitle).click();
    }

    selectQuanityAndSize(quantity: string, size: string) {
        this.elements.sizeDropDowndown().select(size);
        this.elements.quantityInput().type(quantity);
    }

    checkoutProductProcess() {
        this.elements.addToCartButton().click();
        //Proceed to checkout on the popup page
        this.elements.proceedToCheckoutPopupButton().click();
        //01. Summary page
        this.elements.proceedToCheckoutButton().click();
        //03. Address page
        this.elements.proceedToCheckoutAddressButton().click();
        //04. Shipping page
        this.elements.tosCheckbox().check();
        this.elements.proceedToCheckoutShippingButton().click();
        //05. Payment page
        this.elements.bankwirePayButton().click();
        this.elements.confirmMyOrderButton().click();
        this.elements.orderSuccessLabel().should("have.text", feedbackMessages.orderConfirmedMessage)
    }

    buyProductProcess(title: string, productTitle: string, quantity: string, size: string) {
        this.navigateToWomenDressCategory(title);
        this.selectDressWhichInStock(productTitle);
        this.selectQuanityAndSize(quantity, size);
        //this.checkoutProductProcess();
    }
}

export default ProductsPage;