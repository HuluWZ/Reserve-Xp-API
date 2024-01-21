const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const { validateSuperAdminToken } = require("../middleware/token");
const { uploadIDAndLicenseImages,uploadMultipleImages,uploadAnyImages } = require("../middleware/fileupload");

router.get("/category/", locationController.getAllLocationCategory);
router.get("/", locationController.getAllLocation);

router.get("/category/:id", locationController.getLocationCategoryId);
router.get("/:id", locationController.getLocationId);

router.post("/category/", locationController.createLocationCategory);
router.post("/", locationController.createLocation);


router.put("/category/:id", locationController.updateLocationCategoryById);
router.put("/:id", locationController.updateLocationById);


router.delete("/category/:id", locationController.deleteLocationCategoryById);
router.delete("/:id", locationController.deleteLocationById);


module.exports = router;
