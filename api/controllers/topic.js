const { validationResult } = require("express-validator");
const Course = require("../models/course");
const Topic = require("../models/topic");

module.exports = {
    createTopic: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    code: 400,
                    message: "Validation error",
                    errors: errors.array()
                });
            }

            const courseId = req.body.courseId;
            const isExistCourse = await Course.findById(courseId);
            if (!isExistCourse) {
                return res.status(404).json({
                    code: 404,
                    message: "Course not found"
                });
            }

            //creating a new org
            const newTopic = new Topic({
                name: req.body.name,
                courseId: req.body.courseId,
                description: req.body.description,
            });
            const TopicDetails = await newTopic.save();

            // Returning success message
            res.status(201).json({
                code: 201,
                message: "New Topic created successfully",
                data: TopicDetails,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    getAllTopics: async (req, res) => {
        try {
            const topicList = await Topic.find().sort({ _id: -1 });
            if (topicList.length === 0) {
                return res.status(404).json({
                    code: 404,
                    message: "No Topic found"
                });
            }
            res.json({
                code: 200,
                message: "Topics retrieved successfully",
                data: topicList
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    getTopicById: async (req, res) => {
        try {
            const id = req.params.id; //To seprate the id from the parameter
            if (!id) {
                return res.status(400).json({
                    code: 400,
                    message: "id is required",
                });
            }

            const foundTopic = await Topic.findById(id);
            if (!foundTopic) {
                return res.status(404).json({
                    code: 404,
                    message: "Topic not found",
                });
            }
            res.json({
                code: 200,
                message: "Topic retrieved successfully",
                data: foundTopic
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    updateTopic: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    code: 400,
                    message: "Validation error",
                    errors: errors.array()
                });
            }

            const id = req.params.id; //To seprate the id from the parameter
            if (!id) {
                return res.status(400).json({
                    code: 400,
                    message: "id is required",
                });
            }

            const courseId = req.body.courseId;
            if (courseId) {
                const isExistCourse = await Course.findById(courseId);
                if (!isExistCourse) {
                    return res.status(404).json({
                        code: 404,
                        message: "Course not found"
                    });
                }
            }

            const updateFields = {};
            const fieldsToUpdate = ['name', 'description', 'courseId'];
            fieldsToUpdate.forEach(field => {
                if (req.body[field]) {
                    updateFields[field] = req.body[field];
                }
            });

            const updatedTopic = await Topic.findByIdAndUpdate(id, updateFields, { new: true });

            if (!updatedTopic) {
                return res.status(404).json({
                    code: 404,
                    message: "Topic not found",
                });
            }

            // Return the updated Topic
            res.status(200).json({
                code: 200,
                message: "Topic updated successfully",
                data: updatedTopic,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

    deleteTopic: async (req, res) => {
        try {
            const id = req.params.id;

            const deletedTopic = await Topic.findByIdAndDelete(id);
            if (!deletedTopic) {
                return res.status(404).json({
                    code: 404,
                    message: "Topic not found",
                });
            }

            res.status(200).json({
                code: 200,
                message: "Topic deleted successfully"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                code: 500,
                error: error.name,
                message: error.message,
            });
        }
    },

}