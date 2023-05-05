const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const connect = require('./config/db.js');
const {contactSchema} = require('./model/ContactModel.js');
const {sendDataToDatabase} = require('./model/UpdateDatabase.js');
const {searchFunction} = require('./model/searchDatabase.js');
const{servePage} = require('./routes/get.js');

module.exports = {app,fs,bodyParser,mongoose,connect,contactSchema,sendDataToDatabase,searchFunction,servePage};