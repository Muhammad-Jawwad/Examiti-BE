const { login, getAllSuperAdmins, createSuperAdmin, getSuperAdminById, updateSuperAdmin, deleteSuperAdmin, getSuperAdminByUniversityId } = require("../controllers/superAdmin");
const { validateLogin } = require("../middlewares/adminValidation");
const { validateSuperAdmin, validateUpdateSuperAdmin } = require("../middlewares/superAdminValidation");
const authenticateToken = require("../middlewares/isAuth");

const router = require("express").Router();

//#region : AUTH

router.post("/login",
    validateLogin,
    login
);

//#endregion

//#region : ADMIN CRUD

router.get("/", getAllSuperAdmins);
router.post("/new",
    validateSuperAdmin,
    createSuperAdmin
);
router.get("/:id", getSuperAdminById);

router.patch("/update/:id",
    validateUpdateSuperAdmin,
    updateSuperAdmin
);
router.delete("/delete/:id", deleteSuperAdmin);

//#endregion

//#region : OTHER APIs

router.get("/:universityId",
    authenticateToken,
    getSuperAdminByUniversityId
);

//#endregion

module.exports = router;