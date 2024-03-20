const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chapterSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: String,
        subjectId: {
            type: Schema.Types.ObjectId,
            ref: 'Subject'
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model("Chapter", chapterSchema);
