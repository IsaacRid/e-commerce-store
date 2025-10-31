const get_cart = (req, res) => {
    res.send("Get cart");
}

const add_to_cart = (req, res) => {
    res.send("Add to cart");
}

const remove_from_cart = (req, res) => {
    res.send("Remove from cart");
}

const update_quantity = (req, res) => {
    res.send("Update quantity");
}

const clear_cart = (req, res) => {
    res.send("Clear cart");
}

module.exports = {
    get_cart,
    add_to_cart,
    remove_from_cart,
    update_quantity,
    clear_cart
}   