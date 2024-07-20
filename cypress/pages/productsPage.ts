class ProductsPage {
    
    elements = {
        womenButton : (Title: string) => cy.get(`a[title='${Title}']`),
        productAvailableWithDiffOpObject : () => cy.get("span > span.available-dif").parent(),
        productNoLongerStockLabel : () => cy.get("span#availability_value.label.label-warning"),
        productInStockLabel : () => cy.get("span#availability_value.label.label-success"),
        quantityInput : () => cy.get("input#quantity_wanted"),
        sizeDropDowndown : () => cy.get("select#group_1"),
        addToCartButton : () => cy.get("button[name='Submit']"),
        proceedToCheckoutButton : () => cy.get("a[title='Proceed to checkout']"),
        tosCheckbox : () => cy.get("input#cgv"),
        bankwirePayButton : () => cy.get("a.bankwire"),
        chequePayButton : () => cy.get("a.cheque"),
        confirmMyOrderButton : () => cy.get("button[class='button btn btn-default button-medium'][type='submit']"),
        orderSuccessLabel : () => cy.get("p.alert.alert-success")
    }


}