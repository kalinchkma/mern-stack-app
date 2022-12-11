
// expternal imports

const mongoose = require('mongoose');


const connectDatabase = async () => {
    try {
        mongoose.connect(process.env.MONGO_CONNECT_STRING);
        console.log("Database connected successfully");
    } catch(err) {
        console.log("database connection failed!");
    }
}


module.exports = connectDatabase;