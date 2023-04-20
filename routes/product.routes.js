const productController = require('../controllers/product.controller');
const productValidator = require('../validators/product.validator');
const authValidator = require('../validators/auth.validator');

module.exports = (app)=>{
    // api for creating product
    app.post("/ecommerce/api/v1/products",[authValidator.verifyJWT, authValidator.isAdmin,productValidator.createProductValidator], productController.createProduct);
    
    // api for fetching all products
    app.get("/ecommerce/api/v1/products", productController.getAllProducts);

    // api for fetching product by id
    app.get("/ecommerce/api/v1/products/:id", productController.getProductById);

    // api for updating category by id
    app.put("/ecommerce/api/v1/products/:id",[authValidator.verifyJWT, authValidator.isAdmin, productValidator.updateProductValidator],productController.updateProduct);

    // api for deleting category by id
    app.delete("/ecommerce/api/v1/products/:id",[authValidator.verifyJWT, authValidator.isAdmin], productController.deleteProduct);

}