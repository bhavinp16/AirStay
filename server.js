const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

require('dotenv').config();

const app = express();

const bodyParser = require('body-parser');

// connect the database
connectDB();

app.use(express.static(path.join(__dirname, 'client', 'build')));

//init  middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/room', require('./routes/room'));
app.use('/api/booking', require('./routes/booking'));


app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
