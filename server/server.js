const express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser');

const PORT = 3003;
const ORIGIN_PORT = 3000;
const FILENAME = 'db.json';

const app = express();

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:${ORIGIN_PORT}`);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/db', (req, res) => {
  console.log('GET');
  const contents = fs.readFileSync(FILENAME).toString();
  res.send(contents);
});

app.post('/db', (req, res) => {
  console.log('POST');
  console.log(req.body);
  fs.writeFileSync(FILENAME, JSON.stringify(req.body));
  res.sendStatus(200);
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});