const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
    {
        question: {
            type: String,
            required: true
        },
        marks: Number,
        tags: [String],
        category: String,
        type: String,
        scope: String,
        subjectTeacherId: {
            type: Schema.Types.ObjectId,
            ref: 'SubjectTeacher',
            required: true
        },
        topicId: {
            type: Schema.Types.ObjectId,
            ref: 'Topic',
            required: true
        },
        difficultyLevel: Number,
        isApproved: Boolean
    },
    { timestamps: true }
);


module.exports = mongoose.model("Question", questionSchema);
