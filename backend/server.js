const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
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



