require('dotenv').config();

let express = require('express');
let router = express.Router();

const sendingMails = require('../mails/mail');
const dataHandler = require('../database/datahandler');
const AppError = require('../utils/AppError');

const authToken = process.env.AUTH_TOKEN;

function timeStamp() {
  const date = Date.now();
  const timeStamp = new Date(date).toLocaleString();
  console.log(timeStamp);
  //return timeStamp;
}

// Middlewares
// authorization middleware
const secureRouteMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('basic ')) {
    req.flash('error', 'Request unauthorized, you have no permission');
    return res.redirect('/');
  }
  const authHeaderValue = authHeader.split(' ')[1];
  const credentials = Buffer.from(authHeaderValue, 'base64').toString('ascii');

  if (credentials === authToken) {
    return next();
  } else {
    req.flash('error', 'Request unauthorized, you have no permission');
    return res.redirect('/');
  }
};

// Middleware to set local variables for success and error flash messages
router.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Routes
router.get('/', async (req, res, next) => {
  try {
    const data = await dataHandler.fetchGoldPrices();
    // Throws an error if data is null/undefined or if data[0] has no priceArray property
    if (!data || !data[0].priceArray) {
      next(new AppError('Internal Server Error, Try later', 500));
    } else {
      res.render('home', { data });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', secureRouteMiddleware, async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      req.flash('error', 'Enter valid Email Id');
      return console.error('email id is not provided');
    }
    await sendingMails.storingEmailAddress(email);
    req.flash('success', 'Sign up successful!');
    res.redirect('/');
  } catch (err) {
    req.flash('error', 'Could not sign up, please try again');
    console.error(err.message);
    res.status(500).redirect('/');
  }
});

router.get('/get-data', secureRouteMiddleware, async (req, res, next) => {
  try {
    await dataHandler.scrappingAndStoring();
    timeStamp();
    res.redirect('/');
  } catch (err) {
    console.error(err.message);
    res.status(500).redirect('/');
  }
});

router.get('/send-mail', async (req, res) => {
  try {
    // Calling the fetching and storing function from the mail module
    await sendingMails.fetchingAndSendingMail();
    timeStamp();
    res.redirect('/');
  } catch (err) {
    console.error(err.message);
    res.status(500).redirect('/');
  }
});

module.exports = router;
