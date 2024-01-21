const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateSuperAdminToken,validateAdminToken } = require("../middleware/token");

router.get("/",validateAdminToken, userController.getAllUsers);

router.get("/:id", validateAdminToken, userController.getUserById);

router.post("/register", userController.createUser);

router.post("/login", userController.loginUser);

router.delete("/:id", userController.deleteUserById);


module.exports = router;
