const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const organizationSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: String,
        location: String
    },
    { timestamps: true }
);


module.exports = mongoose.model("Organization", organizationSchema);
