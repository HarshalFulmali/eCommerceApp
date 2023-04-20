const authValidator = require('../validators/auth.validator');
const cartController = require('../controllers/cart.controller');
const cartValidator = require('../validators/cart.validator');

module.exports = (app) => {
    app.post("/ecommerce/api/v1/carts",[authValidator.verifyJWT], cartController.createCart);
    app.put("/ecommerce/api/v1/carts/:id", [authValidator.verifyJWT, cartValidator.checkCartId, cartValidator.checkAuthUserCart,cartValidator.checkForItemsName], cartController.updateCarts);
    app.get("/ecommerce/api/v1/carts/:id",[authValidator.verifyJWT, cartValidator.checkCartId, cartValidator.checkAuthUserCart, cartValidator.checkForItemsName], cartController.getCart);
}