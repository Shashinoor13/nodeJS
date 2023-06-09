const PORT_NUMBER =process.env.PORT || 3000;
const {sendDataToDatabase,searchFunction,app,fs,bodyParser,mongoose,connect,contactSchema,servePage,isAdmin}=require('./imports.js');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended:true}));
const express = require('express');
const session = require('express-session');
const moment = require('moment');
const NodeGeocoder = require('node-geocoder');


app.use(session({secret: 'sessionKEY', resave: true, saveUninitialized: true}))



const waeatherAPI = process.env.WEATHER_API2;
googleAPI = process.env.GOOGLE_API;


const googleMapsClient = require('@google/maps').createClient({
    key: googleAPI,
  });


var sessionData;
app.use(express.static('public'));
app.get('*',async(req,res)=>{
    switch (req.path) {
        case '/':
            servePage('home',res,PORT_NUMBER);
            break;
        case '/about':
            servePage('about',res,PORT_NUMBER);
            break;
        case '/contact':
            servePage('contact',res,PORT_NUMBER);
            break;
        case '/home':
            servePage('home',res,PORT_NUMBER);
            break;
        case '/fetch':
                sessionData = req.session;
                let userObj = {};
                if(sessionData.user) {
                    userObj = sessionData.user;
                 }
                 console.log(userObj);
                if(userObj.username && userObj.password){
                    res.render('users.pug', {data: [],url:'/getAll'});
                }
                else{
                    const readStream =fs.createReadStream('./Pages/fetch.html','utf-8');
                    readStream.pipe(res);
                }
            break;
        case '/delete':
            servePage('forbidden',res,PORT_NUMBER);
            break;
        case '/logout':
            sessionData = req.session;
            sessionData.destroy();
            const readStream =fs.createReadStream('./Pages/home.html','utf-8');
            readStream.pipe(res);
            break;
        case '/weather':
            var timestamp = Date.now();
            var time = moment(timestamp).format('h:mm:ss a');
            giveninfo = await giveWeather();
            switch(giveninfo.list[0].weather[0].main){
                case 'Clouds':
                    background="/images/cloudy.jpg";
                    break;
                case 'Rain':
                    background="balck";
                    break;

                case 'Drizzle':
                    background="green";
                    break;

                case 'Thunderstorm':
                    background="/images/thunder.jpg";
                    break;

                case 'Snow':
                    background="white";
                    break;
                default:
                    background = "/images/sunny.jpg";
            }
            res.render('weather.pug',{data:giveninfo.list[0],image:background,time1:time,locationName:giveninfo.city.name});
            break;
        default:
            res.status(404).render('error.pug', {title: "404: File Not Found",image:'/images/404.png'});
            
    }
})


app.post('/submit', (req, res) => {
    const senderName = req.body.Name;
    const senderEmail = req.body.Email;
    const senderMessage = req.body.Message;
    const senderSubject = req.body.Subject;
    sendDataToDatabase(senderName, senderEmail,senderSubject,senderMessage);
    res.render('./submit.pug', {Name: senderName, Email: senderEmail, Message: senderMessage});
});

app.post('/check', async(req, res) => {
    const password = req.body.Password;
    const username = req.body.Username;
    sessionData = req.session;
    sessionData.user = {};
    sessionData.user.username = username;
    sessionData.user.password = password;
    if( await isAdmin(username,password)){
        res.render('users.pug', {data: [],url:'/getAll'});
    }
    else{
        res.status(
            403);
        res.render('error.pug', {title: "403: Forbidden",image:'/images/403.png'});
    }
});


app.post('/search', async(req, res) => {
    const searchValue = req.body.name;
    searchFunction(searchValue,req,res);
});


app.post('/getAll', async(req, res) => {
    await connect.conntectToDatabase();
    const messeges = new mongoose.model('contacts',contactSchema);
    messeges.find().then(value=>{
        if(value.length==0){
            console.log("No data found");
            res.render('users.pug',{data:[]});
        }
        else{
            console.table(value.map((value)=>{return {Name:value.Name,Email:value.Email,Subject:value.Subject,Message:value.Message}}));
            res.render('users.pug',{data:value});
        }
    })
        .catch(err=>{
            console.log(err);
        }
        );
    delete mongoose.connection.models['contacts'];
});

app.post('/delete/:id', async(req, res) => {
    const id = req.params.id;
    backURL = req.header('Referer') || '/users';
    const messeges = new mongoose.model('contacts',contactSchema);
    await messeges.deleteOne({"_id":id})
});

async function giveWeather(){
    const url = `https://api.maptiler.com/geolocation/ip.json?key=H98yVYlZ50w07zq3S4Z5`;
    const response = await fetch(url);
    const location = await response.json();
    console.log(location);
    const lat = location.latitude;
    const lon = location.longitude;
    const city = location.city;
    const result =await  fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${waeatherAPI}&lat=${lat}&lon=${lon}`);
    const data = await result.json();
    console.log(data);
    return data;
}

app.listen(PORT_NUMBER, () => {
    console.log(`Server is running on port ${PORT_NUMBER} \n http://localhost:${PORT_NUMBER}`);
});

