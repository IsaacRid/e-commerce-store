const products = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createProductSchema } = require('../validation/schemas');

module.exports = (app) => {
    app.route('/api/products/')
        .get(products.get_products)
        .post(protect, admin, validate(createProductSchema), products.create_product);
    app.route('/api/products/:productId')
        .get(products.get_product)
        .put(protect, admin, products.update_product)
        .delete(protect, admin, products.delete_product);
}