const mongoose = require("mongoose");

const mongURL = "mongodb://127.0.0.1:27017/first_db";
const mongoconnection = async () => {
    try {
        await mongoose.connect(mongURL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Mongoose connection error:", error);
    }
};

module.exports = mongoconnection;
