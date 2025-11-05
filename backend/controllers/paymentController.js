const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;
        // Debug logging
        console.log('Received payment request:', req.body);
        if (!amount || typeof amount !== 'number' || amount <= 0) {
            console.error('Invalid amount:', amount);
            return res.status(400).json({ error: 'Invalid amount. Must be a positive number in pence.' });
        }
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error('Stripe secret key missing in environment variables');
            return res.status(500).json({ error: 'Stripe secret key missing.' });
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'gbp',
        });
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error('Stripe error:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createPaymentIntent
};
