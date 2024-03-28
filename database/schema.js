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
  },
  date: {
    type: Date,
  },
});

const GoldPriceModel = mongoose.model('goldPriceModel', goldPriceSchema);

module.exports = GoldPriceModel;
