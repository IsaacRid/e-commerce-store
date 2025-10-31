const auth = require('../controllers/authController');

module.exports = (app) => {
    app.route('/api/auth/login')
        .post(auth.login_user);
    app.route('/api/auth/register')
        .post(auth.create_user);
    app.route('/api/auth/logout')
        .post(auth.logout_user);
    app.route('/api/auth/me')
        .get(auth.get_user);
}