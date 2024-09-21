// Calculates price changes based on yesterday and today's prices for 24K and 22K gold
function getPriceDifferenceInfo(yesterdayDoc, todayDoc) {
  // for 24k
  let todayPrice24k = parseInt(todayDoc[1].replace(/,/g, ''), 10);

  let yesterdayPrice24k = parseInt(
    yesterdayDoc.priceArray[1].replace(/,/g, ''),
    10
  );
  let difference24k = todayPrice24k - yesterdayPrice24k;

  // for 22k
  let todayPrice22k = parseInt(todayDoc[3].replace(/,/g, ''), 10);

  let yesterdayPrice22k = parseInt(
    yesterdayDoc.priceArray[3].replace(/,/g, ''),
    10
  );
  let difference22k = todayPrice22k - yesterdayPrice22k;

  if (difference24k > 0 || difference22k > 0) {
    return {
      change: [difference24k, difference22k],
      symbol: '+',
    };
  } else if (difference24k < 0 || difference22k < 0) {
    return {
      change: [Math.abs(difference24k), Math.abs(difference22k)],
      symbol: '-',
    };
  } else {
    return {
      change: [0, 0],
      symbol: '',
    };
  }
}

module.exports = getPriceDifferenceInfo;
