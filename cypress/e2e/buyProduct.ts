import LoginData from '../fixtures/login.json';
import ProductData from '../fixtures/products.json';
import LoginPage from '../pages/mainPage';
import ProductsPage from '../pages/productsPage';
import ErrorMessage from '../pages/errorMessages';
import FeedbackMessages from "../fixtures/feedbackMessages.json";

describe('002 Buy product tests', () => { 
    const Login = new LoginPage();
    beforeEach(() => {
        Login.visit();
        const LoggedUserPage = Login.loginToPage(LoginData.loginName, LoginData.password);
        LoggedUserPage.validateUserLoggedInURL();
        LoggedUserPage.validateUserLoggedInUsername(LoginData.loggedInUserName);
    })

    it('01 Buy one product', () => {
        const Product = new ProductsPage();
        Product.buyProductProcess(ProductData.titleWomen, ProductData.productTitleFirst, ProductData.quantityOne, ProductData.sizeLarge);
        Product.checkoutProductProcess();
    });

    it('02 Buy multiple products same product', () => {
        const Product = new ProductsPage();
        Product.buyProductProcess(ProductData.titleWomen, ProductData.productTitleSecond, ProductData.quantityMultiple, ProductData.sizeLarge);
        Product.checkoutProductProcess();
    })

    it('03 Buy multiple products different product', () => {
        const Product = new ProductsPage();
        Product.buyProductProcess(ProductData.titleWomen, ProductData.productTitleFirst, ProductData.quantityOne, ProductData.sizeLarge);
        Product.buyProductProcess(ProductData.titleWomen, ProductData.productTitleSecond, ProductData.quantityOne, ProductData.sizeMedium);
        Product.checkoutProductProcess();
    })

    it('04 Add product to the cart, remove from the cart', () => {
        const Product = new ProductsPage();
        const mainpage = new LoginPage();
        Product.buyProductProcess(ProductData.titleWomen, ProductData.productTitleFirst, ProductData.quantityOne, ProductData.sizeLarge);
        Product.deleteProductFromShoppingCart();
        Product.validateShoppingCartIsEmpty();
        ErrorMessage.validateErrorMessage(mainpage.elements.generalWarningLabel(), FeedbackMessages.emptyShoppingCartWarningMessage);
    })

    it('05 Add multiple product to the cart, remove one product', () => {
        const Product = new ProductsPage();
        Product.buyProductProcess(ProductData.titleWomen, ProductData.productTitleFirst, ProductData.quantityOne, ProductData.sizeLarge);
        Product.buyProductProcess(ProductData.titleWomen, ProductData.productTitleSecond, ProductData.quantityOne, ProductData.sizeMedium);
        Product.navigateToShoppingCart();
        Product.deleteProductFromShoppingCart();
        Product.validateNumberOfElementAfterDeleteProductFromCart(1);
    })

    it('06 Add one product to the cart, add more in the cart view', () => {
        const Product = new ProductsPage();
        Product.buyProductProcess(ProductData.titleWomen, ProductData.productTitleFirst, ProductData.quantityOne, ProductData.sizeLarge);
        Product.navigateToShoppingCart();
        Product.addMoreProductInShoppingCart("2");
    })

    it.only('07 Add more product to the cart what is in the stock.', () => {
        const Product = new ProductsPage();
        Product.buyProductProcess(ProductData.titleWomen, ProductData.productTitleFirst, ProductData.quantityMoreThanInStock, ProductData.sizeLarge);
        Product.validateNotEnoughProductInStock();
    })
});
