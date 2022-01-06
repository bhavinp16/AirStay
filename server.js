const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

require('dotenv').config();

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


// Server Static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => req.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
