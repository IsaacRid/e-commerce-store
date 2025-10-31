const auth = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { loginSchema, registerSchema } = require('../validation/schemas');

module.exports = (app) => {
    app.route('/api/auth/login')
        .post(validate(loginSchema), auth.login_user);
    app.route('/api/auth/register')
        .post(validate(registerSchema), auth.create_user);
    app.route('/api/auth/me')
        .get(protect, auth.get_user);
}