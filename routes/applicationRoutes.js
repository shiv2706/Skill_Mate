const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const {CreateApplication, GetApplicationRequests, DeleteApplication} = require("../controllers/applicationController");


const router = express.Router();
//add-application
router.post('/create-application', authMiddleware,CreateApplication);
//get-application-requests
router.post('/get-application-requests', authMiddleware,GetApplicationRequests);
//reject-application
router.post('/delete-application', authMiddleware, DeleteApplication);







module.exports = router;