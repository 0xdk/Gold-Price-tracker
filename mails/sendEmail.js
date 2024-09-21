require('dotenv').config();
const getEmailConfig = require('./emailTemplate');
const fetchingMailAddresses = require('./fetchingMails');

const connectToMailjet = require('./mailjetConnect');
const mailjet = connectToMailjet();

//   Function to fetch data (gold prices) and send emails using the Mailjet API.
async function sendingMails() {
  try {
    // Retrieving email addresses from the MailJet database using the Mailjet API
    const emails = await fetchingMailAddresses();
    if (!emails) {
      return console.error('error fetching mail addresses');
    }
    // Sending emails using the Mailjet API
    const request = await mailjet.post('send', { version: 'v3.1' }).request({
      // email template
      Globals: await getEmailConfig(),
      // Creating individual email messages for each recipient
      Messages: emails.map((email) => ({
        To: [{ Email: email }],
      })),
    });
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = sendingMails;
