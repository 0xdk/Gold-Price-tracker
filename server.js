require('dotenv').config();
const express = require('express');
const app = express();
const engine = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');

const sendingMails = require('./mails/mail');
const dataHandler = require('./database/datahandler');
const priceDifference = require('./priceChange');

// template engine
app.engine('ejs', engine);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

function timeStamp() {
  const date = Date.now();
  const timeStamp = new Date(date).toLocaleString();
  console.log(timeStamp);
  //return timeStamp;
}
let port = process.env.PORT || 3000;
const authToken = process.env.AUTH_TOKEN;

// middlewares

// authorization middleware
const secureRouteMiddleware = (req, res, next) => {
  const authHear = req.headers.authorization;
  console.log(authHear);
  if (!authHear || !authHear.startsWith('basic ')) {
    console.log('request unauthorized, there is no auth headers');
    return res.status(401).redirect('/');
  }

  const credentials = Buffer.from(authHear.split(' ')[1], 'base64').toString(
    'ascii'
  );
  console.log(credentials);
  if (credentials === authToken) {
    return next();
  } else {
    console.log('request unauthorized, incorrect credentials');
    return res.status(401).redirect('/');
  }
};

app.get('/', async (req, res) => {
  try {
    const data = await dataHandler.fetchGoldPrices();
    const difference = priceDifference.getPriceChangeInfo(data);
    res.render('home', { data, difference });
  } catch (err) {
    console.log(err.message);
  }
});

app.post('/signup', async (req, res) => {
  try {
    await sendingMails.storingEmailAddress(req.body.email);
    res.redirect('/');
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/get-data', secureRouteMiddleware, async (req, res) => {
  try {
    // let auth = req.headers['authorization'];

    // if (auth !== auth_token) {
    //   console.log('not Authorized');
    //   res.redirect('/');
    // } else {
    await dataHandler.scrappingAndStoring();
    timeStamp();
    res.send('data stored successfully');
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/send-mail', secureRouteMiddleware, async (req, res) => {
  try {
    // Calling the fetching and storing function from the mail module

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
