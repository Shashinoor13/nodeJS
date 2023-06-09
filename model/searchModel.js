

const mongoose = require('mongoose');
const connect = require('../config/db.js');
const messeges = require('../model/ContactModel.js');

async function searchFunction(search,req,res){
    await connect.conntectToDatabase();
    // const messeges = new mongoose.model('contacts',new mongoose.Schema({
    //     Name: {
    //         type: String,
    //         required: true
    //     },
    //     Email:{
    //         type:String,
    //         required:true
    //     },
    //     Subject:{
    //         type:String,
    //         required:true
    //     },
    //     Message:{
    //         type:String,
    //         required:true
    //     }
    // }));
    messeges.find({Name:search}).then(value=>{
        if(value.length==0){
            console.log("No data found");
            res.render('users.pug',{data:[]});
        }
        else{
        console.table(value.map((value,index)=>{return {Name:value.Name,Email:value.Email,Subject:value.Subject,Message:value.Message}}));
        res.render('users.pug',{data:value});
        }
    });
    delete mongoose.connection.models['contacts'];}

    exports.searchFunction = searchFunction;
/*
async function searchFunction(search,req,res){
    await connect.conntectToDatabase();
    const messeges = new mongoose.model('contacts',new mongoose.Schema({
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

    }));
    messeges.find({Name:search}).then(value=>{
        if(value.length==0){
            console.log("No data found");
            res.render('users.pug',{data:[]});
        }
        else{
        console.table(value.map((value,index)=>{return {Name:value.Name,Email:value.Email,Subject:value.Subject,Message:value.Message}}));
        res.render('users.pug',{data:value});
        }
    })
        .catch(err=>{
            console.log(err);
        }
        );
    delete mongoose.connection.models['contacts'];
}
*/