import LoginData from '../fixtures/login.json';
import ProductData from '../fixtures/products.json';
import LoginPage from '../pages/mainPage';
import ProductsPage from '../pages/productsPage';

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
        Product.buyProductProcess(ProductData.titleWomen, ProductData.quantityOne, ProductData.sizeLarge);
    });
});
