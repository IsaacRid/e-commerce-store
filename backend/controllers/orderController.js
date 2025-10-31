const place_order = (req, res) => {
    res.send("Place order");
}

const get_order_details = (req, res) => {
    res.send("Get order");
}

const get_all_orders = (req, res) => {
    res.send("Get all orders");
}

const admin_get_all_orders = (req, res) => {
    res.send("Admin get all orders");
}

module.exports = {
    place_order,
    get_order_details,
    get_all_orders,
    admin_get_all_orders
}