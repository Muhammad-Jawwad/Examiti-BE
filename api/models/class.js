const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        academicYear: String,
        organizationId: {
            type: Schema.Types.ObjectId,
            ref: 'Organization'
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model("Class", classSchema);
