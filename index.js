const PORT_NUMBER =process.env.PORT || 3000;
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const env = require('dotenv').config();


app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    const readStream = fs.createReadStream("./home.html",'utf-8');
    readStream.pipe(res);
}
);

app.get('/about', (req, res) => {
    const readStream = fs.createReadStream("./about.html",'utf-8');
    readStream.pipe(res);
});
app.get('/contact', (req, res) => {
    const readStream = fs.createReadStream("./contact.html",'utf-8');
    readStream.pipe(res);
});

app.get('/home', (req, res) => {
    const readStream = fs.createReadStream("./home.html",'utf-8');
    readStream.pipe(res);
});

app.post('/submit', (req, res) => {
    const senderName = req.body.Name;
    const senderEmail = req.body.Email;
    const senderMessage = req.body.Message;
    const senderSubject = req.body.Subject;
    sendDataToDatabase(senderName, senderEmail,senderSubject,senderMessage);
    res.render('./submit.pug', {Name: senderName, Email: senderEmail, Message: senderMessage});
});

app.use(handle404);

function handle404(req, res) {
    res.status(404).render('error.pug', {title: "404: File Not Found", message: "The page you are looking for does not exist.", error: "404",image:"https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=1380&t=st=1683204594~exp=1683205194~hmac=58a8d2e241b53e29b56eabd68c9d1060b3bd34d1fd6b7fb2a68abc42583c69df"});
}

app.listen(PORT_NUMBER, () => {
    console.log(`Server is running on port ${PORT_NUMBER} \n http://localhost:${PORT_NUMBER}`);
});

async function sendDataToDatabase(name,email,subject,message){
    console.log(`Name:${name}\nEmail:${email}\nSubject:${subject}\nMessage:${message}`);
    const url = process.env.MONGO_DB_URL;
    var contactSchema = new mongoose.Schema({
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
    await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}
        ).then((value)=>{
            value.connection.readyState==1?console.log(`Connected to database \n  Collection:${value.connection.db.databaseName}\n`):console.log("Not connected to database");
        })
        .catch((err)=>{
            console.log(err);
        });
    const  Contact = mongoose.model('contacts',contactSchema);
    const person = new Contact({
        Name:name,
        Email:email,
        Subject:subject,
        Message:message
    });
    person.save().then((value)=>{

        console.log("Data saved to database");
        console.log(value);
    }
    ).catch((err)=>{
        console.log(err);
    }
    );
}
