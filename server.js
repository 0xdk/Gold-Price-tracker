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
const auth_token = process.env.AUTH_TOKEN;

app.get('/', async (req, res) => {
  try {
    const data = await dataHandler.fetchGoldPrices();
    const difference = priceDifference.getPriceChangeInfo(data);
    console.log(difference.change);
    res.render('home', { data, difference });
  } catch (err) {
    console.log(err.message);
  }
});

app.post('/signup', async (req, res) => {
  try {
    const { email } = req.body;
    await sendingMails.storingEmailAddress(email);
    res.redirect('/');
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/get-data', async (req, res) => {
  try {
    let auth = req.headers['authorization'];

    if (auth !== auth_token) {
      console.log('not Authorized');
      res.redirect('/');
    }

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
    console.log(req.headers);
    let auth = req.headers['authorization'];
    console.log('Authorization Header:', auth);
    console.log('Expected Auth Token:', auth_token);

    if (auth !== auth_token) {
      console.log('not Authorized');
      res.redirect('/');
    }

    await sendingMails.fetchingAndSendingMail();
    timeStamp();
    res.redirect('/');
  } catch (err) {
    console.log("nope it didn't work", err.message);
    res.send(err.message);
  }
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
