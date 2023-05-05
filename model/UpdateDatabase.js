const mongoose = require('mongoose');
const env = require('dotenv').config();
const url = process.env.MONGO_DB_URL;
const connect = require('../config/db.js'); 
const {Contact} = require('./ContactModel.js');

async function sendDataToDatabase(name,email,subject,message){
    console.log(`Name:${name}\nEmail:${email}\nSubject:${subject}\nMessage:${message}`);
    await connect.conntectToDatabase();
    const person1 = new Contact({
        Name:name,
        Email:email,
        Subject:subject,
        Message:message 
    });
    person1.save().then((value)=>{

        console.log("Data saved to database");
        console.log(value);
    }
    ).catch((err)=>{
        console.log(err);
    }
    );
    delete mongoose.connection.models['contacts'];
}

module.exports = {sendDataToDatabase};