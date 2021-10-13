const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const foodSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true,
        maxlength: 200
    },

    dishDesc: {
        type: String,
        maxlength: 30,
    },

    dishPrice: {
        type: Number,
        min: 0
    },

    dishStock: {
        type: Number,
        min: 0
    },
    sold: {
        type: Number,
        min: 0,
        default: 0
    },

    photo: {
        data: Buffer,
        contentType: String
    },

    rest: {
        type: ObjectId,
        ref: "Merchant"
    }
},

{
    timestamps: true

});

module.exports = mongoose.model("Food",foodSchema);
