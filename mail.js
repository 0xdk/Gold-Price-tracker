const { config } = require('dotenv');
config();
const Mailjet = require('node-mailjet');
const databaseConnection = require('./database/databaseConnection');
const dataHandler = require('./database/dataHandling');

const mailjet = Mailjet.apiConnect(
  process.env.API_KEY_PUBLIC,
  process.env.API_KEY_PRIVATE
);

/**
 * Function to store emails (contacts) in the Mailjet database.
 *
 * This function creates a POST request to Mailjet's 'contact' endpoint with API version 'v3'
 * and sets the contact properties such as exclusion from campaigns, name, and email address.
 */
const storingEmails = async () => {
  // Creating a POST request to Mailjet's 'contact' endpoint with API version 'v3'
  const request = mailjet.post('contact', { version: 'v3' }).request({
    IsExcludedFromCampaigns: 'true',
    // - Name: Name of the new contact (replace 'New Contact' with the actual name)
    Name: 'New Contact',
    // - Email: Email address of the new contact (replace 'abd@mail.com' with the actual email address)
    Email: 'abd@mail.com',
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Function to retrieve contact information (email addresses) from the Mailjet API.
 *
 * This function makes a request to the Mailjet API to retrieve contact(Mail) information and extracts
 * email addresses from the response data. It returns an array of email addresses.
 *
 * @returns {Array} An array of email addresses retrieved from the Mailjet API.
 */
const retrieveMailAddresses = async () => {
  try {
    // Make an request to the Mailjet API to retrieve contact(Email) information
    const result = await mailjet.get('contact', { version: 'v3' }).request();
    // Extract email addresses from the response data
    const contacts = result.body.Data;
    return contacts.map((contact) => contact.Email);
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Function to fetch data (gold prices) and send emails using the Mailjet API.
 *
 * Retrieves email addresses from the database,
 * fetches the latest gold prices, and sends personalized emails using the Mailjet API.
 */
const fetchingAndSendingMail = async () => {
  let connection;
  try {
    // Establishing a connection to the database
    connection = databaseConnection.connectToDatabase();
    // Retrieving email addresses from the database
    const emails = await retrieveMailAddresses();

    // Fetching the Gold Price from the Database
    const data = await dataHandler.fetchGoldPrices();

    // Extracting the daily price array from the retrieved data object
    const dailyPriceArray = data[data.length - 1].priceArray;

    // Sending emails using the Mailjet API
    const request = await mailjet.post('send', { version: 'v3.1' }).request({
      // Global settings for the email campaign
      Globals: {
        // Sender information
        From: {
          Email: process.env.SENDER_EMAIL,
          Name: 'Tester',
        },
        Subject: 'Check Today Gold Price in Chennai',
        HTMLPart: `<p>As of today, the market price for gold in Chennai is as follows:</p>

        <ul>
          <li><strong>24K Gold:</strong> ₹${dailyPriceArray[0]} per gram</li>
          <li><strong>22K Gold:</strong> ₹${dailyPriceArray[2]} per gram</li>
        </ul>
        
        <p>These prices are subject to change based on market fluctuations. Thank you for staying informed!</p>`,

        // *Alternative text part for email clients that do not support HTML
        TextPart: `Today's gold prices in Chennai: 24K - ₹${dailyPriceArray[0]}/gram, 22K - ₹${dailyPriceArray[2]}/gram. Subject to market changes. Thank you!`,
      },
      // Creating individual email messages for each recipient
      Messages: emails.map((email) => ({
        To: [{ Email: email }],
      })),
    });

    console.log(request.body);
  } catch (err) {
    console.error(err.message);
  }
};
// Object encapsulating functions related to sending emails
const sendingMails = {
  fetchingAndSendingMail,
};

module.exports = sendingMails;
