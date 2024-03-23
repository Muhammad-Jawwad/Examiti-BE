const { getAllAdmins, createAdmin, getAdminById, deleteAdmin, updateAdmin, login, getAdminByDepartmentId } = require("../controllers/admin");

const router = require("express").Router();

//#region : AUTH

router.post("/login",
    login
);

//#endregion

//#region : TEACHER CRUD

router.get("/", getAllAdmins);
router.post("/new",
    createAdmin
);
router.get("/:id", getAdminById);
router.patch("/update/:id",
    updateAdmin
);
router.delete("/delete/:id", deleteAdmin);

//#endregion

//#region : OTHER APIs

router.get("/:departmentId", getAdminByDepartmentId);

//#endregion

module.exports = router;