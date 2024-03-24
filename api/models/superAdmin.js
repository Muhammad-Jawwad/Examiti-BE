const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const superAdminSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },  
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        universityId: {
            type: Schema.Types.ObjectId,
            ref: 'University',
            required: true
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model("SuperAdmin", superAdminSchema);
