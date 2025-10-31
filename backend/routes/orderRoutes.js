const order = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createOrderSchema } = require('../validation/schemas');

module.exports = (app) => {
    app.route('/api/orders/')
        .post(protect, validate(createOrderSchema), order.place_order)
        .get(protect, order.get_all_orders);
    app.route('/api/orders/:orderId')
        .get(protect, order.get_order_details);
    app.route('/api/orders/admin')
        .get(protect, admin, order.admin_get_all_orders);
}