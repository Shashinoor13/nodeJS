const PORT_NUMBER = 3000;
const express = require('express');
const app = express();
const fs = require('fs');


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
app.listen(PORT_NUMBER, () => {
    console.log(`Server is running on port ${PORT_NUMBER} \n http://localhost:${PORT_NUMBER}`);
});
