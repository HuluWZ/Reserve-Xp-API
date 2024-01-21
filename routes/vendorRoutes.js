const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const { validateSuperAdminToken } = require("../middleware/token");
const { uploadIDAndLicenseImages,uploadMultipleImages,uploadAnyImages } = require("../middleware/fileupload");

router.get("/",validateSuperAdminToken, vendorController.getAllVendors);

router.get("/:id", validateSuperAdminToken, vendorController.getVendorById);

router.post("/register", uploadIDAndLicenseImages, vendorController.createVendor);

router.post("/login", vendorController.loginVendor);

router.put("/reject/:id", validateSuperAdminToken, vendorController.rejectVendorById);

router.put("/approve/:id", validateSuperAdminToken, vendorController.approveVendorById);

router.delete("/:id", validateSuperAdminToken, vendorController.deleteVendorById);


module.exports = router;
