const { config } = require('dotenv');
config();
let express = require('express');
let app = express();

let databaseConnection = require('./database/databaseConnection');

async function initializeDatabase() {
  try {
    let connection = await databaseConnection.connectToDatabase();
  } catch (error) {
    console.error('Error:', error.message);
  }
}
initializeDatabase();

let tasks = require('./tasks');

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
