const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const path = require('path');

const indexRouter = require('./routes/index.js');

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));

// set engine to output ejs
app.set('view engine', 'ejs');

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.listen(port);
