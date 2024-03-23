const { getAllTopics, createTopic, getTopicById, deleteTopic, updateTopic } = require("../controllers/topic");

const router = require("express").Router();


router.get("/", getAllTopics);
router.post("/new",
    createTopic
);
router.get("/:id", getTopicById);
router.patch("/update/:id",
    updateTopic
);
router.delete("/delete/:id", deleteTopic);



module.exports = router;