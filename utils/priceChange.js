// Calculates price changes based on yesterday and today's prices for 24K and 22K gold
function getPriceChangeInfo(data) {
  // for 24k
  let todayPrice24k = parseInt(
    data[data.length - 1].priceArray[1].replace(/,/g, ''),
    10
  );

  let yesterdayPrice24k = parseInt(
    data[data.length - 2].priceArray[1].replace(/,/g, ''),
    10
  );
  let difference24k = todayPrice24k - yesterdayPrice24k;

  // for 22k
  let todayPrice22k = parseInt(
    data[data.length - 1].priceArray[3].replace(/,/g, ''),
    10
  );

  let yesterdayPrice22k = parseInt(
    data[data.length - 2].priceArray[3].replace(/,/g, ''),
    10
  );
  let difference22k = todayPrice22k - yesterdayPrice22k;

  if (difference24k > 0 || difference22k > 0) {
    return {
      status: 'up',
      change: [difference24k, difference22k],
      symbol: '+',
      message: `The price went up.`,
    };
  } else if (difference24k < 0 || difference22k < 0) {
    return {
      status: 'down',
      change: [Math.abs(difference24k), Math.abs(difference22k)],
      symbol: '-',
      message: `The price went down.`,
    };
  } else {
    return {
      status: 'unchanged',
      change: [0, 0],
      symbol: '',
      message: 'The price remained unchanged.',
    };
  }
}

module.exports = { getPriceChangeInfo };
