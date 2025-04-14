const profileModel = require('../models/profileModel');



const CreateProfile = async (req, res) => {
    try{
        const { profileId, name, title, skills, email, organization, location, description, imageUrl } = req.body;

        // Create a new profile document
        const newProfile = new profileModel({
            profileId,
            name,
            title,
            skills,
            email,
            organization,
            location,
            description,
            imageUrl
        });
        await newProfile.save();

        res.status(201).json({
            success: true,
            data:newProfile
        });

    }catch(error){
        res.status(400).send({
            success: false,
            error
        })
    }
}

const GetProfile = async (req, res) => {
    try{
        const {ProfileId} = req.body;
        const profile = await profileModel.findOne({profileId:ProfileId})
        console.log(profile)

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }
        console.log("profile is:" + profile);
        return res.status(201).json({
            success: true,
            data:profile
        });



    }catch(error){
        res.status(400).send({
            success: false,
        })
    }
}


const GetAllProfiles = async (req, res) => {
    try{
        console.log("this is the user:" + JSON.stringify(req.user))
        const allProfiles = await profileModel.find({})
        return res.status(200).json(allProfiles)
    }catch(error){
        res.status(400).send("error fetching profiles")
    }
}

const DeleteProfile = async (req, res) => {
    try{
        await profileModel.findOneAndDelete({profileId: req.body.profileID})
        res.status(200).json("profile deleted")
    }catch(error){
        res.status(400).send("error deleting profiles")
    }
}

const UpdateProfile = async (req, res) => {
    try{
        const updatedProfile = await profileModel.findOneAndUpdate({profileId:req.body.profileId}, req.body, {new:true})
        res.status(201).json({
            success: true,
            data:updatedProfile
        });
    }catch(error){
        res.status(400).send("error updating profiles")
    }
}

const GetProfileByNames = async (req, res) => {
    try{
        const { names } = req.body; // Expecting an array of names

        if (!Array.isArray(names) || names.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid input. 'names' should be a non-empty array."
            });
        }

        // Fetch profiles where the 'name' field matches any of the names in the array
        const profiles = await profileModel.find({ name: { $in: names } });

        if (profiles.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No profiles found for the given names."
            });
        }
        console.log(profiles);
        return res.status(200).json({
            success: true,
            data: profiles
        });
    }catch(error){

    }
}


module.exports = {CreateProfile, GetProfile , GetAllProfiles, DeleteProfile, UpdateProfile, GetProfileByNames};