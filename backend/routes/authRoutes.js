const auth = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

module.exports = (app) => {
    app.route('/api/auth/login')
        .post(auth.login_user);
    app.route('/api/auth/register')
        .post(auth.create_user);
    app.route('/api/auth/me')
        .get(protect, auth.get_user);
}