const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const universitySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        location: String,
        establishedYear: Number,
        website: String,
        contactEmail: String
    },
    { timestamps: true }
);


module.exports = mongoose.model("University", universitySchema);
