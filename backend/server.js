const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

require('./routes/cartRoutes')(app);
require('./routes/productRoutes')(app);
require('./routes/orderRoutes')(app);
require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



