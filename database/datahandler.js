const mongoose = require('mongoose');
const scrappedResult = require('../scrapping/scraper');
const GoldPriceModel = require('./schema');
const databaseConnection = require('./databaseConnection');

// Performs web scraping of gold prices from a specific website and stores the values in a MongoDB database.
async function scrappingAndStoring() {
  try {
    // Scrapping
    const priceArray = await scrappedResult.scrapeData();
    // await databaseConnection.connectToDatabase();

    // Check if the priceArray length is <= 0: Ensures valid scraped data with at least one element
    if (priceArray.length <= 0)
      return console.error('Something went wrong on Scrapping Part');

    const lastDocument = await GoldPriceModel.findOne()
      .sort({ _id: -1 })
      .exec();

    // Check if current data is already stored based on the first element of price arrays
    if (lastDocument.priceArray[0] === priceArray[0]) {
      return 'Already stored the data';
    }

    // Create a new Document using the GoldPriceModel
    const newGoldPrice = new GoldPriceModel({
      priceArray: priceArray,
      date: new Date().toISOString().split('T')[0],
    });
    // saves that Doc
    await newGoldPrice.save();

    // Ensure the collection size is limited to 10 documents
    const arrayCount = await GoldPriceModel.countDocuments();
    if (arrayCount > 10) {
      const oldArray = await GoldPriceModel.findOneAndDelete(
        {},
        { sort: { date: 1 } }
      );
      console.log(oldArray, 'Old array deleted');
    }
    console.log('Daily operation completed successfully');
  } catch (err) {
    console.log(err, 'Error in running daily operation');
  } finally {
    await mongoose.disconnect();
  }
}

// fetching the data from the database
async function fetchGoldPrices() {
  try {
    await databaseConnection.connectToDatabase();
    // Querying the database to retrieve all gold price records
    const data = await GoldPriceModel.find({});
    if (!data) return undefined;

    return data;
  } catch (error) {
    console.error('Error fetching gold prices:', error);
    throw error;
  }
}

// Object encapsulating data handling functions
const dataHandler = {
  scrappingAndStoring,
  fetchGoldPrices,
};

module.exports = dataHandler;
