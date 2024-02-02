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
 * Cron Job One - Web scraping and storing data to the database.
 * * This cron job is scheduled to run every day at 08:00 AM. It establishes a connection to the database,
 * invokes the `scrappingAndSaving` function from the `dataHandler` module to perform web scraping
 * and save the data to the database, Finally, it closes the database connection.
 */
cron.schedule('0 8 * * *', async () => {
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
});

/**
 * Cron Job Two - Fetching data from the database and sending emails.
 * * This cron job is scheduled to run every day at 08:30 AM. It establishes a connection to the database,
 * invokes the `fetchingAndSendingMail` function from the `sendingMails` module to fetch data
 * from the database and send emails. If any errors occur during the process,
 * it logs an error message. Finally, it closes the database connection.
 */
cron.schedule('30 8 * * *', async () => {
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
});
