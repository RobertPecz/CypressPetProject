class ProductsPage {
    
    elements = {
        womenButton : () => cy.get("a[title='Women']"),
        addToCartButtonIfNotOutOfStock : () => cy.get("span > span.available-dif")
    }
}