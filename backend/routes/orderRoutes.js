const order = require('../controllers/orderController');

module.exports = (app) => {
    app.route('/api/orders/')
        .post(order.place_order)
        .get(order.get_all_orders);
    app.route('/api/orders/:orderId')
        .get(order.get_order_details);
    app.route('/api/orders/admin')
        .get(order.admin_get_all_orders);
}