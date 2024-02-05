const cron = require('node-cron');
const databaseConnection = require('./database/databaseConnection');
const dataHandler = require('./database/dataHandling');
const sendingMails = require('./mail');

const timeStamp = () => {
  const date = Date.now();
  const timeStamp = new Date(date).toLocaleString();
  console.log(timeStamp);
  //return timeStamp;
};

/**
 *   First Task: Scraping and Saving the Data
 *
 *   This Establishes a connection to the MongoDB database. Calls the 'scrappingAndSaving'
 *   function from the 'dataHandler' module. Logs a timestamp. Handles errors and
 *   closes the database connection if opened.
 *
 * @returns {Promise<void>} A Promise that resolves when the tasks are completed.
 */

let firstTask = async () => {
  let connection;
  try {
    // establishing Database connection
    connection = await databaseConnection.connectToDatabase();
    // Calling the scrapping and saving function from the dataHandler module
    await dataHandler.scrappingAndSaving();
    timeStamp();
  } catch (err) {
    console.log("nope it didn't work", err);
  } finally {
    if (connection) await connection.close();
  }
};
/**
 *  Second Task: Fetching and Sending Email
 *
 *  Establishes a connection to the MongoDB database. Calls the 'fetchingAndSendingMail'
 *  function from the 'sendingMails' module, Logs a timestamp. Handles errors
 *  and closes the database connection if opened.
 *
 * @returns {Promise<void>} A Promise that resolves when the fetching and sending email tasks are completed.
 */
const secondTask = async () => {
  let connection;
  try {
    // establishing Database connection
    connection = await databaseConnection.connectToDatabase();
    // Calling the fetching and sending function from the sendingMails module
    await sendingMails.fetchingAndSendingMail();
    timeStamp();
  } catch (err) {
    console.log('error', err);
  } finally {
    if (connection) await connection.close();
  }
};

const cronLogic = {
  firstTask,
  secondTask,
};

module.exports = cronLogic;
