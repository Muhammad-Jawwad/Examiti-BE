const { getAllTopics, createTopic, getTopicById, deleteTopic, updateTopic } = require("../controllers/topic");
const authenticateToken = require("../middlewares/isAuth");
const { validateTopic, validateUpdateTopic } = require("../middlewares/topicValidation");

const router = require("express").Router();


router.get("/",
    authenticateToken,
    getAllTopics
);
router.post("/new",
    authenticateToken,
    validateTopic,
    createTopic
);
router.get("/:id",
    authenticateToken,
    getTopicById
);
router.patch("/update/:id",
    authenticateToken,
    validateUpdateTopic,
    updateTopic
);
router.delete("/delete/:id",
    authenticateToken,
    deleteTopic
);



module.exports = router;