const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: String,
        classId: {
            type: Schema.Types.ObjectId,
            ref: 'Class'
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model("Subject", subjectSchema);
