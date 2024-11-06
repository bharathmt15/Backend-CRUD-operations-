const mongoose = require("mongoose");
const {Schema} = mongoose;

const Userschema = new Schema({
    name: {
        type: String,
        required: true,
    },
    ph_no: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// exporting to use in different files
module.exports = mongoose.model("user", Userschema);
