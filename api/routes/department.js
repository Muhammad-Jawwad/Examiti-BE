const { createDepartment, getDepartmentById, getAllDepartments, updateDepartment, deleteDepartment } = require("../controllers/department");

const router = require("express").Router();


router.get("/", getAllDepartments);
router.post("/new",
    createDepartment
);
router.get("/:id", getDepartmentById);
router.patch("/update/:id",
    updateDepartment
);
router.delete("/delete/:id", deleteDepartment);



module.exports = router;