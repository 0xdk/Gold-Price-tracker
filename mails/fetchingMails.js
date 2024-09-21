const connectToMailjet = require('./mailjetConnect');
// connecting to mail jet
const mailjet = connectToMailjet();
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

module.exports = fetchingMailAddresses;
