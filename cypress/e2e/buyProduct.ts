import LoginData from '../fixtures/login.json';
import ProductData from '../fixtures/products.json';
import LoginPage from '../pages/mainPage';
import ProductsPage from '../pages/productsPage';
import ErrorMessage from '../pages/errorMessages';
import feedbackMessages from "../fixtures/feedbackMessages.json";

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

    it.only('04 Add product to the cart, remove from the cart', () => {
        const Product = new ProductsPage();
        const mainpage = new LoginPage();
        Product.buyProductProcess(ProductData.titleWomen, ProductData.productTitleFirst, ProductData.quantityOne, ProductData.sizeLarge);
        Product.deleteProductFromCart();
        ErrorMessage.validateErrorMessage(mainpage.elements.generalWarningLabel(), feedbackMessages.emptyShoppingCartWarningMessage);
    })
});
