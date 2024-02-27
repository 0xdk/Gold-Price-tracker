const { config } = require('dotenv');
config();
const express = require('express');
const app = express();

const sendingMails = require('./mails/mail');
const dataHandler = require('./database/datahandler');

function timeStamp() {
  const date = Date.now();
  const timeStamp = new Date(date).toLocaleString();
  console.log(timeStamp);
  //return timeStamp;
}

let port = process.env.PORT || 3000;

/**
 * Express route to trigger the fetching and sending of emails.
 *
 * This route is designed to handle a GET request to '/send-mail'. It internally calls
 * the `fetchingAndSendingMail` function from the 'sendingMails' module to perform the
 * fetching and sending of emails. The timestamp of the operation is logged to the console.
 *
 */

app.get('/get-data', async (req, res) => {
  try {
    await dataHandler.scrappingAndStoring();
    timeStamp();
    res.send('data stored successfully');
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/send-mail', async (req, res) => {
  try {
    // Calling the fetching and storing function from the mail module
    await sendingMails.fetchingAndSendingMail();
    timeStamp();
    res.send('Mail Sent Successfully');
  } catch (err) {
    console.log("nope it didn't work", err.message);
    res.send(err.message);
  }
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
