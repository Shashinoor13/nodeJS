const mongoose = require('mongoose');
const {admin, adminSchema} = require('./adminModel.js');
const connect = require('../config/db.js');

async function isAdmin(username,password){
    const admins = new mongoose.model('admins',adminSchema);
    await connect.conntectToDatabase();
    const adminInfo = await admins.find({username:username,password:password});
    delete mongoose.connection.models['admins'];
    if(adminInfo.length==0){
        return false;
    }
    else{
        return true;
    }
}

module.exports = {isAdmin};