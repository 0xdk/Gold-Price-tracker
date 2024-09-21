require('dotenv').config();
const Mailjet = require('node-mailjet');
const AppError = require('../utils/AppError');

function connectToMailjet() {
  if (!process.env.API_KEY_PUBLIC || !process.env.API_KEY_PRIVATE) {
    throw new AppError('Mailjet API keys are missing in environment variables');
  }

  return Mailjet.apiConnect(
    process.env.API_KEY_PUBLIC,
    process.env.API_KEY_PRIVATE
  );
}

module.exports = connectToMailjet;
