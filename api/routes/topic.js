const { getAllTopics, createTopic, getTopicById, deleteTopic, updateTopic } = require("../controllers/topic");
const authenticateToken = require("../middlewares/isAuth");

const router = require("express").Router();


router.get("/", 
    authenticateToken,
    getAllTopics
);
router.post("/new",
    authenticateToken,
    createTopic
);
router.get("/:id", 
    authenticateToken,
    getTopicById
);
router.patch("/update/:id",
    authenticateToken,
    updateTopic
);
router.delete("/delete/:id", 
    authenticateToken,
    deleteTopic
);



module.exports = router;