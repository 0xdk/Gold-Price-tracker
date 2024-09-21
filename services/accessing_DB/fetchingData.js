const GoldPriceModel = require('../../database/schema');
// fetching the data from the database
async function fetchGoldPrices() {
  try {
    // Querying the database to retrieve all gold price records
    const data = await GoldPriceModel.find({}).select(
      'priceArray statusData.change statusData.symbol'
    );
    if (!data) return undefined;
    return data;
  } catch (error) {
    console.error('Error fetching gold prices', error.message);
  }
}

module.exports = fetchGoldPrices;
