const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: String,
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model("Topic", topicSchema);
