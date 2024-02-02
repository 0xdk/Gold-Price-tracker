let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let goldPriceSchema = new Schema({
  priceArray: {
    type: [Number],
  },
  date: {
    type: Date,
  },
});

const GoldPriceModel = mongoose.model('goldPriceModel', goldPriceSchema);

module.exports = GoldPriceModel;
