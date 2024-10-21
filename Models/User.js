const mongoose = require("mongoose");
const {Schema} = mongoose;

const Userschema = new Schema({
    name: {
        type: String,
        require: true,
    },
    ph_no: {
        type: Number,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
});

// exporting to use in different files

module.exports = mongoose.model("user", Userschema);
