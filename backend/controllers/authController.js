const create_user = (req, res) => {
    res.send('User created');
}

const login_user = (req, res) => {
    res.send('User logged in');
}

const logout_user = (req, res) => {
    res.send('User logged out');
}

const get_user = (req, res) => {
    res.send('User details');
}

module.exports = {
    create_user,
    login_user,
    logout_user,
    get_user
}