const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const {loginController, registerController, logoutController, profileController} = require("../controllers/userController");


const router = express.Router();
//login user
router.post('/login', loginController);
//register user
router.post('/register', registerController);
//clear cookie on logout
router.post('/logout', logoutController);



module.exports = router;