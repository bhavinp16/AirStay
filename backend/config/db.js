const mongoose = require('mongoose');

// config a module we included by yarn which gives access to json inside default.json
const config = require('config');
const db = config.get('mongoURI');

// As mongoose returns promises
const connectDB = () => {
    mongoose
        .connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('MongoDB Connected...'))
        .catch((err) => {
            console.error(err.message);
            process.exit(1);
        });
};

module.exports = connectDB;
