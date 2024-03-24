const { getAllAdmins, createAdmin, getAdminById, deleteAdmin, updateAdmin, login, getAdminByDepartmentId } = require("../controllers/admin");
const { validateLogin, validateAdmin, validateUpdateAdmin } = require("../middlewares/adminValidation");
const authenticateToken = require("../middlewares/isAuth");

const router = require("express").Router();

//#region : AUTH

router.post("/login",
    validateLogin,
    login
);

//#endregion

//#region : ADMIN CRUD

router.get("/", getAllAdmins);
router.post("/new",
    validateAdmin,
    createAdmin
);
router.get("/:id", getAdminById);

router.patch("/update/:id",
    validateUpdateAdmin,
    updateAdmin
);
router.delete("/delete/:id", deleteAdmin);

//#endregion

//#region : OTHER APIs

router.get("/:departmentId",
    authenticateToken,
    getAdminByDepartmentId
);

//#endregion

module.exports = router;