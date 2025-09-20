const mongoose = require('mongoose');

const connectDB = async() => {
    console.log(process.env.DB_CONNECTION_STRING);
    
    const conn = mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
        console.log("Database Connected");  
    }).catch(err => {
        console.log("Database not connected. Error is => " + err);
    });
}

module.exports = connectDB;