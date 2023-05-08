const express = require('express');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const url = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;



app.use(bodyParser.urlencoded({extended:true}));

async function conntectToDatabase(){
    console.log(url);
    await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}
        ).then((value)=>{
            value.connection.readyState==1?console.log(`Connected to database \n  Collection:${value.connection.db.databaseName}\n `):console.log("Not connected to database");
        })
        .catch((err)=>{
            console.log(err);
        });
}

exports.conntectToDatabase = conntectToDatabase;