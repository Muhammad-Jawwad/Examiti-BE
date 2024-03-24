const { getAllTeachers, getTeacherById, updateTeacher, deleteTeacher, createTeacher, login, getTeacherByDepartmentId } = require("../controllers/teacher");
const { validateCourseTeacher } = require("../middlewares/courseTeacherValidation");
const authenticateToken = require("../middlewares/isAuth");
const { validateTeacher, validateTeacherLogin } = require("../middlewares/teacherValidation");

const router = require("express").Router();

//#region : AUTH

router.post("/login",
    validateTeacherLogin,
    login
);

//#endregion

//#region : TEACHER CRUD

router.get("/",
    authenticateToken,
    getAllTeachers
);
router.post("/new",
    authenticateToken,
    validateTeacher,
    createTeacher
);
router.get("/:id",
    authenticateToken,
    getTeacherById
);
router.patch("/update/:id",
    authenticateToken,
    updateTeacher
);
router.delete("/delete/:id",
    authenticateToken,
    deleteTeacher
);

//#endregion

//#region : OTHER APIs

router.get("/byDepartmentId",
    authenticateToken,
    getTeacherByDepartmentId
);

//#endregion

module.exports = router;