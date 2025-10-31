const get_products = (req, res) => {
    res.send('List of products');
}

const get_product = (req, res) => {
    res.send('Product details');
}

const create_product = (req, res) => {
    res.send('Product created');
}

const update_product = (req, res) => {
    res.send('Product updated');
}

const delete_product = (req, res) => {
    res.send('Product deleted');
}

module.exports = {
    get_products,
    get_product,
    create_product,
    update_product,
    delete_product
}