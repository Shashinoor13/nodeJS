const PORT_NUMBER =process.env.PORT || 3000;
const {sendDataToDatabase,searchFunction,app,fs,bodyParser,mongoose,connect,contactSchema,servePage}=require('./imports.js');


app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req, res) => {
    servePage('home',res);
});

app.get('/about', (req, res) => {
    servePage('about',res);
});

app.get('/contact', (req, res) => {
    servePage('contact',res);
});

app.get('/home', (req, res) => {
    servePage('home',res);
});

app.get('/fetch', (req, res) => {
    servePage('fetch',res);
});


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

app.use(handle404);

function handle404(req, res) {
    res.status(404).render('error.pug', {title: "404: File Not Found", message: "The page you are looking for does not exist.", error: "404",image:"https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=1380&t=st=1683204594~exp=1683205194~hmac=58a8d2e241b53e29b56eabd68c9d1060b3bd34d1fd6b7fb2a68abc42583c69df"});
}

app.listen(PORT_NUMBER, () => {
    console.log(`Server is running on port ${PORT_NUMBER} \n http://localhost:${PORT_NUMBER}`);
});

