const { getUniversity, createUniversity, getUniversityById, updateUniversity, deleteUniversity } = require("../controllers/university");
const { validateTeacher } = require("../middlewares/teacherValidation");

const router = require("express").Router();


router.get("/", getUniversity);
router.post("/new",
    validateTeacher,
    createUniversity,
);
router.get("/:id", getUniversityById);
router.patch("/update/:id",
    updateUniversity
);
router.delete("/delete/:id", deleteUniversity);


module.exports = router;