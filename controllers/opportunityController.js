const opportunityModel = require('../models/opportunityModel');


const CreateOpportunity = async (req, res) => {
    try{
        const {authorId, authorName, title, role, skills, authorEmail, organization, location, description, imageUrl} = req.body;
        // Create a new profile document
        const newOpportunity = new opportunityModel({
            authorId,
            authorName,
            title,
            role,
            skills,
            authorEmail,
            organization,
            location,
            description,
            imageUrl
        });
        await newOpportunity.save();

        return res.status(201).json({
            success: true,
            data:newOpportunity
        });
    }catch(err){
        console.error("Mongoose Error:", err);
        res.status(400).json({ message: err.message, errors: err.errors });
    }
}

const GetOpportunity = async (req, res) => {
    try{
        const {authorId} = req.body;
        const opportunity = await opportunityModel.find({authorId:authorId})
        console.log(JSON.stringify(opportunity.data))

        if (!opportunity) {
            return res.status(404).json({
                success: false,
                message: "opportunity not found"
            });
        }

        return res.status(201).json({
            success: true,
            data:opportunity
        });

    }catch(err){

    }
}

const GetOpportunityDetails = async (req, res) => {
    try{
        const {_id} = req.body;
        const opportunity = await opportunityModel.findOne({_id:_id})
        // console.log(JSON.stringify(opportunity.data))

        if (!opportunity) {
            return res.status(404).json({
                success: false,
                message: "opportunity not found"
            });
        }

        return res.status(201).json({
            success: true,
            data:opportunity
        });

    }catch(err){

    }
}

const GetAllOpportunity = async (req, res) => {
    try{
        const allOpportunities = await opportunityModel.find({})
        console.log(allOpportunities)
        return res.status(200).json(allOpportunities)
    }catch(error){
        res.status(400).send("error fetching opportunities")
    }
}

const DeleteOpportunity = async (req, res) => {
    try{
        await opportunityModel.findOneAndDelete({_id: req.body.opportunityId})
        res.status(200).json("opportunity deleted")
    }catch(err){

    }
}

module.exports = {CreateOpportunity, GetOpportunity , GetAllOpportunity, DeleteOpportunity, GetOpportunityDetails};