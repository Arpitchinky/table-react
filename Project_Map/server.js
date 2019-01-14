const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var https = require('https');
var indexRouter = require('./routes/index');




const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.use('/', indexRouter);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));

 // Handle React routing, return all requests to React app
 app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
};




app.listen(port, () => console.log(`Listening on port ${port}`));