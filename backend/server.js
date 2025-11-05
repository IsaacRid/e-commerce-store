const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/images', express.static('public/images'));

require('./routes/cartRoutes')(app);
require('./routes/productRoutes')(app);
require('./routes/orderRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/paymentRoutes')(app);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



