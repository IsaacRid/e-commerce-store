const products = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createProductSchema, productIdParamSchema } = require('../validation/schemas');

module.exports = (app) => {
    app.route('/api/products/')
        .get(products.get_products)
        .post(protect, admin, validate(createProductSchema), products.create_product);
    app.route('/api/products/:productId')
        .get(validate(productIdParamSchema, 'params'), products.get_product)
        .put(protect, admin, validate(productIdParamSchema, 'params'), products.update_product)
        .delete(protect, admin, validate(productIdParamSchema, 'params'), products.delete_product);
}