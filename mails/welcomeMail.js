const ConnectToMailjet = require('./mailjetConnect');
const mailjet = ConnectToMailjet();
const signUpEmailTemplate = require('./signUpTemplate');

async function sendWelcomeEmail(email) {
  try {
    if (!email) {
      return console.error('error address in not provided');
    }

    const request = await mailjet.post('send', { version: 'v3.1' }).request({
      Globals: signUpEmailTemplate(),
      Messages: [
        {
          To: [{ Email: email }],
        },
      ],
    });
    console.log(request.body);
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = sendWelcomeEmail;
