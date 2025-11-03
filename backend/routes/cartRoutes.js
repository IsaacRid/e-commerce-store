const cart = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { addToCartSchema, updateCartSchema, cartItemParamSchema } = require('../validation/schemas');

module.exports = (app) => {
    app.route('/api/cart')
        .get(protect, cart.get_cart)
        .post(protect, validate(addToCartSchema), cart.add_to_cart)
        .delete(protect, cart.clear_cart);

    app.route('/api/cart/items/:cartItemId')
        .put(protect, validate(cartItemParamSchema, 'params'), validate(updateCartSchema), cart.update_quantity)
        .delete(protect, validate(cartItemParamSchema, 'params'), cart.remove_from_cart);
};
