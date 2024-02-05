const { config } = require('dotenv');
config();

let express = require('express');

let tasks = require('./tasks');

let app = express();

let port = process.env.PORT || 8080;

app.get('/first-logic', (req, res) => {
  tasks.firstTask();
  res.send('first logic worked');
});

app.get('/second-logic', (req, res) => {
  tasks.secondTask();
  res.send('second logic worked');
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
