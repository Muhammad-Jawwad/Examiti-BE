const { getAllCourses, getCourseById, updateCourse, deleteCourse, createCourse, coursesByDepartmentId } = require("../controllers/course");
const { validateCreateCourse } = require("../middlewares/courseValidation");
const authenticateToken = require("../middlewares/isAuth");

const router = require("express").Router();

//#region : COURSES CRUD

router.get("/", 
    authenticateToken,
    getAllCourses
);
router.post("/new",
    authenticateToken,
    validateCreateCourse,
    createCourse
);
router.get("/:id", getCourseById);
router.patch("/update/:id",
    authenticateToken,
    updateCourse
);
router.delete("/delete/:id", 
    authenticateToken,
    deleteCourse
);

//#endregion

//#region : OTHER APIs

router.get("/byDepartmentId",
    authenticateToken,
    coursesByDepartmentId
);

//#endregion

module.exports = router;