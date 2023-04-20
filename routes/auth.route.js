const authController = require('../controllers/auth.controller');
const authValidator = require('../validators/auth.validator');

module.exports= (app)=>{
    app.post("/ecommerce/api/v1/auth/singup",[authValidator.signUpValidators], authController.singUp);
    app.post("/ecommerce/api/v1/auth/singin", [authValidator.signInValidator], authController.signIn);
}