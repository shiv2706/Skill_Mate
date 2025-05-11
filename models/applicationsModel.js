const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    authorId:{
        type: String,
        required: true,
    },
    applicantName:{
        type: String,
        required: [true, 'Please enter your name'],
    },
    applicantImage:{
        type: String,
        required: [true, 'Please enter your name'],
    },
    applicantProfileId:{
        type: String,
        required: [true, 'Please enter your name'],
    },
    appliedFor:{
        type: String,
        required: [true, 'Please enter your title'],
    },
    applicationStatus:{
        type: String,
        default: 'Pending'
    },
    applicantEmail:{
        type: String,
        required: true,
    },


},{timestamps:true});


const applicationsModel = mongoose.model('applications', applicationSchema);
module.exports = applicationsModel;