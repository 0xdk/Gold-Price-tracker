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

app.get('/first-task', async (req, res) => {
  console.log('Before First task');
  await tasks.firstTask();
  console.log('First Task');
  res.send('first task worked');
});

app.get('/second-task', async (req, res) => {
  console.log('Before Second Task');
  await tasks.secondTask();
  console.log('Second Task');
  res.send('second task worked');
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
