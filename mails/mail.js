require('dotenv').config();
const Mailjet = require('node-mailjet');
const databaseConnection = require('../database/databaseConnection');
const emailTemplate = require('./emailTemplate');
const mailjet = Mailjet.apiConnect(
  process.env.API_KEY_PUBLIC,
  process.env.API_KEY_PRIVATE
);

// Function to store emails (contacts) in the Mailjet database.

async function storingEmailAddress(email) {
  try {
    if (!email) {
      return console.error('Email address not provided');
    }

    // Creating a POST request to Mailjet's 'contact' endpoint with API version 'v3'
    const request = mailjet.post('contact', { version: 'v3' }).request({
      IsExcludedFromCampaigns: 'true',
      // - Name: Name of the new contact (replace 'New Contact' with the actual name)
      Name: 'New User',
      // - Email: Email address of the new contact
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
  }
}

//  Function to retrieve contact information (email addresses) from the Mailjet Using API.
async function fetchingMailAddresses() {
  try {
    // Make an request to the Mailjet API to retrieve contact(Email) information
    const result = await mailjet.get('contact', { version: 'v3' }).request();
    if (!result) {
      return console.error('Could not find any emails');
    }
    // Extract email addresses from the response data
    const contacts = result.body.Data;
    return contacts.map((contact) => contact.Email);
  } catch (err) {
    console.error(err.message);
  }
}

//   Function to fetch data (gold prices) and send emails using the Mailjet API.
async function fetchingAndSendingMail() {
  const connection = await databaseConnection.connectToDatabase();
  try {
    // Retrieving email addresses from the MailJet database using the Mailjet API
    const emails = await fetchingMailAddresses();
    if (!emails) {
      return console.error('error fetching mail addresses');
    }
    const emailConfig = await emailTemplate();
    // Sending emails using the Mailjet API
    const request = await mailjet.post('send', { version: 'v3.1' }).request({
      // email template
      Globals: emailConfig,
      // Creating individual email messages for each recipient
      Messages: emails.map((email) => ({
        To: [{ Email: email }],
      })),
    });
    console.log(request.body);
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) connection.close();
  }
}

// Object encapsulating functions related to sending emails
const sendingMails = {
  fetchingAndSendingMail,
  storingEmailAddress,
};

module.exports = sendingMails;
