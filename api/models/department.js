const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const departmentSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        universityId: {
            type: Schema.Types.ObjectId,
            ref: 'University',
            required: true
        },
        headOfDepartment: String,
        contactEmail: String
    },
    { timestamps: true }
);


module.exports = mongoose.model("Department", departmentSchema);
