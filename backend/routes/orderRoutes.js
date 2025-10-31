const order = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

module.exports = (app) => {
    app.route('/api/orders/')
        .post(protect, order.place_order)
        .get(protect, order.get_all_orders);
    app.route('/api/orders/:orderId')
        .get(protect, order.get_order_details);
    app.route('/api/orders/admin')
        .get(admin, protect, order.admin_get_all_orders);
}