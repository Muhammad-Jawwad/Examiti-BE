const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const templateSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        examType: String,
        duration: Number,
        totalMarks: Number,
        header: String,
        footer: String,
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
        description: String,
        media: String,
        status: String
    },
    { timestamps: true }
);


module.exports = mongoose.model("Template", templateSchema);
