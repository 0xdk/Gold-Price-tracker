const fetchingData = require('../services/accessing_DB/fetchingData');
const storingGoldPrice = require('../services/accessing_DB/storingData');
const scrapeData = require('../services/scrapping/scraper');

const AppError = require('../utils/AppError');

// email services
const storingEmailAddress = require('../mails/storingEmails');
const sendWelcomeEmail = require('../mails/welcomeMail');
const sendEmails = require('../mails/sendEmail');

const { validationResult } = require('express-validator');

// home route
async function homeRoute(req, res, next) {
  try {
    const data = await fetchingData();
    // Throws an error if data is null/undefined or if data has no priceArray property
    if (!data || !data[0].priceArray) {
      console.error('Fetching data failed');
      next(new AppError('Internal Server Error, Try later', 500));
    } else {
      res.render('home', { data });
    }
  } catch (err) {
    next(err);
  }
}

// get-data
async function scrapeAndStoreGoldPrice(req, res, next) {
  try {
    const todayDoc = await scrapeData();
    await storingGoldPrice(todayDoc);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
}

// signup
async function signup(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error', errors.array()[0].msg);
    return res.redirect('/');
  }
  const { email } = req.body;
  try {
    // storing the email address in the mailjet database
    await storingEmailAddress(email);
    // sends welcome Email
    await sendWelcomeEmail(email);
    req.flash('success', 'Sign up successful!');
    res.redirect('/');
  } catch (err) {
    req.flash('error', 'Could not sign up, please try again');
    console.error(err.message);
    res.status(500).redirect('/');
  }
}

// send-mail
async function mailSending(req, res, next) {
  try {
    // Calling the send email module
    await sendEmails();
    // console.log('they hit the second tower');
    res.redirect('/');
  } catch (err) {
    console.error(err.message);
    res.status(500).redirect('/');
  }
}

module.exports = {
  scrapeAndStoreGoldPrice,
  homeRoute,
  signup,
  mailSending,
};
