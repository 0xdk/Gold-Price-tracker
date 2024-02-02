const mongoose = require('mongoose');
const scrappedResult = require('../scrapping');
const GoldPriceModel = require('./schema');

/**
 * Performs web scraping of gold prices from a specific website and stores the values in a MongoDB database.
 *
 * This function uses the `chennaiGoldPrice` function from the `scrappedResult` module
 * to retrieve the latest gold prices. It then creates a new document using the `GoldPriceModel`,
 * including the extracted price array and the current date. The new document is saved to the database.
 * Additionally, it ensures that the collection size is limited to 10 documents by removing the oldest document
 * if the collection exceeds this limit.
 */

const scrappingAndSaving = async () => {
  try {
    // Scrapping
    const priceArray = await scrappedResult.chennaiGoldPrice();

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
      const oldArray = await GoldPriceModel.findOne({}, { sort: { date: 1 } });
      await GoldPriceModel.deleteOne({ _id: oldArray._id });
      console.log(oldArray, 'Old array deleted');
    }
    console.log('Daily operation completed successfully');
  } catch (err) {
    console.log(err, 'Error in running daily operation');
  } finally {
    await mongoose.disconnect();
  }
};

/**
 * Fetches gold price data from the MongoDB database using the GoldPriceModel.
 *
 * This function retrieves all documents from the `GoldPriceModel` collection,
 * representing historical gold prices stored in the database.
 *
 * @returns {Array} An array of objects representing historical gold price data.
 * @throws {Error} If an error occurs while fetching the data from the database.
 */

// fetching the data from the database
const fetchGoldPrices = async () => {
  try {
    // Query the database to retrieve all gold price records
    const data = await GoldPriceModel.find({});
    return data;
  } catch (error) {
    console.error('Error fetching gold prices:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};
// Object encapsulating data handling functions
const dataHandler = {
  scrappingAndSaving,
  fetchGoldPrices,
};

module.exports = dataHandler;
