const applicationsModel = require('../models/applicationsModel');
const opportunityModel = require("../models/opportunityModel");


const CreateApplication = async (req, res) => {
    try{
        const {authorId, applicantName, applicantImage, applicantProfileId, appliedFor} = req.body;
        // Create a new application
        const newApplication = new applicationsModel({
            authorId,
            applicantName,
            applicantImage,
            applicantProfileId,
            appliedFor
        });
        await newApplication.save();

        return res.status(201).json({
            success: true,
            data:newApplication
        });
    }catch(err){
        console.error("Mongoose Error:", err);
        res.status(400).json({ message: err.message, errors: err.errors });
    }
}

const GetApplicationRequests = async (req, res) => {
    try{
        const {authorId} = req.body;
        const application = await applicationsModel.find({authorId:authorId})
        // console.log(JSON.stringify(opportunity.data))

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "applications not found"
            });
        }

        return res.status(201).json({
            success: true,
            data:application
        });

    }catch(err){
        console.log(err)
    }
}

const GetMyApplications = async (req, res) => {
    try{
        const {applicantId} = req.body;
        const application = await applicationsModel.find({applicantProfileId:applicantId})
        // console.log(JSON.stringify(opportunity.data))

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "applications not found"
            });
        }

        return res.status(201).json({
            success: true,
            data:application
        });

    }catch(err){
        console.log(err)
    }
}

const DeleteApplication = async (req, res) => {
    try{
        const {applicationId, statusChange} = req.body;
        await applicationsModel.findOneAndUpdate({_id:applicationId },{applicationStatus:statusChange})
        res.status(200).json("application deleted")
    }catch(err){

    }
}

const WithdrawApplication = async (req, res) => {
    try{
        const {applicantId, jobTitle} = req.body;
        await applicationsModel.findOneAndDelete({applicantProfileId:applicantId, appliedFor: jobTitle })
        res.status(200).json("application deleted")
    }catch(err){

    }
}



module.exports = {CreateApplication, GetApplicationRequests,DeleteApplication, GetMyApplications, WithdrawApplication};