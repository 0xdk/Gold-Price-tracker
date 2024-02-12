const { config } = require('dotenv');
config();
let express = require('express');
let app = express();

let databaseConnection = require('./database/databaseConnection');
const dataHandler = require('./database/dataHandling');
const sendingMails = require('./mails/mail');

async function initializeDatabase() {
  try {
    let connection = await databaseConnection.connectToDatabase();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const timeStamp = () => {
  const date = Date.now();
  const timeStamp = new Date(date).toLocaleString();
  console.log(timeStamp);
  //return timeStamp;
};

let port = process.env.PORT || 3000;

/**
 *   First Task: Scraping and Saving the Data
 *
 *   This Establishes a connection to the MongoDB database. Calls the 'scrappingAndSaving'
 *   function from the 'dataHandler' module. Logs a timestamp. Handles errors and
 *   closes the database connection if opened.
 */

app.get('/first-task', async (req, res) => {
  try {
    // establishing Database connection
    const connection = await initializeDatabase();
    // Calling the scrapping and saving function from the dataHandler module
    await dataHandler.scrappingAndSaving();
    if (connection) await connection.close();
    timeStamp();
    res.send('task without task module');
  } catch (err) {
    console.log("nope it didn't work", err.message);
    res.send(err.message);
  }
});

/**
 *  Second Task: Fetching and Sending Email
 *
 *  Establishes a connection to the MongoDB database. Calls the 'fetchingAndSendingMail'
 *  function from the 'sendingMails' module, Logs a timestamp. Handles errors
 *  and closes the database connection if opened.
 */

app.get('/second-task', async (req, res) => {
  try {
    // establishing Database connection
    const connection = await initializeDatabase();
    // Calling the fetching and sending function from the sendingMails module
    await sendingMails.fetchingAndSendingMail();
    timeStamp();
    if (connection) await connection.close();
    res.send('task two without task module');
  } catch (err) {
    console.log("nope it didn't work", err.message);
    res.send(err.message);
  }
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
