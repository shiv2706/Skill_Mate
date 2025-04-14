const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    profileId:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: [true, 'Please enter your name'],
    },
    title:{
        type: String,
        required: [true, 'Please enter your title'],
    },
    skills:{
        type: [String],
        required: [true, 'Please enter your skills'],
    },
    email:{
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    organization:{
        type: String,
        required: [true, 'Please enter your organization'],
    },
    location:{
        type: String,
        required: [true, 'Please enter your location'],
    },
    description:{
        type: String,
        required: [true, 'Please enter your description'],
    },
    imageUrl:{
        type: String,
    }


},{timestamps:true});


const profileModel = mongoose.model('profiles', profileSchema);
module.exports = profileModel;