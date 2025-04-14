const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
    authorId:{
        type: String,
        required: true,
    },
    authorName:{
        type: String,
        required: [true, 'Please enter your name'],
    },
    title:{
        type: String,
        required: [true, 'Please enter your title'],
    },
    role:{
        type: String,
        required: [true, 'Please enter role'],
    },
    skills:{
        type: [String],
        required: [true, 'Please enter your skills'],
    },
    authorEmail:{
        type: String,
        required: [true, 'Please enter your email'],
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
        required: [true, 'Please enter your image'],
    }


},{timestamps:true});


const opportunityModel = mongoose.model('opportunities', opportunitySchema);
module.exports = opportunityModel;