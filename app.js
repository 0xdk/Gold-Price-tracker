const { config } = require('dotenv');
config();

let express = require('express');

let tasks = require('./tasks');

let app = express();

let port = process.env.PORT || 3000;

app.get('/first-task', (req, res) => {
  tasks.firstTask();
  res.send('first task worked');
});

app.get('/second-task', (req, res) => {
  tasks.secondTask();
  res.send('second task worked');
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
