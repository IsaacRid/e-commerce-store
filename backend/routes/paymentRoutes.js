const payment = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

module.exports = (app) => {
    app.route('/api/payment/intent')
        .post(protect, payment.createPaymentIntent);
}
