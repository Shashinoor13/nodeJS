const express = require('express');
const app = express();
const bodyParser=require("body-parser");
const fs = require('fs');

function post (route){
    switch(route){
    case '/submit':
        app.post(route, (req, res) => {
            const senderName = req.body.Name;
            const senderEmail = req.body.Email;
            const senderMessage = req.body.Message;
            const senderSubject = req.body.Subject;
            sendDataToDatabase(senderName, senderEmail,senderSubject,senderMessage);
            res.render('./submit.pug', {Name: senderName, Email: senderEmail, Message: senderMessage});
        })
    }
}

exports.post = post;
/*
app.post('/submit', (req, res) => {
    const senderName = req.body.Name;
    const senderEmail = req.body.Email;
    const senderMessage = req.body.Message;
    const senderSubject = req.body.Subject;
    sendDataToDatabase(senderName, senderEmail,senderSubject,senderMessage);
    res.render('./submit.pug', {Name: senderName, Email: senderEmail, Message: senderMessage});
});

app.post('/check', (req, res) => {
    const password = req.body.Password;
    const username = req.body.Username;
    if(password == "1234" && username=="admin" ){
        res.render('users.pug', {data: []});
    }
    else{
        res.status(
            403).send('Forbidden');
    }
});


app.post('/search', async(req, res) => {
    const searchValue = req.body.name;
    searchFunction(searchValue,req,res);
    console.log(searchValue);
});
*/