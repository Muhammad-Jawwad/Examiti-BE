const { getAllCourses, getCourseById, updateCourse, deleteCourse, createCourse, coursesByDepartmentId } = require("../controllers/course");

const router = require("express").Router();

//#region : COURSES CRUD

router.get("/", getAllCourses);
router.post("/new",
    createCourse
);
router.get("/:id", getCourseById);
router.patch("/update/:id",
    updateCourse
);
router.delete("/delete/:id", deleteCourse);

//#endregion

//#region : OTHER APIs

router.get("/:departmentId", coursesByDepartmentId);

//#endregion

module.exports = router;