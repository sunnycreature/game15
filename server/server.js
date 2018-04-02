const express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser');

const PORT = 3003;
const FILENAME = 'db.json';

const app = express();

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