// Function to store emails (contacts) in the Mailjet database.
const AppError = require('../utils/AppError');
const ConnectToMailjet = require('./mailjetConnect');
const mailjet = ConnectToMailjet();
async function storingEmailAddress(email) {
  try {
    if (!email) {
      throw new AppError('Email address not provided');
    }

    // Creating a POST request to Mailjet's 'contact' endpoint with API version 'v3'
    const request = mailjet.post('contact', { version: 'v3' }).request({
      IsExcludedFromCampaigns: 'true',
      Name: 'New User',
      Email: email,
    });
    request
      .then((result) => {
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
}

module.exports = storingEmailAddress;
