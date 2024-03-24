const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teacherSchema = new Schema(
    {
        name: String,
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        departmentId: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required: true
        },
        designation: String
    },
    { timestamps: true }
);


module.exports = mongoose.model("Teacher", teacherSchema);
