const mongoose = require("mongoose");

const mongURL = "mongodb://localhost:27017/first_db";

const mongoconnection = async () => {
    try {
        await mongoose.connect(mongURL);
        console.log("Mongo db connected");
    } catch (error) {
        console.error("Mongoose connection error:", error);
    }
};

module.exports = mongoconnection;
