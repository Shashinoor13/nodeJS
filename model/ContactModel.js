const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email:{
        type:String,
        required:true
    },
    Subject:{
        type:String,
        required:true
    },
    Message:{
        type:String,
        required:true
    }
});

const Contact = mongoose.model('contacts', contactSchema);

module.exports = {Contact, contactSchema};
