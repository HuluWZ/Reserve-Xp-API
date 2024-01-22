const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const { validateSuperAdminToken } = require("../middleware/token");
const { uploadIDAndLicenseImages,uploadMultipleImages,uploadAnyImages } = require("../middleware/fileupload");

router.get("/", vendorController.getAllVendors);

router.get("/:id", vendorController.getVendorById);

router.post("/register", uploadIDAndLicenseImages, vendorController.createVendor);

router.post("/login", vendorController.loginVendor);

router.put("/reject/:id", vendorController.rejectVendorById);

router.put("/approve/:id", vendorController.approveVendorById);

router.delete("/:id", vendorController.deleteVendorById);


module.exports = router;
