const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { validateSuperAdminToken,validateAdminToken } = require("../middleware/token");

router.get("/",validateSuperAdminToken, adminController.getAllAdmins);

router.get("/:id", validateSuperAdminToken, adminController.getAdminById);

router.post("/register", adminController.createAdmin);

router.post("/login", adminController.loginAdmin);

router.delete("/:id", validateSuperAdminToken, adminController.deleteAdminById);


module.exports = router;
