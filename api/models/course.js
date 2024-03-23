const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        courseCode: String,
        description: String,
        departmentId: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required: true
        },
        totalCredits: Number
    },
    { timestamps: true }
);


module.exports = mongoose.model("Course", courseSchema);
