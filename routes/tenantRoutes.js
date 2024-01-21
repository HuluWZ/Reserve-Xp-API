const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');
const { validateSuperAdminToken } = require("../middleware/token");

router.get("/",validateSuperAdminToken, tenantController.getAllTenants);

router.get("/:id", validateSuperAdminToken, tenantController.getTenantById);

router.post("/register", tenantController.createTenant);

router.post("/login", tenantController.loginTenant);

router.put("/deactivate/:id", validateSuperAdminToken, tenantController.deactivateTenantById);

router.put("/activate/:id", validateSuperAdminToken, tenantController.activateTenantById);

router.delete("/:id", validateSuperAdminToken, tenantController.deleteTenantById);


module.exports = router;
