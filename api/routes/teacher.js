const { getAllTeachers, getTeacherById, updateTeacher, deleteTeacher, createTeacher, login, getTeacherByDepartmentId } = require("../controllers/teacher");

const router = require("express").Router();

//#region : AUTH

router.post("/login",
    login
);

//#endregion

//#region : ADMIN CRUD

router.get("/", getAllTeachers);
router.post("/new",
    createTeacher
);
router.get("/:id", getTeacherById);
router.patch("/update/:id",
    updateTeacher
);
router.delete("/delete/:id", deleteTeacher);

//#endregion

//#region : OTHER APIs

router.get("/:departmentId", getTeacherByDepartmentId);

//#endregion

module.exports = router;