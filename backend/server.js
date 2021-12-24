const express = require('express');
const connectDB = require('./config/db');

const app = express();

const bodyParser = require('body-parser');

// connect the database
connectDB();

//init  middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/room', require('./routes/room'));
app.use('/api/booking', require('./routes/booking'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
