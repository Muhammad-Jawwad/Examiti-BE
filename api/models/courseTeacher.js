const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseTeacherSchema = new Schema(
    {
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
        teacherId: {
            type: Schema.Types.ObjectId,
            ref: 'Teacher',
            required: true
        },
        teachingSemester: Number
    },
    { timestamps: true }
);


module.exports = mongoose.model("CourseTeacher", courseTeacherSchema);
