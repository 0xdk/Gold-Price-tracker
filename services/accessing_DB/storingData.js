const GoldPriceModel = require('../../database/schema');
const getPriceDifferenceInfo = require('../../utils/priceDifference');
const AppError = require('../../utils/AppError');

async function storingGoldPrice(todayDoc, retryCount = 0) {
  try {
    // fetch the last doc from DB(yesterday's)
    const yesterdayDoc = await GoldPriceModel.findOne()
      .sort({ _id: -1 })
      .select('priceArray')
      .exec();
    // Checks if lastDocument data is already stored on DB using Date
    if (yesterdayDoc.priceArray[0] === todayDoc[0]) {
      return console.error('Data is already stored');
    }

    // Calculate price difference between yesterday's and today's gold prices
    const difference = getPriceDifferenceInfo(yesterdayDoc, todayDoc);

    // Create a new Document using the GoldPriceModel
    const newGoldPrice = new GoldPriceModel({
      statusData: difference,
      priceArray: todayDoc,
      date: new Date().toISOString().split('T')[0],
    });
    // saves Doc
    await newGoldPrice.save();

    // Ensure the collection size is limited to 10 documents
    const arrayCount = await GoldPriceModel.countDocuments();
    if (arrayCount > 10) {
      await GoldPriceModel.findOneAndDelete({}, { sort: { date: 1 } });
      console.log('Old array deleted');
    }
    console.log('Daily operation completed successfully');
  } catch (err) {
    if (retryCount < 3) {
      console.log(`Retrying... Attempt ${retryCount + 1}`);
      await storingGoldPrice(todayDoc, retryCount + 1);
    }
    throw new AppError('Error Storing gold Price', 500);
  }
}

// Object encapsulating data handling functions

module.exports = storingGoldPrice;
