const categoryValidator = require('../validators/category.validator');
const categoryController = require('../controllers/category.controller');
const authValidator = require('../validators/auth.validator');

module.exports = (app)=>{
    // api for creating category
    app.post("/ecommerce/api/v1/categories",[authValidator.verifyJWT, authValidator.isAdmin,categoryValidator.createCategoryValidator], categoryController.create);
    
    // api for fetching all categories
    app.get("/ecommerce/api/v1/categories", categoryController.getAllCategories);

    // api for fetching category by id
    app.get("/ecommerce/api/v1/categories/:id", categoryController.getCategoryById);

    // api for updating category by id
    app.put("/ecommerce/api/v1/categories/:id",[authValidator.verifyJWT, authValidator.isAdmin, categoryValidator.categoryIdValidator, categoryValidator.updateCategoryValidator],
    categoryController.updateCategory);

    // api for deleting category by id
    app.delete("/ecommerce/api/v1/categories/:id",[authValidator.verifyJWT, authValidator.isAdmin, categoryValidator.categoryIdValidator], categoryController.deleteCategory);

    
}