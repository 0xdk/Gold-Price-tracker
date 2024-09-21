let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let goldPriceSchema = new Schema({
  statusData: {
    type: {
      change: [Number],
      symbol: String,
    },
  },
  priceArray: {
    type: [String],
    required: true,
  },
  date: {
    // using date remove old data (making sure only last 10 days data stored)
    type: Date,
    required: true,
    index: true,
  },
});

const GoldPriceModel = mongoose.model('goldPriceModel', goldPriceSchema);

module.exports = GoldPriceModel;
