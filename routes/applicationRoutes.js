const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const {CreateApplication, GetApplicationRequests, DeleteApplication, GetMyApplications, WithdrawApplication} = require("../controllers/applicationController");


const router = express.Router();
//add-application
router.post('/create-application', authMiddleware,CreateApplication);
//get-application-requests
router.post('/get-application-requests', authMiddleware,GetApplicationRequests);
//reject-application
router.post('/delete-application', authMiddleware, DeleteApplication);
//get-my-applications
router.post('/get-my-applications', authMiddleware, GetMyApplications);
//withdraw-application
router.post('/withdraw-application', authMiddleware, WithdrawApplication);







module.exports = router;