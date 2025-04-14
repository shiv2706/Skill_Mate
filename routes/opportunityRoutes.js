const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const {CreateOpportunity, GetOpportunity, GetAllOpportunity, DeleteOpportunity, GetOpportunityDetails} = require("../controllers/opportunityController");

console.log("🚀 Opportunity routes loaded");

const router = express.Router();
//add opportunity
router.post('/create-opportunity', authMiddleware,CreateOpportunity);
//get my opportunity postings
router.post('/get-opportunity', authMiddleware,GetOpportunity);
//get opportunity details
router.post('/get-opportunity-details', authMiddleware,GetOpportunityDetails);
//get all opportunities
router.get('/get-all-opportunities', authMiddleware,GetAllOpportunity);
//delete opportunity
router.post('/delete-opportunity',authMiddleware,DeleteOpportunity);






module.exports = router;