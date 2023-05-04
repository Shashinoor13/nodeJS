const PORT_NUMBER = 3000;
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser=require("body-parser");
const { CLIENT_RENEG_LIMIT } = require('tls');


app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    const readStream = fs.createReadStream("./home.html",'utf-8');
    readStream.pipe(res);
}
);

app.get('/about.html', (req, res) => {
    const readStream = fs.createReadStream("./about.html",'utf-8');
    readStream.pipe(res);
});
app.get('/contact.html', (req, res) => {
    const readStream = fs.createReadStream("./contact.html",'utf-8');
    readStream.pipe(res);
});

app.get('/home.html', (req, res) => {
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
app.listen(PORT_NUMBER, () => {
    console.log(`Server is running on port ${PORT_NUMBER} \n http://localhost:${PORT_NUMBER}`);
});

function sendDataToDatabase(name,email,subject,message){
    console.log(`Name:${name}\nEmail:${email}\nSubject:${subject}\nMessage:${message}`);
}
