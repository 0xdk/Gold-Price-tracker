require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
// template engine
const engine = require('ejs-mate');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
const methodOverride = require('method-override');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sendingMails = require('./mails/mail');
const dataHandler = require('./database/datahandler');
const priceDifference = require('./priceChange');

// for testing
function timeStamp() {
  const date = Date.now();
  const timeStamp = new Date(date).toLocaleString();
  console.log(timeStamp);
  //return timeStamp;
}

let port = process.env.PORT || 3000;
const auth_token = 'Bearer ' + process.env.AUTH_TOKEN;

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
    await dataHandler.scrappingAndStoring();
    console.log('data stored successfully');
    timeStamp();
    res.redirect('/');
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/send-mail', async (req, res) => {
  try {
    // Calling the fetching and storing function from the mail module

    let auth = req.headers['Authorization'];
    console.log(auth_token);
    console.log(auth);
    if (auth !== process.env.AUTH_TOKEN) return console.log('not Authorized');

    await sendingMails.fetchingAndSendingMail();
    console.log('Mail Sent Successfully');
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
