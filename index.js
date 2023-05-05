const PORT_NUMBER =process.env.PORT || 3000;
const {sendDataToDatabase,searchFunction,app,fs,bodyParser,mongoose,connect,contactSchema,servePage,isAdmin}=require('./imports.js');

var ObjectId = require('mongodb').ObjectId; 
app.use(bodyParser.urlencoded({extended:true}));

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
            servePage('fetch',res,PORT_NUMBER);
            break;
        case '/delete':
            servePage('forbidden',res,PORT_NUMBER);
            break;
        default:
            res.status(404).render('error.pug', {title: "404: File Not Founds not exist."});
            
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
    if( await isAdmin(username,password)){
        res.render('users.pug', {data: [],url:'/getAll'});
    }
    else{
        res.status(
            403).send('Forbidden');
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
    console.log('Went to fn');
    const messeges = new mongoose.model('contacts',contactSchema);
    console.log(id);
    await messeges.deleteOne({"_id":id})
});


app.listen(PORT_NUMBER, () => {
    console.log(`Server is running on port ${PORT_NUMBER} \n http://localhost:${PORT_NUMBER}`);
});

