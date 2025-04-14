const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const { CreateProfile , GetProfile, GetAllProfiles, DeleteProfile, UpdateProfile, GetProfileByNames} = require("../controllers/profileController");


const router = express.Router();
//create profile
router.post('/create-profile', authMiddleware, CreateProfile);
//get profile
router.post('/get-profile', authMiddleware, GetProfile);
//get all profiles
router.get('/get-all-profile', authMiddleware, GetAllProfiles);
//delete profile
router.post('/delete-profile', authMiddleware, DeleteProfile);
//update profile
router.post('/update-profile', authMiddleware, UpdateProfile);
//get profiles by name
router.post('/get-profiles-name', authMiddleware, GetProfileByNames);



module.exports = router;