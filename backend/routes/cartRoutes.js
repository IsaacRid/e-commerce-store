const cart = require('../controllers/cartController');

module.exports = (app) => {
    app.route('/api/cart/')
        .get(cart.get_cart)
    app.route('/api/cart/add')
        .post(cart.add_to_cart)
    app.route('/api/cart/update/:itemId')
        .put(cart.update_quantity)
        .delete(cart.remove_from_cart)
    app.route('/api/cart/clear')
        .delete(cart.clear_cart)
}