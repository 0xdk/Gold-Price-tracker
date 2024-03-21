const scrappedResult = require('../scrapping/scraper');
const GoldPriceModel = require('./schema');
const databaseConnection = require('./databaseConnection');

// Performs web scraping of gold prices from a specific website and stores the values in a MongoDB database.
async function scrappingAndStoring() {
  const connection = await databaseConnection.connectToDatabase();
  try {
    // Scrapping
    const priceArray = await scrappedResult.scrapeData();

    // Check if the priceArray length is <= 0: Ensures valid scraped data with at least one element
    if (!priceArray || priceArray.length <= 0) {
      return console.error('Something went wrong in the Scraping Part');
    }

    // fetch the last doc from DB
    const lastDocument = await GoldPriceModel.findOne()
      .sort({ _id: -1 })
      .exec();

    // Checks if lastDocument data is already stored on DB
    if (lastDocument.priceArray[0] === priceArray[0]) {
      return console.error('Data is already stored');
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
      await GoldPriceModel.findOneAndDelete({}, { sort: { date: 1 } });
      console.log('Old array deleted');
    }
    console.log('Daily operation completed successfully');
  } catch (err) {
    console.error(err.message, 'Error in running daily operation');
  } finally {
    if (connection) connection.close();
  }
}

// fetching the data from the database
async function fetchGoldPrices() {
  const connection = await databaseConnection.connectToDatabase();
  try {
    // Querying the database to retrieve all gold price records
    const data = await GoldPriceModel.find({});
    if (!data) return undefined;
    return data;
  } catch (error) {
    console.error('Error fetching gold prices', error.message);
  } finally {
    if (connection) connection.close();
  }
}

// Object encapsulating data handling functions
const dataHandler = {
  scrappingAndStoring,
  fetchGoldPrices,
};

module.exports = dataHandler;
