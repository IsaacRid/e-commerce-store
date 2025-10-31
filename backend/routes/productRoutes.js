const products = require('../controllers/productController');

module.exports = (app) => {
    app.route('/api/products/')
        .get(products.get_products)
        .post(products.create_product);
    app.route('/api/products/:productId')
        .get(products.get_product)
        .put(products.update_product)
        .delete(products.delete_product);
}