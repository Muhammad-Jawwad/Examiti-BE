const { getUniversity, createUniversity, getUniversityById, updateUniversity, deleteUniversity } = require("../controllers/university");
const { validateUniversity } = require("../middlewares/universityValidation");

const router = require("express").Router();


router.get("/", getUniversity);
router.post("/new",
    validateUniversity,
    createUniversity,
);
router.get("/:id", getUniversityById);
router.patch("/update/:id",
    updateUniversity
);
router.delete("/delete/:id", deleteUniversity);


module.exports = router;