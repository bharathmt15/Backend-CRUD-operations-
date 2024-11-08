const mongoose = require("mongoose");

const mongoconnection = async () => {
    try {
        await mongoose.connect(mongURL);
        console.log("Mongo db connected");
    } catch (error) {
        console.error("Mongoose connection error:", error);
    }
};

module.exports = mongoconnection;
