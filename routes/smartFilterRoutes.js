const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const {FilterProfiles} = require("../controllers/smartFilterController");


const router = express.Router();
//get filtered profiles
router.post('/filter-profiles', authMiddleware, FilterProfiles);




module.exports = router;