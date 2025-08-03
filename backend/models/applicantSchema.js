
const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const applicantSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    interest: { type: String, required: true },
    resume: { type: String, required: true }, 
    whythisjob: { type: String },
    registrationDate: { type: Date, default: Date.now }
});

const Applicant = mongoose.model('Applicant', applicantSchema);
module.exports = Applicant; // Export the model